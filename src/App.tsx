import { useState, useRef, useEffect } from 'react';
import type { ChuniData } from './types';
import ShareButton from './components/shareButton';
import StatCard from './components/StatCard';
import PlayerProfile from './features/PlayerProfile';
import DifficultySummary from './features/DifficultySummary';
import LandingPage from './features/LandingPage';

function App() {
	const [data, setData] = useState<ChuniData | null>(() => {
		const params = new URLSearchParams(window.location.search);
		if (params.get('auto_import') === 'true' && window.name) {
			try {
				const json = JSON.parse(window.name);
				window.name = ''; // 読み込み後にクリア
				return json;
			} catch (e) {
				return null;
			}
		}
		return null;
	});

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		if (params.get('auto_import') === 'true') {
			window.history.replaceState({}, document.title, window.location.pathname);
		}
	}, []);

	const contentRef = useRef<HTMLDivElement>(null);

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
