import { getRatingStyle } from '../utils/rating';
import { calculatePlayRate } from '../utils/stats';
import type { ChuniData } from '../types';

interface PlayerProfileProps {
	data: ChuniData;
}

const PlayerProfile = ({ data }: PlayerProfileProps) => {
	return (
		<div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-lg shadow-blue-200 text-white relative overflow-hidden">
			<div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
				{/* 左側：名前とレーティング */}
				<div className="space-y-6">
					<div>
						<span className="text-blue-200 text-xs font-bold tracking-widest uppercase opacity-80">
							Player Profile
						</span>
						<h2 className="text-4xl font-black mt-1 leading-none">{data.player.name}</h2>
					</div>

					<div>
						<p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80">
							Rating
						</p>
						<p
							className={`text-6xl font-black tracking-tighter leading-none ${getRatingStyle(data.player.rating)}`}
						>
							{data.player.rating}
						</p>
					</div>
				</div>

				{/* 右側：詳細ステータス（Level, OP, PlayRate） */}
				<div className="grid grid-cols-2 md:grid-cols-1 gap-y-4 gap-x-8 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
					<div>
						<p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider opacity-80">
							Level
						</p>
						<p className="text-xl font-bold">
							☆{data.player.reborn} <span className="text-sm opacity-80">Lv.</span>
							{data.player.level}
						</p>
					</div>

					<div>
						<p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider opacity-80">
							Overpower
						</p>
						<p className="text-xl font-black text-white">{data.player.overpower}</p>
					</div>

					<div className="col-span-2 md:col-span-1">
						<p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider opacity-80">
							Play Rate
						</p>
						<p className="text-2xl font-black text-green-400">
							{calculatePlayRate(data.scores).toFixed(1)}
							<span className="text-sm ml-1">%</span>
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
