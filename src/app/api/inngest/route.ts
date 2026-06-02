import { inngest } from "@/server/inngest/client";
import { serve } from "inngest/next";
import { expirePoJob } from "@/server/inngest/functions/expirePo";
import { autoRejectSellerJob } from "@/server/inngest/functions/autoRejectSeller";
import { autoCancelJob } from "@/server/inngest/functions/autoCancel";
import { autoConfirmPodJob } from "@/server/inngest/functions/autoConfirmPod";
import { autoConfirmPickupJob } from "@/server/inngest/functions/autoConfirmPickup";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    expirePoJob,
    autoRejectSellerJob,
    autoCancelJob,
    autoConfirmPodJob,
    autoConfirmPickupJob,
  ],
});
