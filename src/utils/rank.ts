// src/utils/rank.ts

export const getRank = (score: number) => {
    if (score >= 1009000) return "SSS+";
    if (score >= 1007500) return "SSS";
    if (score >= 1005000) return "SS+";
    if (score >= 1000000) return "SS";
    if (score >= 990000) return "S+";
    if (score >= 975000) return "S";
    return "OTHER";
};

export const getRankColor = (score: number) => {
    if (score >= 1009000) return "text-red-500 drop-shadow-md"; // SSS+
    if (score >= 1007500) return "text-red-500"; // SSS
    if (score >= 1005000) return "text-blue-500"; // SS+
    if (score >= 1000000) return "text-blue-400"; // SS
    if (score >= 975000) return "text-orange-400"; // S
    return "text-gray-500";
};

// カードの背景色用
export const getBgGradient = (difficulty: 'MASTER' | 'ULTIMA') => {
    if (difficulty === 'ULTIMA') return "bg-gradient-to-br from-gray-900 to-black text-red-500";
    return "bg-gradient-to-br from-purple-700 to-purple-900 text-white";
};