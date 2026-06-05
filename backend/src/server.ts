import express from "express";
import dotenv from "dotenv";
import intentRoute from "./routes/intent.route"
import schemaRoute from "./routes/schema.route";
import appspecRoute from "./routes/appspec.route";
import workflowRoute from "./routes/workflow.route";
import generateRoute from "./routes/generate.route";
import jobRoute from "./routes/job.route";
import streamRoute from "./routes/stream.route";
import integrationRoute from "./routes/integration.route";
import cors from "cors";
import repairRoute from "./routes/repair.route";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use("/api",intentRoute);
app.use("/api",schemaRoute);
app.use("/api",appspecRoute);
app.use("/api", workflowRoute);
app.use("/api", generateRoute);
app.use("/api", jobRoute);
app.use("/api",streamRoute);
app.use("/api",integrationRoute);
app.use("/api",repairRoute);
app.get("/api/test", (_, res) => {
  res.json({
    message: "API route working"
  });
});
// app.get("/", (_, res) => {
//   res.json({
//     status: "Server Running"
//   });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});