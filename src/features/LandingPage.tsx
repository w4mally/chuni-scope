import { useState } from 'react';
import { X } from 'lucide-react';

const LandingPage = () => {
	const [copyStatus, setCopyStatus] = useState<'idle' | 'success'>('idle');

	const bookmarkletCode = `javascript:(function(){var s=document.createElement('script');s.src='https://gist.githack.com/w4mally/4f567e9597df6b66ea41f9098b74d002/raw/chuniscope-scraper.js';s.charset='UTF-8';document.body.appendChild(s);})();`;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(bookmarkletCode);
		setCopyStatus('success');
		setTimeout(() => setCopyStatus('idle'), 2000);
	};

	const updateHistory = [
		{
			date: '2026.1.10',
			version: 'v1.0.0',
			content: 'CHUNI SCOPEを公開しました。',
		},
	];

	return (
		<div className="max-w-4xl mx-auto space-y-16 py-12 animate-in fade-in duration-1000">
			<header className="text-center space-y-6">
				<h2 className="text-6xl font-black tracking-tighter text-slate-900 leading-tight">
					CHUNI SCOPE
				</h2>
				<p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
					CHUNI SCOPEはログイン不要、ワンタッチであなたのCHUNITHMの実力を
					<br />
					可視化する非公式スコアツールです。
				</p>
				<div className="flex justify-center pt-2">
					<a
						href="https://x.com/Alc5_"
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 shadow-sm"
					>
						<X
							size={16}
							fill="currentColor"
							className="group-hover:scale-110 transition-transform"
						/>
						<span className="text-sm font-bold">Developed by @Alc5_</span>
					</a>
				</div>
			</header>

			{/* 使い方ガイド */}
			<section className="bg-blue-600 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
				<div className="relative z-10">
					<h3 className="text-3xl font-black mb-12 text-center">HOW TO USE</h3>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
						{[
							{
								step: '01',
								title: 'コードを登録',
								desc: '下のボタンからコードをコピーし、ブラウザのブックマークに保存します。',
							},
							{
								step: '02',
								title: 'データを収集',
								desc: 'CHUNITHM-NETにログインし、ホーム画面で保存したブックマークを押します。',
							},
							{
								step: '03',
								title: '実力を見る',
								desc: '自動であなたの腕前が分かりやすく表示されます。結果は画像にして保存できるのでXでシェアしましょう！',
							},
						].map((item) => (
							<div key={item.step} className="space-y-4">
								<div className="text-5xl font-black opacity-20">{item.step}</div>
								<h4 className="text-xl font-bold">{item.title}</h4>
								<p className="text-blue-100 text-sm leading-relaxed opacity-90">{item.desc}</p>
							</div>
						))}
					</div>

					{/* ブックマークレット配布エリア */}
					<div className="mt-16 bg-white/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/20 shadow-xl">
						<div className="flex flex-col md:flex-row items-center gap-6">
							<div className="flex-1 min-w-0 w-full">
								<p className="text-xs font-black uppercase tracking-widest text-blue-200 mb-3 ml-1">
									Bookmarklet Code
								</p>
								{/* コード表示エリアを大きく、文字も少し大きく */}
								<div className="bg-black/30 p-5 rounded-2xl font-mono text-xs md:text-sm break-all line-clamp-3 opacity-80 leading-relaxed">
									{bookmarkletCode}
								</div>
							</div>

							{/* ボタンを大きく、文字サイズもアップ */}
							<button
								onClick={copyToClipboard}
								className={`w-30 flex justify-center items-center whitespace-nowrap px-10 py-5 rounded-2xl font-black text-lg shadow-lg transition-all active:scale-95 hover:scale-105 ${
									copyStatus === 'success'
										? 'bg-white text-blue-600 hover:bg-blue-50'
										: 'bg-white text-blue-600 hover:bg-blue-50'
								}`}
							>
								{copyStatus === 'success' ? (
									<span className="flex items-center gap-2">
										<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="3"
												d="M5 13l4 4L19 7"
											></path>
										</svg>
										Copied!
									</span>
								) : (
									'Copy'
								)}
							</button>
						</div>
					</div>
				</div>

				{/* 装飾用背景 */}
				<div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
			</section>
			<section className="px-6 py-12">
				<div className="max-w-5xl mx-auto space-y-12">
					{/* 導入テキスト：中央寄せで強調 */}
					<div className="text-center max-w-2xl mx-auto">
						<p className="text-slate-600 text-lg font-medium leading-relaxed">
							CHUNI SCOPEでは、あなたのCHUNITHMの実力を一瞬でまとめることができます。
							<br />
							まとめた結果は画像にして保存できます。
						</p>
					</div>

					{/* 特徴リスト：PC版では3カラム、スマホ版では1カラム */}
					<ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{
								title: '軽量な動作',
								desc: 'ユーザーが実力の指標にすることの多いMASTER, ULTIMA譜面の記録に絞って集計するので動作が軽いです。',
							},
							{
								title: 'シンプルな見た目',
								desc: '必要十分な情報のみを表示するのでシンプルかつ分かりやすいです。',
							},
							{
								title: 'セキュリティに配慮した設計',
								desc: 'データ収集はブラウザ上のみで行われ、ログイン情報の記録などは行いません。',
							},
						].map((feature, i) => (
							<li
								key={i}
								className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4"
							>
								{/* アイコン部分 */}
								<div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="3"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
								</div>

								{/* テキスト部分 */}
								<div className="space-y-2">
									<h4 className="font-bold text-slate-900 text-lg">{feature.title}</h4>
									<p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* 更新履歴リスト本体 */}
			<div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8">
				<div className="relative border-l border-white/10 ml-3 space-y-8 py-2">
							<h2>更新履歴</h2>
					{updateHistory.map((item, index) => (
						<div key={index} className="relative pl-8 group">
							<div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
								{/* 日付 */}
								<span className="font-mono text-xs font-bold text-blue">{item.date}</span>
								{/* バージョンバッジ */}
								<span className="bg-blue-500 text-blue text-[10px] font-bold px-2 py-0.5 rounded border border-blue-400/20 w-fit">
									{item.version}
								</span>
							</div>

							{/* 内容 */}
							<p className="text-sm text-black-300 leading-relaxed">{item.content}</p>
						</div>
					))}
				</div>
			</div>

			{/* フッター・免責事項 */}
			<footer className="mt-20 py-12 border-t border-slate-200">
				<div className="max-w-3xl mx-auto px-6 text-center space-y-4">
					<div className="flex justify-center gap-2 items-center text-slate-400 mb-2">
						<span className="w-8 h-px bg-slate-200"></span>
						<span className="text-[10px] font-black uppercase tracking-[0.2em]">Disclaimer</span>
						<span className="w-8 h-px bg-slate-200"></span>
					</div>

					<div className="space-y-2">
						<p className="text-xs text-slate-500 leading-relaxed">
							本サービスは個人が開発した非公式ツールです。株式会社セガ（SEGA）様とは一切関係ありません。
						</p>
						<p className="text-xs text-slate-400 leading-relaxed">
							本ツールの利用によって生じたデータの損失、アカウントの制限、その他いかなるトラブルや損害についても、製作者は一切の責任を負いかねます。
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default LandingPage;
