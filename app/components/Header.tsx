import { Link, Form } from "react-router";
import { MaterialInput } from "./MaterialInput";

export function Header() {
  return (
    <header className="min-h-[70px] bg-[#fff6dc] border-b border-black flex flex-wrap items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4 py-4 min-[1123px]:py-0 w-full min-[1123px]:w-auto">
        <Link to="/" className="text-3xl min-[1123px]:text-5xl font-medium tracking-tight text-black hover:opacity-70 transition-opacity">
          About, Help & Docs
        </Link>
      </div>

      <div className="flex-1 flex justify-center w-full min-[1123px]:w-auto order-3 min-[1123px]:order-2 my-4 min-[1123px]:my-0 min-[1123px]:px-8">
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

      <div className="flex items-center gap-4 min-[1123px]:gap-6 order-2 min-[1123px]:order-3 w-full min-[1123px]:w-auto justify-between min-[1123px]:justify-end pb-4 min-[1123px]:pb-0">
        <a href="https://zeroprofit.org" className="text-black font-bold hover:opacity-70 flex items-center gap-2 text-sm min-[1123px]:text-base">
          <img src="https://substackcdn.com/image/fetch/$s_!YU9o!,w_170,c_limit,f_auto,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcc66b391-ca1e-435a-bca3-c286b6c97085_314x314.png" alt="" className="w-[30px] h-[30px] object-contain rounded-full" />
          Register your NonProfit
        </a>
        <a href="https://discord.gg/djXh8udpbn" className="bg-black text-white px-4 py-2 rounded-md font-bold hover:opacity-80 transition-opacity flex items-center gap-2 text-sm min-[1123px]:text-base">
          <i className="bi bi-discord text-lg"></i>
          Discord
        </a>
      </div>
    </header>
  );
}
