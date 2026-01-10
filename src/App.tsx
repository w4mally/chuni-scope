import { useState, useRef, useEffect } from 'react';
import type { ChuniData } from './types';
import ShareButton from './components/shareButton';
import StatCard from './components/StatCard';
import PlayerProfile from './features/PlayerProfile';
import DifficultySummary from './features/DifficultySummary';
import LandingPage from './features/LandingPage';
import { ExportView } from './components/ExportView';
import { LevelStatsExportView } from './components/LevelStatsExportView';

function App() {
	const contentRef = useRef<HTMLDivElement>(null);
	const [data, setData] = useState<ChuniData | null>(null);
	const [loading, setLoading] = useState(false);
	const exportRef = useRef<HTMLDivElement>(null);
	const levelStatsExportRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const id = params.get('id');

		if (id) {
			setLoading(true);
			fetch(`/api/load?id=${id}`)
				.then(async (res) => {
					if (!res.ok) throw new Error('Data not found');
					return res.json();
				})
				.then((fetchedData) => {
					setData(fetchedData);
					window.history.replaceState(null, '', window.location.pathname);
				})
				.catch((err) => {
					console.error(err);
					alert('データの読み込みに失敗しました');
				})
				.finally(() => setLoading(false));
		}
	}, []);

	if (loading) {
		return <div className="p-10 text-center font-bold">Now Loading...</div>;
	}

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12 overflow-x-hidden">
			{/* ナビゲーションバー */}
			<nav className="bg-white border-b border-slate-200 py-4 mb-8 sticky top-0 z-50 shadow-sm">
				<div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
					<h1 className="text-xl font-black tracking-tighter text-blue-600">CHUNI SCOPE</h1>

					{data && (
						<div className="flex items-center gap-3">
							<ShareButton 
								targetRef={exportRef}
								fileName="chuni-all.png"
								label="画像を保存" />
							<ShareButton
								targetRef={levelStatsExportRef}
								fileName="chuni-levels.png"
								label="Lv別のみ保存"
							/>

							<button
								onClick={() => setData(null)}
								className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full transition"
							>
								トップに戻る
							</button>
						</div>
					)}
				</div>
			</nav>

			<div className="max-w-5xl mx-auto px-4">
				{!data && <LandingPage />}

				{data && (
					<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
						<div ref={contentRef} className="bg-slate-50 p-4 rounded-xl w-full">
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
			{/*画像用*/}
			<div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
				{data && (
					<>
						{/* 全体保存用 */}
						<ExportView ref={exportRef} data={data} />

						{/* レベル別保存用（ここに追加！） */}
						<LevelStatsExportView ref={levelStatsExportRef} data={data} />
					</>
				)}
			</div>
		</div>
	);
}

export default App;
