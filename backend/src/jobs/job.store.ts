export const jobs = new Map<
  string,
  {
  status:string;
  step:string;
  result?:any;
  repairLogs?:any[];

  latency?:{
    intent:number;
    schema:number;
    appspec:number;
    workflow:number;
  };

  costBreakdown?:{
    intent:number;
    schema:number;
    appspec:number;
    workflow:number;
  };
}
>();