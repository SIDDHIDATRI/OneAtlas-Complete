import { z }
from "zod";

export const
SchemaValidator =

 z.object({

  entities:

   z.array(

    z.object({

     name:
      z.string(),

     fields:

      z.array(

       z.object({

        name:
         z.string(),

        type:
         z.string()
       })
      )
    })
   )
});