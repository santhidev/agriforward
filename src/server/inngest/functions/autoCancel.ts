import { inngest } from "../client";

export const autoCancelJob = inngest.createFunction(
  { id: "auto-cancel-job", triggers: [{ event: "po/payment-pending" }] },
  async ({ event, step }) => {
    await step.sleep("wait-48-hours", "48h");
    // TODO: auto-cancel if buyer never pays
    return { message: "Auto cancel checked" };
  },
);
