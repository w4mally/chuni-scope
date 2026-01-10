import type { StatCardProps } from "../types";
import { COLOR_VARIANTS } from "../constants/colors";

const StatCard = ({ label, count, total, colorKey }: StatCardProps) => {
	const safeCount = count ?? 0;
	const percentage = total > 0 ? ((safeCount / total) * 100).toFixed(2) : '0.00';

	const colors = COLOR_VARIANTS[colorKey];

	return (
		<div className="bg-white p-3 md:p-4 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col justify-between min-w-0 h-full">
			<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 truncate">
				{label}
			</p>

			<p className={`text-xl md:text-2xl font-black ${colors.text} break-all`}>
				{safeCount.toLocaleString()}
			</p>

			<div className="mt-auto">
				<p className="text-[10px] text-slate-400 mt-1 font-medium">/ {total.toLocaleString()}</p>
				<p className="text-[10px] text-slate-500 font-bold">({percentage}%)</p>

				<div className="mt-2 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
					<div
						className={`h-full opacity-50 ${colors.bg}`}
						style={{ width: `${percentage}%` }}
					></div>
				</div>
			</div>
		</div>
	);
};

export default StatCard;
