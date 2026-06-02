import { inngest } from "../client";

export const expirePoJob = inngest.createFunction(
  { id: "expire-po-job", triggers: [{ event: "po/published" }] },
  async ({ event, step }) => {
    await step.sleep("wait-30-days", "30d");
    // TODO: expire PO if still Open
    return { message: "PO expiration checked" };
  },
);
