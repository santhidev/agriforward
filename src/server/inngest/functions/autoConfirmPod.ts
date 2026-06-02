import { inngest } from "../client";

export const autoConfirmPodJob = inngest.createFunction(
  { id: "auto-confirm-pod-job", triggers: [{ event: "po/in-transit" }] },
  async ({ event, step }) => {
    await step.sleep("wait-48-hours", "48h");
    // TODO: auto-confirm delivery if buyer never confirms
    return { message: "Auto confirm POD checked" };
  },
);
