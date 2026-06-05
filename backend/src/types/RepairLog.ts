export interface RepairLog {

 strategy:
  | "structural"
  | "field"
  | "consistency";

 input:string;

 outcome:
  | "repaired"
  | "failed"
  | "escalated";

 timestamp:string;
}