import { Router }
from "express";

import { jobs }
from "../jobs/job.store";

import {
 repairMalformedJson,
 repairIntent,
 normalizeSchemaTypes,
 repairConsistency
}
from "../repair/repair.engine";

import {
 INTEGRATION_REGISTRY
}
from "../integrations/registry";

const router =
 Router();

router.post(
 "/generate/:jobId/repair",

 (req,res)=>{

  const jobId =
   req.params.jobId;

  const {
   stage,
   errorHint
  } = req.body;

  const job =
   jobs.get(jobId);

  if(!job){

   return res.status(404).json({
    success:false,
    error:"Job not found"
   });
  }

  try{

   const result =
    job.result;

   switch(stage){

    case "intent":

      result.intent =
       repairIntent(
        result.intent
       );

      break;

    case "schema":

      result.schema =
       normalizeSchemaTypes(
        result.schema
       );

      break;

    case "appspec":

      result.appspec =
       repairConsistency(
        result.schema,
        result.appspec,
        Object.keys(
         INTEGRATION_REGISTRY
        )
       );

      break;

    default:

      return res.status(400).json({

       success:false,

       error:
        "Invalid stage"

      });
   }

   jobs.set(
    jobId,
    {
     ...job,
     result
    }
   );

   res.json({

    success:true,

    repairedStage:
     stage,

    errorHint,

    result
   });

  }
  catch(error){

   res.status(500).json({

    success:false,

    error
   });
  }
 }
);

export default router;