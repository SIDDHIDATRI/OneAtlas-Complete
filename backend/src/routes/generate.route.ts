import { Router } from "express";
import { v4 as uuid } from "uuid";

import { jobs } from "../jobs/job.store";
import { extractIntent } from "../pipeline/intent";
import { generateSchema } from "../pipeline/schema";
import { generateAppSpec } from "../pipeline/appspec";
import { generateWorkflow } from "../pipeline/workflow";
import {eventBus} from "../events/eventBus";
import { repairMalformedJson } from "../repair/repair.engine";
import { repairLogs } from "../jobs/repairLogs";
import { COST_TABLE } from "../config/cost.table";
const sleep = (ms:number) =>new Promise(resolve =>setTimeout(resolve, ms));
const router = Router();

router.post(
  "/generate",
  async (req, res) => {

    const jobId = uuid();

    jobs.set(jobId, {
      status: "running",
      step: "intent"
    });

    res.json({ jobId });

    try {

      const intentStart =Date.now();

      const intent =
        await extractIntent(
          req.body.prompt
        );

      const intentLatency =Date.now() - intentStart;      
      eventBus.emit(jobId,{step:"intent"});
      // await sleep(3000);
      jobs.set(jobId, {
        status: "running",
        step: "schema"
      });

      const schemaStart =Date.now();

      const schema =
        await generateSchema(
          intent
        );

      const schemaLatency = Date.now() - schemaStart;
      eventBus.emit(jobId,{step:"schema"});
      // await sleep(3000);

      jobs.set(jobId, {
        status: "running",
        step: "appspec"
      });

      const appspecStart =Date.now();

      const appspec =
        await generateAppSpec(
          intent,
          schema
        );

      const appspecLatency = Date.now() - appspecStart;
      eventBus.emit(jobId,{step:"appspec"});
      // await sleep(3000);


      jobs.set(jobId, {
        status: "running",
        step: "workflow"
      });

      const workflowStart =Date.now();

      const workflow =
        await generateWorkflow(
          "WhatsApp",
          {
            entity: "Lead",
            event: "Created"
          }
        );

      const workflowLatency = Date.now() - workflowStart;
      eventBus.emit(jobId,{step:"workflow"});
      // await sleep(3000);
      console.log(typeof intent);
      console.log(typeof schema);
      console.log(typeof appspec);
      console.log(typeof workflow);
      jobs.set(jobId, {
        status: "completed",
        step: "done",
        result: {
          intent:repairMalformedJson(intent),
          schema:repairMalformedJson(schema),
          appspec:repairMalformedJson(appspec),
          workflow
        },
        repairLogs,
        latency:{
          intent:intentLatency,
          schema:schemaLatency,
          appspec:appspecLatency,
          workflow:workflowLatency
        },
        costBreakdown:{
          intent:COST_TABLE.groq.intent,
          schema:COST_TABLE.gemini.schema,
          appspec:COST_TABLE.gemini.appspec,
          workflow:COST_TABLE.workflow.generation
        }
      });
      eventBus.emit(jobId,{step:"completed"});

    } catch (error) {

      jobs.set(jobId, {
        status: "failed",
        step: "error",
        result: error
      });
      
      eventBus.emit(jobId,{step:"failed"});
    }

  }
);

export default router;