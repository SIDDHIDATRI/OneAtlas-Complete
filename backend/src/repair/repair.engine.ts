import { jsonrepair }
from "jsonrepair";

import { repairLogs }
from "../jobs/repairLogs";

export function
repairMalformedJson(
 raw:string
){

 try{

   return JSON.parse(raw);

 }
 catch{

   repairLogs.push({

    strategy:
     "structural_repair",

    error:
     "Malformed JSON",

    outcome:
     "repaired"

   });

   return JSON.parse(
     jsonrepair(raw)
   );
 }
}

export function repairIntent(
  obj:any
){

 if(!obj.features){

   repairLogs.push({

    strategy:
     "field_repair",

    field:
     "features",

    outcome:
     "repaired"

   });

   obj.features=[];
 }

 if(!obj.entities){

   repairLogs.push({

    strategy:
     "field_repair",

    field:
     "entities",

    outcome:
     "repaired"

   });

   obj.entities=[];
 }

 if(!obj.assumptions){

   repairLogs.push({

    strategy:
     "field_repair",

    field:
     "assumptions",

    outcome:
     "repaired"

   });

   obj.assumptions=[];
 }

 if(!obj.integrations_requested){

   repairLogs.push({

    strategy:
     "field_repair",

    field:
     "integrations_requested",

    outcome:
     "repaired"

   });

   obj.integrations_requested=[];
 }

 return obj;
}

export function normalizeSchemaTypes(
  schema:any
){

 if(!schema.entities){
  return schema;
 }

 for(
  const entity of
  schema.entities
 ){

  if(!entity.fields){
   continue;
  }

  for(
   const field of
   entity.fields
  ){

   const type=
    field.type?.toLowerCase();

   switch(type){

    case "email":
     field.type="string";
     break;

    case "phone":
     field.type="string";
     break;

    case "text":
     field.type="string";
     break;

    case "integer":
     field.type="number";
     break;

    case "float":
     field.type="number";
     break;

    case "datetime":
     field.type="date";
     break;

    default:
     break;
   }
  }
 }

 return schema;
}

export function
repairConsistency(
 schema:any,
 appspec:any,
 registry:string[]
){

 const entities=
  schema.entities.map(
   (e:any)=>e.name
  );

 for(
  const page of
  appspec.pages || []
 ){

  if(
   !entities.includes(
    page.entity
   )
  ){

   repairLogs.push({

    strategy:
     "consistency_repair",

    error:
     "Invalid page entity",

    outcome:
     "repaired"

   });

   page.entity=
    entities[0];
  }
 }

 for(
  const workflow of
  appspec.workflowStubs || []
 ){

  if(
   !entities.includes(
    workflow.trigger.entity
   )
  ){

   repairLogs.push({

    strategy:
     "consistency_repair",

    error:
     "Invalid workflow entity",

    outcome:
     "repaired"

   });

   workflow.trigger.entity=
    entities[0];
  }

  if(
   !registry.includes(
    workflow.integration
   )
  ){

   repairLogs.push({

    strategy:
     "consistency_repair",

    error:
     "Invalid integration",

    outcome:
     "repaired"

   });

   workflow.integration=
    "webhook";
  }
 }

 return appspec;
}