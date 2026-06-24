import { useLoaderData, Link } from "react-router";
import type { Route } from "./+types/search";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getAllDocs } from "../utils/docs.server";
import { Search, FileText, ChevronRight } from "lucide-react";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.toLowerCase() || "";

  if (!q) {
    return { q, results: [] };
  }

  const allDocs = await getAllDocs();
  
  const results = allDocs.filter(doc => {
    return doc.title.toLowerCase().includes(q) || 
           doc.content.toLowerCase().includes(q) ||
           doc.category.toLowerCase().includes(q);
  });

  return { q, results };
}

export default function SearchPage() {
  const { q, results } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Search Results
          </h1>
          <p className="text-gray-600 text-lg">
            {q ? (
              <>Showing results for <span className="font-semibold text-blue-600">"{q}"</span></>
            ) : (
              "Please enter a search query."
            )}
          </p>
        </div>

        {q && results.length === 0 && (
          <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search className="text-gray-400 w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-500 max-w-md">
              We couldn't find any documentation matching your search query. Try using different keywords or checking for typos.
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wider">
              {results.length} {results.length === 1 ? 'document' : 'documents'} found
            </p>
            
            {results.map((doc, idx) => (
              <Link 
                key={`${doc.category}-${doc.slug}-${idx}`} 
                to={`/docs/${doc.category}/${doc.slug}`}
                className="group block bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                        {doc.category.replace(/-/g, ' ')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {/* Strip markdown and preview text */}
                      {doc.content.replace(/#.*$/gm, '').replace(/\[.*?\]/g, '').replace(/[*_~`]/g, '').trim().substring(0, 150)}...
                    </p>
                  </div>
                  
                  <div className="hidden sm:flex items-center self-center shrink-0 text-gray-300 group-hover:text-blue-500 transition-colors pl-4">
                    <ChevronRight size={24} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
