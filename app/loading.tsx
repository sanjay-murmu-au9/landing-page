export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#0c4c34] border-t-[#d4af37] rounded-full animate-spin mb-4"></div>
        <p className="text-[#0c4c34] text-lg font-serif">Loading Prestige Somerville...</p>
      </div>
    </div>
  );
}
