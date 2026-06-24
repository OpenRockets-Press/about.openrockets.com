import { createRequestHandler, RouterContextProvider } from "react-router";

// @ts-ignore
import * as build from "../build/server";

const handleRequest = createRequestHandler(build, "production");

export const onRequest = async (context) => {
  try {
    // 1. Try to serve static assets first
    let response;
    try {
      response = await context.env.ASSETS.fetch(context.request.url, context.request.clone());
      if (response && response.status >= 200 && response.status < 400) {
        return new Response(response.body, response);
      }
    } catch (e) {
      // Ignore ASSETS fetch errors
    }

    // 2. Fallback to React Router
    const loadContext = new RouterContextProvider();
    loadContext.set("cloudflare", { env: context.env, ctx: context.ctx || {} });
    
    return await handleRequest(context.request, loadContext);
  } catch (error) {
    console.error("Worker Crash:", error);
    return new Response(String(error.stack || error), { status: 500 });
  }
};
