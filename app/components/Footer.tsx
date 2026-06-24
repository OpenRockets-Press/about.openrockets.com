export function Footer() {
  return (
    <footer className="bg-white text-black px-6 py-10 mt-auto w-full">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-3 mb-6">
          <img src="https://openrockets.com/v/openrockets.png" alt="OpenRockets Logo" className="w-[120px] invert" />
          <span className="text-xl font-bold tracking-tight font-sans">About OpenRockets</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <a href="https://discord.gg/djXh8udpbn" className="text-black hover:text-gray-700 transition-colors font-medium">Discord</a>
          <a href="https://linkedin.com/company/openrocketsinc" className="text-black hover:text-gray-700 transition-colors font-medium">LinkedIn</a>
          <a href="https://x.com/openrockets" className="text-black hover:text-gray-700 transition-colors font-medium">Twitter</a>
          <a href="https://zeroprofit.org" className="text-black hover:text-gray-700 transition-colors font-medium">ZeroProfit</a>
        </div>
        <div className="border-t border-gray-200 pt-6 w-full text-black text-sm">
          <p>© & (TM) 2022-2026 OpenRockets Incorporated. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
