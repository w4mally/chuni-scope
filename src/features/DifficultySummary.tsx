import type { ChuniData } from '../types';
import { calculateAverageForLevel } from '../utils/stats';
import { getRank, getRankColor } from '../utils/rank';

interface DifficultySummaryProps {
	data: ChuniData;
}

const levels = ['10', '10+', '11', '11+', '12', '12+', '13', '13+', '14', '14+', '15', '15+'];

const DifficultySummary = ({ data }: DifficultySummaryProps) => {
	return (
		<section>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
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
									: 'bg-white border-slate-100 shadow-sm hover:shadow-md'
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
		</section>
	);
};

export default DifficultySummary;
