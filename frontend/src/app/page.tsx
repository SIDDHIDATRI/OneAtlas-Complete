"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {

  const [prompt, setPrompt] =
    useState("");

  const [jobId, setJobId] =
    useState("");

  const [jobStatus, setJobStatus] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const result =
  jobStatus?.result;

  let intentData = null;
  let schemaData = null;
  let appspecData = null;
  let workflowData = null;

  try {

    intentData =
      typeof result?.intent === "string"
        ? JSON.parse(result.intent)
        : result?.intent;

    schemaData =
      typeof result?.schema === "string"
        ? JSON.parse(result.schema)
        : result?.schema;

    appspecData =
      typeof result?.appspec === "string"
        ? JSON.parse(result.appspec)
        : result?.appspec;

    workflowData =
      typeof result?.workflow === "string"
        ? JSON.parse(result.workflow)
        : result?.workflow;

  } catch (error) {
    console.log(error);
  }

  const generate = async () => {

    try {

      setLoading(true);

      const response =
        await axios.post(
          "http://localhost:5000/api/generate",
          {
            prompt
          }
        );

      const id =
        response.data.jobId;

      setJobId(id);

      const interval =
        setInterval(
          async () => {

            try {

              const status =
                await axios.get(
                  `http://localhost:5000/api/job/${id}`
                );

              setJobStatus(
                status.data
              );

              if (
                status.data.status ===
                "completed"
              ) {

                clearInterval(
                  interval
                );

                setLoading(false);
              }

              if (
                status.data.status ===
                "failed"
              ) {

                clearInterval(
                  interval
                );

                setLoading(false);
              }

            } catch (err) {

              console.error(err);
            }

          },
          2000
        );

    } catch (error) {

      console.error(error);

      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-10 bg-gray-100">

      <h1 className="text-5xl font-bold mb-8">
        OneAtlas AI Studio
      </h1>

      <div className="bg-white p-6 rounded shadow">

        <textarea
          rows={6}
          className="w-full border rounded p-3"
          placeholder="Describe your application..."
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
        />

        <button
          onClick={generate}
          className="mt-4 px-6 py-3 bg-black text-white rounded"
        >
          Generate
        </button>

      </div>

      {loading && (

        <div className="mt-6 bg-yellow-100 p-4 rounded shadow">

          <h2 className="font-bold">
            Generating Application...
          </h2>

        </div>

      )}

      {jobId && (

        <div className="mt-6 bg-white p-4 rounded shadow">

          <h2 className="font-bold text-lg">
            Job ID
          </h2>

          <p>
            {jobId}
          </p>

        </div>

      )}

      {jobStatus && (

        <div className="mt-6 bg-white p-4 rounded shadow">

          <h2 className="font-bold text-lg mb-4">
            Pipeline Progress
          </h2>

          <div className="space-y-2">

            <p>Intent Successful</p>
            <p>Schema Successful</p>
            <p>AppSpec Successful</p>
            <p>Workflow Successful</p>

            {
              jobStatus.status === "completed"
              &&
              <p>Completed</p>
            }

          </div>

        </div>

      )}

      {result && (

        <div className="mt-6">

          <h2 className="text-3xl font-bold mb-4">
            Generated Application
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-xl mb-3">
                Intent
              </h3>

              <pre className="text-xs overflow-auto">
                {
                  JSON.stringify(
                    result.intent,
                    null,
                    2
                  )
                }
              </pre>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-xl mb-3">
                Schema
              </h3>

              <pre className="text-xs overflow-auto">
                {
                  JSON.stringify(
                    result.schema,
                    null,
                    2
                  )
                }
              </pre>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-xl mb-3">
                App Specification
              </h3>

              <pre className="text-xs overflow-auto">
                {
                  JSON.stringify(
                    result.appspec,
                    null,
                    2
                  )
                }
              </pre>
            </div>

            <div className="bg-white p-4 rounded shadow">

              <h3 className="font-bold text-xl mb-3">
                Workflow
              </h3>

              <p>
                <strong>Name:</strong>
                {" "}
                {workflowData?.name}
              </p>

              <div className="mt-3">

                <strong>Steps</strong>

                <ul className="list-disc ml-5">

                  {
                    workflowData?.steps?.map(
                      (
                        step:any,
                        index:number
                      ) => (

                        <li key={index}>
                          {step.type}
                        </li>

                      )
                    )
                  }

                </ul>

              </div>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}