import { useState, useRef } from 'react';
import type { ChuniData } from './types';
import ShareButton from './components/shareButton';
import StatCard from './components/StatCard';
import PlayerProfile from './features/PlayerProfile';
import DifficultySummary from './features/DifficultySummary';

function App() {
	const [data, setData] = useState<ChuniData | null>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const handlePaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		try {
			const json = JSON.parse(e.target.value);
			setData(json);
		} catch (err) {
			console.error('Invalid JSON format');
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
			{/* ナビゲーションバー */}
			<nav className="bg-white border-b border-slate-200 py-4 mb-8 sticky top-0 z-10 shadow-sm">
				<div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
					<h1 className="text-xl font-black tracking-tighter text-blue-600">CHUNI SCOPE</h1>

					{data && (
						<div className="flex items-center gap-3">
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
							placeholder="ここにデータをペースト"
							className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition font-mono text-xs"
						/>
					</div>
				)}

				{data && (
					<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
						<div ref={contentRef} className="bg-slate-50 p-4 -m-4 rounded-xl">
							<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
								<PlayerProfile data={data} />

								<section className="w-full">
									<h3 className="text-lg font-bold mb-4 flex items-center gap-2">
										<span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
										All Record Statistics (MASTER & ULTIMA)
									</h3>
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
										<StatCard
											label="SSS"
											count={data.player.sss}
											total={data.allCharts}
											colorKey="rose"
										/>
										<StatCard
											label="SSS+"
											count={data.player.sssPlus}
											total={data.allCharts}
											colorKey="red"
										/>
										<StatCard
											label="AJ"
											count={data.player.aj}
											total={data.allCharts}
											colorKey="orange"
										/>
										<StatCard
											label="AJC"
											count={data.player.ajc}
											total={data.allCharts}
											colorKey="yellow"
										/>
										<StatCard
											label="FC"
											count={data.player.fc}
											total={data.allCharts}
											colorKey="emerald"
										/>
									</div>
								</section>

								<section>
									<h3 className="text-lg font-bold mb-4 flex items-center gap-2">
										<span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
										Difficulty Summary (MASTER & ULTIMA)
									</h3>
									<DifficultySummary data={data} />
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