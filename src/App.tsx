import { useState, useRef } from 'react';
import type { ChuniData } from './types';
import { calculateAverageForLevel, calculatePlayRate } from './utils/stats';
import { getRank, getRankColor } from './utils/rank'
import { getRatingStyle } from './utils/rating';
import ShareButton from './components/shareButton';

const COLOR_VARIANTS = {
  yellow: { text: 'text-yellow-500', bg: 'bg-yellow-500' },
  orange: { text: 'text-orange-500', bg: 'bg-orange-500' },
  emerald: { text: 'text-emerald-500', bg: 'bg-emerald-500' },
  red: { text: 'text-red-500', bg: 'bg-red-500' },
  rose: { text: 'text-rose-400', bg: 'bg-rose-400' },
} as const;

type ColorKey = keyof typeof COLOR_VARIANTS;

  // 統計用カードコンポーネント
// colorプロパティをcolorKeyに変更
const StatCard = ({ label, count, total, colorKey }: { label: string, count: number, total: number, colorKey: ColorKey }) => {
  const safeCount = count ?? 0;
  const percentage = total > 0 ? ((safeCount / total) * 100).toFixed(2) : "0.00";
  
  // マップから色情報を取得
  const colors = COLOR_VARIANTS[colorKey];
  
  return (
    <div className="bg-white p-3 md:p-4 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col justify-between min-w-0 h-full">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 truncate">{label}</p>
      {/* テキスト色を適用 */}
      <p className={`text-xl md:text-2xl font-black ${colors.text} break-all`}>
        {safeCount.toLocaleString()}
      </p>
      <div className="mt-auto">
        <p className="text-[10px] text-slate-400 mt-1 font-medium">
          / {total.toLocaleString()}
        </p>
        <p className="text-[10px] text-slate-500 font-bold">({percentage}%)</p>
        
        <div className="mt-2 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
          {/* 背景色を適用。完全なクラス名がコードにあるのでTailwindが認識する */}
          <div 
            className={`h-full opacity-50 ${colors.bg}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
function App() {
  const [data, setData] = useState<ChuniData | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const levels = ["10", "10+", "11", "11+", "12", "12+", "13", "13+", "14", "14+", "15", "15+"];

  const handlePaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const json = JSON.parse(e.target.value);
      setData(json);
    } catch (err) {
      console.error("Invalid JSON format");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
{/* ナビゲーションバー */}
      <nav className="bg-white border-b border-slate-200 py-4 mb-8 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-black tracking-tighter text-blue-600">CHUNI SCOPE</h1>
          
          {/* データがある時だけボタンを表示 */}
          {data && (
            <div className="flex items-center gap-3">
              {/* ここに共有ボタンを追加し、refを渡す */}
              <ShareButton targetRef={contentRef} />
              
              <button 
                onClick={() => setData(null)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full transition"
              >
                データをリセット
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4">
        {!data && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h2 className="text-2xl font-bold mb-2 text-center">分析を開始</h2>
            <p className="text-slate-500 text-center mb-8">
              CHUNITHM-NETから取得したデータを貼り付けてください
            </p>
            <textarea 
              onChange={handlePaste}
              placeholder='{"player": ...}'
              className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition font-mono text-xs"
            />
          </div>
        )}

        {data && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div ref={contentRef} className="bg-slate-50 p-4 -m-4 rounded-xl">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* プレイヤー情報カード */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-lg shadow-blue-200 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-blue-200 text-xs font-bold tracking-widest uppercase">Player Profile</span>
                  <h2 className="text-4xl font-black mt-1 mb-6">{data.player.name}</h2>
                  <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-blue-100 text-xs opacity-80 font-bold">RATING</p>
                    <p className={`text-5xl font-black tracking-tighter ${getRatingStyle(data.player.rating)}`}>
                    {data.player.rating}
                    </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold"></p>
                    </div>
                  </div>
                </div>
                {/* 背景装飾 */}
                <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>

              {/* サブステータス */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="mb-6">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Overpower</p>
                  <p className="text-2xl font-black text-slate-800">{data.player.overpower}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Play Rate</p>
                  <p className="text-3xl font-black text-green-500">
                    {calculatePlayRate(data.scores).toFixed(1)}<span className="text-sm ml-1">%</span>
                  </p>
                </div>
              </div>
            </div>
{/* 実績統計セクション */}
<section className="w-full">
  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
    <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
    Record Statistics (MASTER & ULTIMA)
  </h3>
  {/* grid-cols-1 (スマホ)
    sm:grid-cols-2 (大きめのスマホ)
    md:grid-cols-3 (タブレット)
    lg:grid-cols-5 (PC) 
  */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
  <StatCard label="SSS" count={data.player.sssCount} total={data.allCharts} colorKey="rose" />
  <StatCard label="SSS+" count={data.player.sssPlusCount} total={data.allCharts} colorKey="red" />
  <StatCard label="AJ" count={data.player.ajCount} total={data.allCharts} colorKey="orange" />
  <StatCard label="AJC" count={data.player.ajcCount} total={data.allCharts} colorKey="yellow" />
  <StatCard label="FC" count={data.player.fcCount} total={data.allCharts} colorKey="emerald" />
</div>
</section>

            {/* レベル別平均スコア */}
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                Difficulty Summary
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {levels.map(lv => {
                  const avg = calculateAverageForLevel(data.scores, lv);
                  const isNoData = avg === 0;

                  return (
                    <div 
                      key={lv} 
                      className={`p-4 rounded-2xl border transition-all ${
                        isNoData ? 'bg-slate-50 border-slate-100 opacity-50' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <p className="text-xs font-black text-slate-400 mb-1">LEVEL {lv}</p>
                      <p className={`text-lg font-black tracking-tighter ${isNoData ? 'text-slate-300' : 'text-slate-800'}`}>
                        {isNoData ? 'NO DATA' : 'AVG: '+avg.toLocaleString()}
                      </p>
                      {!isNoData && (
                        <div className="mt-2 flex items-center gap-1">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 ${getRankColor(avg)}`}>
                            {getRank(avg)}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;