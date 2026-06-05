import { Router }
from "express";

import {
 extractIntent
}
from "../pipeline/intent";

import {
 repairMalformedJson,
 repairIntent
}
from "../repair/repair.engine";

import {
 validateIntent
}
from "../validators/intent.validator";

const router =
 Router();

router.post(
"/intent",

async(req,res)=>{

 try{

 const raw =
 await extractIntent(
   req.body.prompt
 );

 const parsed =
 repairMalformedJson(raw);

 const repaired =
 repairIntent(parsed);

 const validation =
 validateIntent(
   repaired
 );

 res.json({

  data:
   repaired,

  validation
 });

 }
 catch(error){

  res.status(500)
  .json(error);
 }

});

export default router;