import { useLoaderData, redirect } from "react-router";
import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/doc";
import { getDocBySlug } from "../utils/docs.server";

export async function loader({ params }: Route.LoaderArgs) {
  const { category, slug } = params;
  if (!category || !slug) throw redirect("/");
  
  const doc = await getDocBySlug(category, slug);
  if (!doc) throw new Response("Not Found", { status: 404 });
  
  return { doc };
}

export default function DocRoute() {
  const { doc } = useLoaderData<typeof loader>();
  
  // Clean up the markdown string by stripping out the [category] custom syntax
  const cleanContent = doc.content.replace(/^\[.*?\]\n*/m, '');

  return (
    <article className="prose prose-slate max-w-none w-full">
      <ReactMarkdown>{cleanContent}</ReactMarkdown>
    </article>
  );
}
