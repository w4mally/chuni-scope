// src/utils/rating.ts

export const getRatingStyle = (ratingStr: string) => {
    const r = parseFloat(ratingStr);

    if (r >= 16.00) {
    return "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 via-yellow-300 via-green-400 via-cyan-400 to-purple-500 font-black saturate-150 filter drop-shadow-sm";
    }
    if (r >= 15.25) {
    return "text-transparent bg-clip-text bg-gradient-to-br from-slate-100 via-amber-50 to-slate-400 font-black drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]";
    }
  if (r >= 14.50) return "text-yellow-500 font-bold"; // 金
  if (r >= 13.25) return "text-slate-400 font-bold";  // 銀
  if (r >= 12.00) return "text-amber-700 font-bold";  // 銅
  if (r >= 10.00) return "text-purple-500 font-bold"; // 紫
  if (r >= 7.00)  return "text-red-500 font-bold";    // 赤
  if (r >= 4.00)  return "text-orange-500 font-bold"; // 橙
  return "text-emerald-500 font-bold";                // 緑
};