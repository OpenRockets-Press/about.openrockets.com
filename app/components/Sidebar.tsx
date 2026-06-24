import { NavLink } from "react-router";

export type Category = {
  name: string;
  files: { slug: string; title: string }[];
};

export function Sidebar({ categories }: { categories: Category[] }) {
  return (
    <aside className="w-full md:w-[280px] bg-white border-r border-black py-6 shrink-0 overflow-y-auto flex md:flex-col flex-row overflow-x-auto whitespace-nowrap scrollbar-hide">
      {categories.length === 0 ? (
        <div className="text-black text-sm px-6">No documentation found.</div>
      ) : null}
      
      {categories.map((category) => (
        <div key={category.name} className="mb-8 mr-6 md:mr-0 inline-block md:block align-top">
          <div className="text-[13px] font-bold text-black mx-6 mb-3 tracking-wide">
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
                      ? "bg-black text-white"
                      : "text-black hover:bg-black/5 border-l-4 border-transparent md:border-b-0 border-b-4"
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
