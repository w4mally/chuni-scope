// src/components/ExportView.tsx
import { forwardRef } from 'react';
import type { ChuniData } from '../types';
import { calculateAverageForLevel } from '../utils/stats';
import { getRank, getRankColor } from '../utils/rank';
import { getRatingStyle } from '../utils/rating';
import { calculatePlayRate } from '../utils/stats';
import StatCard from './StatCard';

interface ExportViewProps {
	data: ChuniData;
}

const valueBaseStyle = 'text-4xl md:text-5xl font-black tracking-tighter leading-none';

const levels = ['10', '10+', '11', '11+', '12', '12+', '13', '13+', '14', '14+', '15', '15+'];

export const ExportView = forwardRef<HTMLDivElement, ExportViewProps>(({ data }, ref) => {
	const { player } = data;
	const playRate = calculatePlayRate(data.scores).toFixed(1);

	return (
		<div
			ref={ref}
			className="bg-slate-50 font-sans text-slate-900"
			style={{ width: '1280px', minHeight: '800px', padding: '60px' }}
		>
			<div className="space-y-10">
				{/* === ヘッダー === */}
				<div className="flex justify-between items-end border-b-4 border-blue-600 pb-4">
					<h1 className="text-5xl font-black tracking-tighter text-blue-600">CHUNI SCOPE</h1>
					<span className="text-slate-400 font-bold text-xl">PLAYER RESULT CARD</span>
				</div>

				{/* === 1. プロフィール (横並び固定) === */}
				<div className="bg-white rounded-3xl shadow-none border-2 border-slate-200 p-8 border border-slate-100 flex items-center justify-between">
					<div>
						<div className="text-sm font-bold text-slate-400 tracking-widest mb-1">PLAYER</div>
						<div className="flex items-baseline gap-4">
							<div className="text-5xl font-black text-slate-800">{player.name}</div>
						</div>
					</div>
					{/* 右側のスタッツも横並び固定 */}
					<div className="flex gap-12 text-right">
						<div>
							<div className="text-sm font-bold text-slate-400 tracking-widest">RATING</div>
							<p className={`${valueBaseStyle} ${getRatingStyle(data.player.rating)}`}>
								{data.player.rating}
							</p>
						</div>
						<div>
							<div className="text-sm font-bold text-slate-400 tracking-widest">OVERPOWER</div>
							<div className="text-4xl font-black text-slate-700">{player.overpower}</div>
						</div>
						<div className="text-sm font-bold text-slate-400 tracking-widest">
							<p>PLAY RATE</p>
							<p className="text-4xl font-black text-slate-700">
								{playRate}
								<span className="text-2xl md:text-3xl ml-1">%</span>
							</p>
						</div>
					</div>
				</div>

				{/* === 2. 統計カード (5列固定) === */}
				<div>
					<h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
						<span className="w-2 h-8 bg-orange-500 rounded-full"></span>
						All Record Statistics{' '}
						<span className="text-slate-400 text-lg font-normal ml-2">(MASTER & ULTIMA)</span>
					</h3>
					{/* grid-cols-1 md:grid-cols-5 ではなく、常に grid-cols-5 */}
					<div className="grid grid-cols-5 gap-6">
						<StatCard
							label="SSS"
							count={data.player.sss}
							total={data.allCharts}
							colorKey="rose"
							isExport={true}
						/>
						<StatCard
							label="SSS+"
							count={data.player.sssPlus}
							total={data.allCharts}
							colorKey="red"
							isExport={true}
						/>
						<StatCard
							label="AJ"
							count={data.player.aj}
							total={data.allCharts}
							colorKey="orange"
							isExport={true}
						/>
						<StatCard
							label="AJC"
							count={data.player.ajc}
							total={data.allCharts}
							colorKey="yellow"
							isExport={true}
						/>
						<StatCard
							label="FC"
							count={data.player.fc}
							total={data.allCharts}
							colorKey="emerald"
							isExport={true}
						/>
					</div>
				</div>

				{/* === 3. 難易度別サマリー (6列固定) === */}
				<div>
					<h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
						<span className="w-2 h-8 bg-blue-500 rounded-full"></span>
						Difficulty Summary
					</h3>

					{/* 常に grid-cols-6 */}
					<div className="grid grid-cols-6 gap-4">
						{levels.map((lv) => {
							const avg = calculateAverageForLevel(data.scores, lv);
							const stats = data.levelStats[lv] || { total: 0, sss: 0, aj: 0, ajc: 0 };
							const isNoData = stats.total === 0;

							const getRate = (count: number) =>
								stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

							return (
								<div
									key={lv}
									className={`p-3 rounded-2xl border transition-all ${
										isNoData
											? 'bg-slate-50 border-slate-100 opacity-50'
											: 'bg-white border-slate-100 shadow-none border-2 hover:shadow-md'
									}`}
								>
									<div className="flex justify-between items-start mb-1">
										<span className="text-[10px] font-black text-slate-400 tracking-tighter">
											LV {lv}
										</span>
										{!isNoData && (
											<span
												className={`text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-50 ${getRankColor(avg)}`}
											>
												{getRank(avg)}
											</span>
										)}
									</div>

									<p
										className={`text-lg font-black tracking-tighter leading-none mb-3 ${isNoData ? 'text-slate-200' : 'text-slate-800'}`}
									>
										{isNoData ? '---' : 'AVG: ' + avg.toLocaleString()}
									</p>

									{!isNoData && (
										<div className="space-y-2 pt-2 border-t border-slate-50">
											<div className="flex justify-between text-[10px] font-black">
												<div className="text-center">
													<p className="text-slate-300 text-[8px] leading-tight">AJC</p>
													<p className="text-yellow-500">{stats.ajc}</p>
												</div>
												<div className="text-center border-x border-slate-50 px-2">
													<p className="text-slate-300 text-[8px] leading-tight">AJ</p>
													<p className="text-orange-500">{stats.aj}</p>
												</div>
												<div className="text-center">
													<p className="text-slate-300 text-[8px] leading-tight">SSS</p>
													<p className="text-rose-400">{stats.sss}</p>
												</div>
											</div>

											<div className="relative h-1 w-full bg-slate-50 rounded-full overflow-hidden">
												<div
													className="absolute h-full bg-rose-200"
													style={{ width: `${getRate(stats.sss)}%` }}
												></div>
												<div
													className="absolute h-full bg-orange-400"
													style={{ width: `${getRate(stats.aj)}%` }}
												></div>
											</div>

											<p className="text-[8px] text-slate-400 text-center font-bold">
												TOTAL: {stats.total}{' '}
												<span className="ml-1 text-slate-300">({getRate(stats.aj)}% AJ)</span>
											</p>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* フッター */}
			<div className="mt-12 text-right text-slate-400 font-mono text-sm">
				Generated by CHUNI SCOPE
			</div>
		</div>
	);
});
