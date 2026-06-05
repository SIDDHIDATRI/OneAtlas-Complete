import { Router }
from "express";

import {
 eventBus
}
from "../events/eventBus";

const router =
 Router();

router.get(
 "/stream/:jobId",

 (req,res)=>{

  res.writeHead(
   200,
   {
    "Content-Type":
     "text/event-stream",

    "Cache-Control":
     "no-cache",

    Connection:
     "keep-alive"
   }
  );

  const listener =
   (data:any)=>{

    res.write(
     `data: ${
      JSON.stringify(data)
     }\n\n`
    );
   };

  eventBus.on(
   req.params.jobId,
   listener
  );

  req.on(
   "close",
   ()=>{

    eventBus.off(
     req.params.jobId,
     listener
    );
   }
  );

 });
// //Demo test route
//  router.get(
//   "/emit-test/:jobId",
//   (req,res)=>{

//     eventBus.emit(
//       req.params.jobId,
//       {
//         step:"test-event"
//       }
//     );

//     res.json({
//       success:true
//     });
//   }
// );

export default router;