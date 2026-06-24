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
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-black mb-4">
            Search Results
          </h1>
          <p className="text-black font-medium text-lg">
            {q ? (
              <>Helping you to find <span className="font-semibold text-blue-600">{q}...</span></>
            ) : (
              "Please search something!"
            )}
          </p>
        </div>

        {q && results.length === 0 && (
          <div className="text-center flex flex-col items-center justify-center mt-12 mb-12">
            <img 
              src="https://cdna.artstation.com/p/assets/images/images/067/012/126/original/ester-auroora-from-otter-animation-sketch.gif" 
              alt="Not found. Maybe try searching on Google?" 
              className="w-[150px] md:w-[200px] h-auto mb-6 object-contain"
            />
            <h2 className="text-2xl font-bold text-black mb-2 tracking-tight">No results found</h2>
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
                className="group block bg-white p-6 shadow-sm border border-black hover:bg-black/5 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                        {doc.category.replace(/-/g, ' ')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2 group-hover:underline">
                      {doc.title}
                    </h3>
                    <p className="text-black text-sm line-clamp-2">
                      {/* Strip markdown and preview text */}
                      {doc.content.replace(/#.*$/gm, '').replace(/\[.*?\]/g, '').replace(/[*_~`]/g, '').trim().substring(0, 150)}...
                    </p>
                  </div>
                  
                  <div className="hidden sm:flex items-center self-center shrink-0 text-black pl-4">
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
