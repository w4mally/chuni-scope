import { useState } from 'react';

const LandingPage = () => {
	const [copyStatus, setCopyStatus] = useState<'idle' | 'success'>('idle');

	const bookmarkletCode = `javascript:(async()=>{/* ここに先ほどのスクレイパーコードを貼り付け */})();`;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(bookmarkletCode);
		setCopyStatus('success');
		setTimeout(() => setCopyStatus('idle'), 2000);
	};

	return (
		<div className="max-w-4xl mx-auto space-y-16 py-12 animate-in fade-in duration-1000">
			<header className="text-center space-y-6">
				<h2 className="text-6xl font-black tracking-tighter text-slate-900 leading-tight">
					CHUNI SCOPE
				</h2>
				<p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                    CHUNI SCOPEはログイン不要、ワンタッチであなたのCHUNITHMの実力を可視化する非公式スコアツールです。
				</p>
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
								title: 'ネットで実行',
								desc: 'CHUNITHM-NETにログインし、ホーム画面でそのブックマークを押します。',
							},
							{
								step: '03',
								title: '解析を開始',
								desc: '自動コピーされたデータを、このページ下の入力エリアに貼り付けます。',
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
					<div className="mt-12 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
						<div className="flex flex-col md:flex-row items-center gap-4">
							<div className="flex-1 min-w-0 w-full">
								<p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-2">
									Bookmarklet Code
								</p>
								<div className="bg-black/20 p-3 rounded-xl font-mono text-[10px] break-all line-clamp-2 opacity-70">
									{bookmarkletCode}
								</div>
							</div>
							<button
								onClick={copyToClipboard}
								className={`whitespace-nowrap px-8 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 ${
									copyStatus === 'success'
										? 'bg-emerald-400 text-white'
										: 'bg-white text-blue-600 hover:bg-blue-50'
								}`}
							>
								{copyStatus === 'success' ? 'COPIED! ✅' : 'コードをコピー'}
							</button>
						</div>
					</div>
				</div>

				{/* 装飾用背景 */}
				<div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
			</section>
		</div>
	);
};

export default LandingPage;
