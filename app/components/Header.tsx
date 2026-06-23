import { Link, Form } from "react-router";
import { Search } from "lucide-react";

export function Header() {
  return (
    <header className="min-h-[70px] bg-white border-b border-gray-200 flex flex-wrap items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4 py-4 md:py-0 w-full md:w-auto">
        <Link to="/" className="text-3xl md:text-5xl font-extrabold tracking-tighter text-gray-900 hover:text-blue-600 transition-colors">
          About, Help & Docs
        </Link>
      </div>

      <div className="flex-1 flex justify-center w-full md:w-auto order-3 md:order-2 my-4 md:my-0 md:px-8">
        <Form action="/search" method="get" className="flex w-full max-w-lg shadow-sm">
          <input
            type="text"
            name="q"
            placeholder="Search documentation..."
            required
            className="flex-1 px-4 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all text-sm"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-gray-50 border border-gray-300 rounded-r-md text-gray-600 font-semibold hover:bg-gray-100 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm"
          >
            <Search size={16} />
            Search
          </button>
        </Form>
      </div>

      <div className="flex items-center gap-4 md:gap-6 order-2 md:order-3 w-full md:w-auto justify-between md:justify-end pb-4 md:pb-0">
        <a href="https://zeroprofit.org" className="text-gray-600 font-medium hover:text-gray-900 flex items-center gap-2 text-sm md:text-base">
          <i className="bi bi-patch-check-fill text-blue-500 text-lg"></i>
          Register your NonProfit
        </a>
        <a href="https://discord.gg/djXh8udpbn" className="bg-[#5865F2] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#4752C4] transition-colors flex items-center gap-2 text-sm md:text-base shadow-sm">
          <i className="bi bi-discord text-lg"></i>
          Discord
        </a>
      </div>
    </header>
  );
}
