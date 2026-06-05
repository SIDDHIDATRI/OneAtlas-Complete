import { z } from "zod";

export const IntentSchema =
  z.object({

    appName:
      z.string(),

    appType:
      z.string(),

    features:
      z.array(
        z.string()
      ),

    entities:
      z.array(
        z.string()
      ),

    integrations_requested:
      z.array(
        z.string()
      ),

    assumptions:
      z.array(
        z.string()
      )
});

export function validateIntent(
  data: any
) {

  const result =
    IntentSchema.safeParse(data);

  return {

    valid:
      result.success,

    errors:
      result.success
        ? []
        : result.error.issues
  };
}