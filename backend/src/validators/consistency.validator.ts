export interface ConsistencyError {

  type:
   | "missing_entity"
   | "invalid_integration"
   | "invalid_page_entity";

  message:string;

  reference:string;
}
export function
validateConsistency(
 schema:any,
 appspec:any,
 integrations:string[]
){

 const errors:ConsistencyError[]=[];

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

   errors.push({

    type:
     "invalid_page_entity",

    message:
     `Page references ${page.entity}`,

    reference:
     page.entity
   });
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

   errors.push({

    type:
     "missing_entity",

    message:
     `Workflow references ${workflow.trigger.entity}`,

    reference:
     workflow.trigger.entity
   });
  }

  if(
   !integrations.includes(
    workflow.integration
   )
  ){

   errors.push({

    type:
      "invalid_integration",

    message:
     `Unknown integration ${workflow.integration}`,

    reference:
     workflow.integration
   });
  }
 }

 return errors;
}