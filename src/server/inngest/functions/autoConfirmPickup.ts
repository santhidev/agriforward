import { inngest } from "../client";

export const autoConfirmPickupJob = inngest.createFunction(
  {
    id: "auto-confirm-pickup-job",
    triggers: [{ event: "po/ready-for-pickup" }],
  },
  async ({ event, step }) => {
    await step.sleep("wait-7-days", "7d");
    // TODO: auto-confirm pickup if buyer never picks up
    return { message: "Auto confirm pickup checked" };
  },
);
