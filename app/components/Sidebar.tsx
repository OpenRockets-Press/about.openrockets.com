import { NavLink } from "react-router";

export type Category = {
  name: string;
  files: { slug: string; title: string }[];
};

export function Sidebar({ categories }: { categories: Category[] }) {
  return (
    <aside className="w-full md:w-[280px] bg-gray-50 border-r border-gray-200 py-6 shrink-0 overflow-y-auto flex md:flex-col flex-row overflow-x-auto whitespace-nowrap scrollbar-hide">
      {categories.length === 0 ? (
        <div className="text-gray-400 text-sm px-6">No documentation found.</div>
      ) : null}
      
      {categories.map((category) => (
        <div key={category.name} className="mb-8 mr-6 md:mr-0 inline-block md:block align-top">
          <div className="text-[11px] uppercase font-bold text-gray-500 mx-6 mb-3 tracking-wider">
            {category.name.replace(/-/g, ' ')}
          </div>
          <div className="flex md:flex-col flex-row">
            {category.files.map((file) => (
              <NavLink
                key={file.slug}
                to={`/docs/${category.name}/${file.slug}`}
                className={({ isActive }) =>
                  `block px-6 py-2 text-[15px] font-medium transition-colors ${
                    isActive
                      ? "bg-blue-500/10 text-blue-700 md:border-l-4 border-b-4 md:border-b-0 border-blue-600"
                      : "text-gray-600 hover:bg-black/5 hover:text-gray-900 border-l-4 border-transparent md:border-b-0 border-b-4"
                  }`
                }
              >
                {file.title}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
