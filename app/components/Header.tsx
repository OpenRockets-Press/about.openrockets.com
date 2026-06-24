import { Link, Form } from "react-router";
import { MaterialInput } from "./MaterialInput";

export function Header() {
  return (
    <header className="min-h-[70px] bg-white border-b border-black flex flex-wrap items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4 py-4 md:py-0 w-full md:w-auto">
        <Link to="/" className="text-3xl md:text-5xl font-medium tracking-tight text-black hover:opacity-70 transition-opacity">
          About, Help & Docs
        </Link>
      </div>

      <div className="flex-1 flex justify-center w-full md:w-auto order-3 md:order-2 my-4 md:my-0 md:px-8">
        <Form action="/search" method="get" className="flex w-full max-w-lg">
          <MaterialInput 
            name="q"
            label="Search documentation..."
            required
            className="flex-1 rounded-r-none"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-black border border-black border-l-0 rounded-r-md text-white font-bold hover:opacity-80 transition-opacity flex items-center gap-2 text-sm"
          >
            <i className="bi bi-search text-base"></i>
          </button>
        </Form>
      </div>

      <div className="flex items-center gap-4 md:gap-6 order-2 md:order-3 w-full md:w-auto justify-between md:justify-end pb-4 md:pb-0">
        <a href="https://zeroprofit.org" className="text-black font-bold hover:opacity-70 flex items-center gap-2 text-sm md:text-base">
          <i className="bi bi-patch-check-fill text-lg"></i>
          Register your NonProfit
        </a>
        <a href="https://discord.gg/djXh8udpbn" className="bg-black text-white px-4 py-2 rounded-md font-bold hover:opacity-80 transition-opacity flex items-center gap-2 text-sm md:text-base">
          <i className="bi bi-discord text-lg"></i>
          Discord
        </a>
      </div>
    </header>
  );
}
