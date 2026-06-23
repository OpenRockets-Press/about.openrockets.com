import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/docs-layout.tsx", [
    route("docs/:category/:slug", "routes/doc.tsx"),
  ]),
  route("create", "routes/create.tsx"),
] satisfies RouteConfig;
