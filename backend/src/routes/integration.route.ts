import { Router }
from "express";

import {
 validateIntegration
}
from "../integrations/validate.integration";

import {
 INTEGRATION_REGISTRY
}
from "../integrations/registry";

const router =
 Router();


// Required by PDF
router.get(
 "/integrations",

 (req,res)=>{

  res.json(
   INTEGRATION_REGISTRY
  );

 }
);


// Existing validation route
router.post(
 "/integration/validate",

 (req,res)=>{

  const result =
   validateIntegration(
    req.body.integration,
    req.body.event
   );

  res.json(result);

 }
);

export default router;