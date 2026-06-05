import { Router }
from "express";

import {
 generateSchema
}
from "../pipeline/schema";

import {
 repairMalformedJson,
 normalizeSchemaTypes
}
from "../repair/repair.engine";

const router =
 Router();

router.post(
 "/schema",

 async(req,res)=>{

  try{

   const raw =
   await generateSchema(
     req.body.intent
   );

   const parsed =
   repairMalformedJson(
    raw
   );

   const normalized =
   normalizeSchemaTypes(parsed);

   res.json(parsed);

  }
  catch(error){

   res.status(500)
   .json(error);
  }
 });

export default router;