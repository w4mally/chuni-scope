import { useState, useRef, useEffect } from 'react';
import type { ChuniData } from './types';
import ShareButton from './components/shareButton';
import LandingPage from './features/LandingPage';
import { ExportView } from './components/ExportView';
import { LevelStatsExportView } from './components/LevelStatsExportView';
import { HowToUse } from './components/HowtoUse.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { MobileShareButton } from './components/MobileShareButton.tsx';

function App() {
	const [data, setData] = useState<ChuniData | null>(null);
	const [loading, setLoading] = useState(false);
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
			{/* ナビゲーションバー */}
			<nav className="bg-white border-b border-slate-200 py-4 mb-8 sticky top-0 z-50 shadow-sm">
				<div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
					<h1 className="text-xl font-black tracking-tighter text-blue-600">CHUNI SCOPE</h1>

					{data && (
						<div className="flex items-center gap-2">
							{/*ヘッダー内ボタン (スマホでは隠す)*/}
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
				{!data && <LandingPage onShowHowTo={() => setShowHowTo(true)} />}
				{data && <Dashboard data={data} />}
			</div>

			{data && (
				<MobileShareButton exportRef={exportRef} levelStatsExportRef={levelStatsExportRef}/>
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
