import { useLoaderData, Link } from "react-router";
import type { Route } from "./+types/categories";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getAllDocs } from "../utils/docs.server";
import { FileText, ChevronRight } from "lucide-react";

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

export function meta() {
  return [{ title: "All Categories | OpenRockets" }];
}

export default function CategoriesRoute() {
  const { categories } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-black">
      <Header />
      <main className="flex-1 container mx-auto px-6 py-12 max-w-6xl">
        <h1 className="text-3xl font-bold mb-10 tracking-tight">Documentation Categories</h1>
        
        {categories.length === 0 ? (
          <p className="text-gray-500">No documentation found.</p>
        ) : (
          <div className="flex flex-wrap gap-8">
            {categories.map((category) => (
              <div key={category.name} className="flex flex-col w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)]">
                <h2 className="text-lg font-bold text-black border-b border-black pb-2 mb-4 tracking-wide capitalize">
                  {category.name.replace(/-/g, ' ')}
                </h2>
                <div className="flex flex-col space-y-2">
                  {category.files.map((file) => (
                    <Link
                      key={file.slug}
                      to={`/docs/${category.name}/${file.slug}`}
                      className="group flex items-center justify-between p-3 bg-gray-50 border border-transparent hover:border-black hover:bg-white transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText size={16} className="shrink-0 text-black" />
                        <span className="text-[15px] font-medium truncate">
                          {file.title}
                        </span>
                      </div>
                      <ChevronRight size={16} className="shrink-0 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
