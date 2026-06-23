import { createPagesFunctionHandler } from "@react-router/cloudflare";

// @ts-ignore - this is generated after build
import * as build from "../build/server";

export const onRequest = createPagesFunctionHandler({ build });
