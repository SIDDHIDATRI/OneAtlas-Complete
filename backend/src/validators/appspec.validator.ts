import { z } from "zod";

export const AppSpecSchema =
z.object({

 pages:z.array(
  z.object({
   name:z.string(),
   entity:z.string(),
   description:z.string()
  })
 ),

 apiEndpoints:z.array(
  z.object({
   method:z.string(),
   path:z.string(),
   entity:z.string()
  })
 ),

 authRules:z.array(
  z.object({
   role:z.string(),
   permissions:
    z.array(z.string())
  })
 ),

 integrationHooks:z.array(
  z.object({
   integration:z.string(),
   event:z.string()
  })
 ),

 workflowStubs:z.array(
  z.object({

   name:z.string(),

   integration:
    z.string(),

   trigger:
    z.object({

     entity:
      z.string(),

     event:
      z.string()
    })
  })
 )
});

export function
validateAppSpec(
 data:any
){

 const result=
  AppSpecSchema
   .safeParse(data);

 return {

  valid:
   result.success,

  errors:
   result.success
    ? []
    : result.error.issues
 };
}