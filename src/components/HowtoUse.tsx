import { useState } from 'react';

interface HowToUseProps {
	onBack: () => void;
}

export const HowToUse = ({ onBack }: HowToUseProps) => {
	const [copied, setCopied] = useState(false);
	const bookmarkletCode = `javascript:(function(){var s=document.createElement('script');s.src='https://gist.githack.com/w4mally/4f567e9597df6b66ea41f9098b74d002/raw/chuniscope-scraper.js';s.charset='UTF-8';document.body.appendChild(s);})();`;

	const handleCopy = () => {
		navigator.clipboard.writeText(bookmarkletCode).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
			{/* ヘッダー */}
			<div className="bg-white border-b border-slate-200 sticky top-0 z-10">
				<div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
					<h2 className="font-bold text-lg">CHUNI SCOPEの使い方</h2>
					<button
						onClick={onBack}
						className="text-sm font-bold text-slate-500 hover:text-slate-800 bg-slate-100 px-3 py-1.5 rounded-full"
					>
						閉じる
					</button>
				</div>
			</div>

			<div className="max-w-2xl mx-auto px-4 py-8 space-y-12">
				{/* STEP 1 */}
				<section>
					<div className="flex items-center gap-4 mb-4">
						<div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl shrink-0">
							1
						</div>
						<h3 className="text-xl font-bold">コードをコピー</h3>
					</div>
					<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
						<p className="text-sm text-slate-600 mb-4 leading-relaxed">
							下のボタンを押して、ツールを動かすためのコードをコピーしてください。
						</p>
						<button
							onClick={handleCopy}
							className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${
								copied
									? 'bg-emerald-500 text-black shadow-emerald-200'
									: 'bg-slate-800 text-black shadow-slate-300 hover:bg-slate-700 active:scale-95'
							}`}
						>
							{copied ? (
								<>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
									</svg>
									コピーしました！
								</>
							) : (
								<>コードをコピーする</>
							)}
						</button>
					</div>
				</section>

				{/* STEP 2 */}
				<section>
					<div className="flex items-center gap-4 mb-4">
						<div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl shrink-0">
							2
						</div>
						<h3 className="text-xl font-bold">ブックマークを作成</h3>
					</div>
					<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
						<p className="text-sm text-slate-600 mb-4 leading-relaxed">
							このページ（または適当なページ）をブックマークしてください。
							<br />
							後で中身を書き換えるので、場所はどこでもOKです。
						</p>
					</div>
				</section>

				{/* STEP 3 */}
				<section>
					<div className="flex items-center gap-4 mb-4">
						<div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl shrink-0">
							3
						</div>
						<h3 className="text-xl font-bold">URLを書き換える</h3>
					</div>
					<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
						<p className="text-sm text-slate-600 mb-4 leading-relaxed">
							保存したブックマークを「編集」し、URLの欄に先ほどコピーしたコードを貼り付けて保存します。タイトルも「CHUNI
							SCOPE」など分かりやすい名前にしておきましょう。
						</p>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5">
									タイトル
								</span>
								<div className="text-sm font-bold">
									CHUNI SCOPE{' '}
									<span className="font-normal text-slate-400 text-xs">（分かりやすい名前に）</span>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5">
									URL
								</span>
								<div className="text-sm text-slate-500 break-all">
									<span className="text-slate-300 line-through">https://...</span>
									<br />
									<span className="text-blue-600 font-bold">javascript:(async...</span>
									<span className="text-slate-400 text-xs ml-2">
										← 先ほどコピーしたものをペースト
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* 実行方法 */}
				<section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
					<h3 className="text-blue-800 font-bold text-lg mb-2 flex items-center gap-2">
						準備完了！
					</h3>
					<p className="text-sm text-blue-700 leading-relaxed">
						あとは <strong>CHUNITHM-NET</strong> にログインして、作成したブックマークを開くだけ。
						<br />
						自動でデータが収集され、このサイトに戻ってきます。
						<br />
						※本ツールの利用にはゲキチュウマイ-NET利用権 スタンダードコースへの加入が必要です。
					</p>
					<a
						href="https://new.chunithm-net.com/"
						target="_blank"
						rel="noreferrer"
						className="mt-4 block w-full bg-blue-600 text-center font-bold py-3 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-500 transition"
					>
						<p className="text-white">CHUNITHM-NETにアクセス</p>
					</a>
				</section>

				<div className="text-center pt-8">
					<button
						onClick={onBack}
						className="text-slate-400 font-bold hover:text-slate-600 transition"
					>
						トップページに戻る
					</button>
				</div>
			</div>
		</div>
	);
};