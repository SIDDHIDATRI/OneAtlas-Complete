import { callModel }
from "../gateway/router";

import { MODEL_CONFIG }
from "../config/model.config";

export async function generateAppSpec(
  intent:any,
  schema:any
){

const prompt = `

Generate ONLY valid JSON.

{
  "pages":[
    {
      "name":"",
      "entity":"",
      "description":""
    }
  ],

  "apiEndpoints":[
    {
      "method":"GET",
      "path":"",
      "entity":""
    }
  ],

  "authRules":[
    {
      "role":"",
      "permissions":[]
    }
  ],

  "integrationHooks":[
    {
      "integration":"",
      "event":""
    }
  ],

  "workflowStubs":[
    {
      "name":"",
      "integration":"",
      "trigger":{
        "entity":"",
        "event":""
      }
    }
  ]
}

Intent:
${JSON.stringify(intent)}

Schema:
${JSON.stringify(schema)}

`;

return callModel(
 MODEL_CONFIG.appspec.primary,
 prompt
);

}