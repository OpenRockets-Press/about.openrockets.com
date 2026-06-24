import { redirect } from "react-router";
import { getAllDocs } from "../utils/docs.server";

export default function Home() {
  return null;
}

export async function loader() {
  const docs = await getAllDocs();
  if (docs.length > 0) {
    const firstDoc = docs[0];
    return redirect(`/docs/${firstDoc.category}/${firstDoc.slug}`);
  }
  return redirect("/docs/openrockets-press/introduction");
}
