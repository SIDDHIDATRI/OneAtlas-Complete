import { Router } from "express";

import { generateAppSpec } from "../pipeline/appspec";
import { repairMalformedJson } from "../repair/repair.engine";
import { validateAppSpec } from "../validators/appspec.validator";

const router = Router();

router.post("/appspec", async (req, res) => {
  try {
    const raw = await generateAppSpec(
      req.body.intent,
      req.body.schema
    );

    const parsed =
      repairMalformedJson(raw);

    const validation =
      validateAppSpec(parsed);

    if (!validation.valid) {
      return res
        .status(400)
        .json(validation);
    }

    res.json(parsed);

  } catch (error) {
    console.error(error);

    res.status(500).json(error);
  }
});

export default router;