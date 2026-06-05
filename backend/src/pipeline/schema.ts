import {
 callModel
}
from "../gateway/router";

import {
 MODEL_CONFIG
}
from "../config/model.config";

export async function
generateSchema(
 intent:any
){

 const prompt = `

Generate ONLY valid JSON.

{
 "entities":[
   {
     "name":"",
     "fields":[
       {
         "name":"",
         "type":""
       }
     ]
   }
 ]
}

Intent:

${JSON.stringify(intent)}

`;

 return callModel(
   MODEL_CONFIG.schema.primary,
   prompt
 );
}