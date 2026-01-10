import { useState, useRef, useEffect } from 'react';
import type { ChuniData } from './types';
import ShareButton from './components/shareButton';
import StatCard from './components/StatCard';
import PlayerProfile from './features/PlayerProfile';
import DifficultySummary from './features/DifficultySummary';
import LandingPage from './features/LandingPage';
import { ExportView } from './components/ExportView';
import { LevelStatsExportView } from './components/LevelStatsExportView';
import { HowToUse } from './components/HowtoUse.tsx';

function App() {
	const contentRef = useRef<HTMLDivElement>(null);
	const [data, setData] = useState<ChuniData | null>(null);
	const [loading, setLoading] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showHowTo, setShowHowTo] = useState(false);
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

	if (showHowTo) {
        return <HowToUse onBack={() => setShowHowTo(false)} />;
    }

	if (loading) {
		return <div className="p-10 text-center font-bold">Now Loading...</div>;
	}

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12 overflow-x-hidden">
			{isMenuOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
					onClick={() => setIsMenuOpen(false)}
				/>
			)}
			{/* ナビゲーションバー */}
			<nav className="bg-white border-b border-slate-200 py-4 mb-8 sticky top-0 z-50 shadow-sm">
				<div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
					<h1 className="text-xl font-black tracking-tighter text-blue-600">CHUNI SCOPE</h1>

					{data && (
						<div className="flex items-center gap-2">
							{/* ▼▼▼ 【PC用】ヘッダー内ボタン (スマホでは隠す) ▼▼▼ */}
							<div className="hidden md:flex items-center gap-2">
								<ShareButton targetRef={exportRef} fileName="chuni-all.png" label="画像を保存" />
								<ShareButton
									targetRef={levelStatsExportRef}
									fileName="chuni-level.png"
									label="レベル別のみ"
								/>
							</div>
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
				{!data && <LandingPage onShowHowTo={() => setShowHowTo(true)}/>}

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
			{data && (
				<div className="md:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
					{/* 展開される選択肢*/}
					{isMenuOpen && (
						<div className="flex flex-col gap-3 mb-2 animate-in slide-in-from-bottom-4 fade-in duration-200">
							{/* レベル別のみ */}
							<div className="flex items-center gap-2 justify-end">
								<span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm shadow-sm">
									レベル別のみ
								</span>
								<div className="shadow-xl rounded-full">
									<ShareButton
										targetRef={levelStatsExportRef}
										fileName="chuni-level.png"
										label="保存"
									/>
								</div>
							</div>

							{/* 全体を保存 */}
							<div className="flex items-center gap-2 justify-end">
								<span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm shadow-sm">
									全体を保存
								</span>
								<div className="shadow-xl rounded-full">
									<ShareButton targetRef={exportRef} fileName="chuni-all.png" label="保存" />
								</div>
							</div>
						</div>
					)}

					{/*トリガーボタン*/}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all active:scale-95 text-black`}
						style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
					>
						{isMenuOpen ? (
							// 閉じる(×)アイコン
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						) : (
							// 保存(共有)アイコン
							<div className="relative">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={2}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
									/>
								</svg>
							</div>
						)}
					</button>
				</div>
			)}
			{/*画像用*/}
			<div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
				{data && (
					<>
						<ExportView ref={exportRef} data={data} />
						<LevelStatsExportView ref={levelStatsExportRef} data={data} />
					</>
				)}
			</div>
		</div>
	);
}

export default App;
