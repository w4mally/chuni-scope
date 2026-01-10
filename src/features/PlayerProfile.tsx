import { getRatingStyle } from '../utils/rating';
import { calculatePlayRate } from '../utils/stats';
import type { ChuniData } from '../types';

interface PlayerProfileProps {
	data: ChuniData;
}

const PlayerProfile = ({ data }: PlayerProfileProps) => {
	const playRate = calculatePlayRate(data.scores).toFixed(1);
	// OVERPOWERの表示を整形
	const opMatch = data.player.overpower.match(/^([\d.]+)\s+\(([\d.]+%)\)$/);
	const opValue = opMatch ? opMatch[1] : data.player.overpower;
	const opPercent = opMatch ? opMatch[2] : '';

	const labelStyle = 'text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80';

	const valueBaseStyle = 'text-4xl md:text-5xl font-black tracking-tighter leading-none';

	return (
		<div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-lg shadow-blue-200 text-white relative overflow-hidden">
			<div className="relative z-10 flex flex-col gap-8">
				{/* 上段：名前とレベル */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
					<div>
						<span className={labelStyle}>Player Profile</span>
						<h2 className="text-3xl md:text-4xl font-black mt-1 leading-none truncate">
							{data.player.name}
						</h2>
					</div>
				</div>

				{/* 下段：主要ステータス横並び（スマホでは縦） */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
					{/* RATING */}
					<div>
						<p className={labelStyle}>Rating</p>
						<p className={`${valueBaseStyle} ${getRatingStyle(data.player.rating)}`}>
							{data.player.rating}
						</p>
					</div>

					{/* OVERPOWER */}
					{/* PC画面では左に区切り線を入れる */}
					<div className="md:border-l md:pl-6 border-white/10">
						<p className={labelStyle}>Overpower</p>
						<div className="flex items-baseline gap-2 flex-wrap">
							<p className={`${valueBaseStyle} text-white`}>{opValue}</p>
							{opPercent && <p className="text-xl font-bold opacity-80">{opPercent}</p>}
						</div>
					</div>

					{/* PLAY RATE */}
					<div className="md:border-l md:pl-6 border-white/10">
						<p className={labelStyle}>Play Rate</p>
						<p className={`${valueBaseStyle} text-green-400`}>
							{playRate}
							<span className="text-2xl md:text-3xl ml-1">%</span>
						</p>
					</div>
				</div>
			</div>

			{/* 背景装飾 */}
			<div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
			<div className="absolute left-1/4 -top-12 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl"></div>
		</div>
	);
};

export default PlayerProfile;
