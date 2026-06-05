import { INTEGRATION_REGISTRY }
from "./registry";

export function validateIntegration(
 integration:string,
 event:string
){

 const config =
  INTEGRATION_REGISTRY[
   integration.toLowerCase() as keyof typeof INTEGRATION_REGISTRY
  ];

 if(!config){

  return {
   valid:false,
   reason:"Unknown Integration"
  };
 }

 if(
  !config.triggers.includes(event)
){

  return {
    valid:false,
    reason:"Event Not Supported"
  };
}

 return {
  valid:true
 };
}