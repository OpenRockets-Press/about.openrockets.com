import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("create", "routes/create.tsx"),
  route("search", "routes/search.tsx"),
  route("auth/sso-callback", "routes/auth.sso-callback.tsx"),
  layout("routes/docs-layout.tsx", [
    route("docs/:category/:slug", "routes/doc.tsx"),
  ]),
  route("categories", "routes/categories.tsx"),
] satisfies RouteConfig;
