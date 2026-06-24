import { Outlet, useLoaderData } from "react-router";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { getAllDocs } from "../utils/docs.server";

export async function loader() {
  const docs = await getAllDocs();
  
  // Group docs by category
  const categoriesMap = new Map<string, { slug: string, title: string }[]>();
  
  docs.forEach(doc => {
    if (!categoriesMap.has(doc.category)) {
      categoriesMap.set(doc.category, []);
    }
    categoriesMap.get(doc.category)!.push({ slug: doc.slug, title: doc.title });
  });
  
  const categories = Array.from(categoriesMap.entries()).map(([name, files]) => ({
    name,
    files
  }));

  return { categories };
}

export default function DocsLayout() {
  const { categories } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar categories={categories} />
        <main className="flex-1 flex flex-col bg-white">
          <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-10 md:px-12 md:py-16">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
