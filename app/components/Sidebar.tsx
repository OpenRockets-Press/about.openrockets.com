import { NavLink } from "react-router";

export type Category = {
  name: string;
  files: { slug: string; title: string }[];
};

export function Sidebar({ categories }: { categories: Category[] }) {
  return (
    <aside className="w-full md:w-[280px] bg-white md:border-r border-black md:py-6 shrink-0 flex flex-col md:sticky md:top-0 md:h-screen md:overflow-y-auto">
      {/* Mobile "All Categories" Button */}
      <div className="md:hidden border-b border-black p-4 bg-gray-50">
        <NavLink 
          to="/categories" 
          className="block w-full py-3 px-4 bg-black text-white text-center font-bold text-sm hover:bg-gray-900 transition-colors"
        >
          View All Categories
        </NavLink>
      </div>

      {/* Desktop Categories List */}
      <div className="hidden md:block">
        {categories.length === 0 ? (
          <div className="text-black text-sm px-6">No documentation found.</div>
        ) : null}
        
        {categories.map((category) => (
          <div key={category.name} className="mb-8">
            <div className="text-[13px] font-bold text-black mx-6 mb-3 tracking-wide capitalize">
              {category.name.replace(/-/g, ' ')}
            </div>
            <div className="flex flex-col">
              {category.files.map((file) => (
                <NavLink
                  key={file.slug}
                  to={`/docs/${category.name}/${file.slug}`}
                  className={({ isActive }) =>
                    `block px-6 py-2 text-[15px] font-medium transition-colors ${
                      isActive
                        ? "bg-black text-white"
                        : "text-black hover:bg-black/5 border-l-4 border-transparent"
                    }`
                  }
                >
                  {file.title}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
