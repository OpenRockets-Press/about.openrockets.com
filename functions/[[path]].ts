import { createRequestHandler, RouterContextProvider } from "react-router";

// @ts-ignore
import * as build from "../build/server";

const handleRequest = createRequestHandler(build, "production");

export const onRequest = async (context) => {
  try {
    const loadContext = new RouterContextProvider();
    loadContext.set("cloudflare", { env: context.env, ctx: context.ctx || {} });
    
    return await handleRequest(context.request, loadContext);
  } catch (error) {
    console.error("Worker Crash:", error);
    return new Response(String(error.stack || error), { status: 500 });
  }
};
