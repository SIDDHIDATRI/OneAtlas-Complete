export async function generateWorkflow(
  integration: string,
  trigger: any
) {

  return {
    workflowId: "wf_123",
    name: `${trigger.entity} ${trigger.event} Notification`,
    steps: [
      {
        type: "trigger"
      },
      {
        type: `send${integration}`
      }
    ]
  };
}