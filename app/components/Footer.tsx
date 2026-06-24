import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-[#fff6dc] text-black mt-auto w-full">
      <div className="max-w-4xl mx-auto px-6 py-10 md:px-12 flex flex-col items-start text-left">
        <div className="flex flex-col items-start gap-3 mb-6">
          <img src="https://openrockets.com/v/openrockets.png" alt="OpenRockets Logo" className="w-[120px] invert" />
          <span className="text-xl font-bold tracking-tight font-sans">About, Help & Docs</span>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap justify-start gap-6 md:gap-8 mb-8 w-full">
          <a href="https://discord.gg/djXh8udpbn" className="text-black hover:opacity-70 transition-opacity font-bold flex items-center gap-2">
            <i className="bi bi-discord"></i> Discord
          </a>
          <a href="https://linkedin.com/company/openrocketsinc" className="text-black hover:opacity-70 transition-opacity font-bold flex items-center gap-2">
            <i className="bi bi-linkedin"></i> LinkedIn
          </a>
          <a href="https://x.com/openrockets" className="text-black hover:opacity-70 transition-opacity font-bold flex items-center gap-2">
            <i className="bi bi-twitter-x"></i> Twitter
          </a>
          <a href="https://zeroprofit.org" className="text-black hover:opacity-70 transition-opacity font-bold flex items-center gap-2">
            <img src="https://substackcdn.com/image/fetch/$s_!YU9o!,w_170,c_limit,f_auto,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcc66b391-ca1e-435a-bca3-c286b6c97085_314x314.png" alt="" className="w-[30px] h-[30px] object-contain rounded-full" /> ZeroProfit
          </a>
          <Link to="/create" className="text-black hover:opacity-70 transition-opacity font-bold flex items-center gap-2">
            <i className="bi bi-pencil-square"></i> Writer Admin
          </Link>
        </div>
        <div className="pt-6 w-full text-black text-sm font-medium">
          <p>Contact 24/7: team@openrockets.com</p>
          <p>© & (TM) 2022-2026 OpenRockets Incorporated. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
