import { Router } from "express";
import { jobs } from "../jobs/job.store";

const router = Router();

/*
 Existing route
*/
router.get(
  "/job/:id",
  (req, res) => {

    const job =
      jobs.get(req.params.id);

    if (!job) {

      return res.status(404).json({
        error: "Job not found"
      });
    }

    res.json(job);
  }
);

/*
 PDF Required Route
*/
router.get(
  "/generate/:jobId",
  (req, res) => {

    const job =
      jobs.get(req.params.jobId);

    if (!job) {

      return res.status(404).json({
        error: "Job not found"
      });
    }

    res.json({
      jobId: req.params.jobId,
      status: job.status,
      step: job.step,
      result: job.result || null
    });
  }
);

export default router;