// 統計カード用の基本色定義
export const COLOR_VARIANTS = {
    yellow: { 
        text: 'text-yellow-500', 
        bg: 'bg-yellow-500' 
    },
    orange: { 
        text: 'text-orange-500', 
        bg: 'bg-orange-500' 
    },
    emerald: { 
        text: 'text-emerald-500', 
        bg: 'bg-emerald-500' 
    },
    red: { 
        text: 'text-red-500', 
        bg: 'bg-red-500' 
    },
    rose: { 
        text: 'text-rose-400', 
        bg: 'bg-rose-400' 
    },
} as const;

// 型定義（他のコンポーネントで利用するため）
export type ColorKey = keyof typeof COLOR_VARIANTS;

// レーティング帯ごとの特別なスタイル定義
export const RATING_GRADIENTS = {
    RAINBOW: "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 via-yellow-300 via-green-400 via-cyan-400 to-purple-500 font-black saturate-150 filter drop-shadow-sm",
    PLATINUM: "text-transparent bg-clip-text bg-gradient-to-br from-slate-100 via-amber-50 to-slate-400 font-black drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]",
} as const;

// 標準的なレーティング色の定義
export const RATING_COLORS: Record<string, string> = {
    GOLD: "text-yellow-500 font-bold",
    SILVER: "text-slate-400 font-bold",
    BRONZE: "text-amber-700 font-bold",
    PURPLE: "text-purple-500 font-bold",
    RED: "text-red-500 font-bold",
    ORANGE: "text-orange-500 font-bold",
    GREEN: "text-emerald-500 font-bold",
};