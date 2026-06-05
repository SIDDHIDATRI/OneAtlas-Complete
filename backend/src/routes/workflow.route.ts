import { Router } from "express";
import { generateWorkflow } from "../pipeline/workflow";

const router = Router();

router.post(
  "/workflow",
  async (req, res) => {

    const workflow =
      await generateWorkflow(
        req.body.integration,
        req.body.trigger
      );

    res.json(workflow);
  }
);

export default router;