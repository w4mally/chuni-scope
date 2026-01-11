import type { ColorKey } from "../constants/colors";
import { COLOR_VARIANTS } from "../constants/colors";

export interface StatCardProps {
	label: string;
	mascount: number;
	mastotal: number;
	ultcount: number;
	ulttotal: number;
	colorKey: ColorKey;
    isExport?: boolean;
}

const StatCard = ({ label, mascount, mastotal, ultcount, ulttotal, colorKey, isExport = false }: StatCardProps) => {
	const count = mascount + ultcount;
	const total = mastotal + ulttotal;
	const safeCount = count ?? 0;
	const percentage = total > 0 ? ((safeCount / total) * 100).toFixed(2) : '0.00';

	const colors = COLOR_VARIANTS[colorKey];

	const containerStyle = isExport
        // 保存用：影なし (shadow-none)、枠線あり (border-2)
        ? "bg-white rounded-2xl p-6 shadow-none border-2 border-slate-100 flex flex-col text-center justify-center"
        // 通常用：影あり (shadow-md)、枠線なし（元のデザイン）
        : "bg-white p-3 md:p-4 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col justify-between min-w-0 h-full";

	return (
		<div className={containerStyle}>
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
						className={`h-full opacity-70 ${colors.bg}`}
						style={{ width: `${percentage}%` }}
					></div>
				</div>
			</div>
			<div className="text-[10px] text-black-600 mt-2 font-medium">
				MASTER: {mascount} / {mastotal}
			</div>
			<div className="text-[10px] text-black-600 mt-1 font-medium">
				ULTIMA: {ultcount} / {ulttotal}
			</div>
		</div>
	);
};

export default StatCard;
