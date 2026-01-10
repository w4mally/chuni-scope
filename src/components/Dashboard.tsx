import PlayerProfile from '../features/PlayerProfile';
import StatCard from './StatCard';
import DifficultySummary from '../features/DifficultySummary';
import type { ChuniData } from '../types';

interface DashboardProps {
	data: ChuniData;
}

export const Dashboard = ({ data }: DashboardProps) => {
	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
			<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
				<PlayerProfile data={data} />

				<section className="w-full">
					<h3 className="text-lg font-bold mb-4 flex items-center gap-2">
						<span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
						All Record Statistics (MASTER & ULTIMA)
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
						<StatCard label="SSS" count={data.player.sss} total={data.allCharts} colorKey="rose" />
						<StatCard
							label="SSS+"
							count={data.player.sssPlus}
							total={data.allCharts}
							colorKey="red"
						/>
						<StatCard label="AJ" count={data.player.aj} total={data.allCharts} colorKey="orange" />
						<StatCard
							label="AJC"
							count={data.player.ajc}
							total={data.allCharts}
							colorKey="yellow"
						/>
						<StatCard label="FullChain" count={data.player.fc} total={data.allCharts} colorKey="emerald" />
					</div>
				</section>

				<section>
					<h3 className="text-lg font-bold mb-4 flex items-center gap-2">
						<span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
						Difficulty Summary (MASTER & ULTIMA)
					</h3>
					<DifficultySummary data={data} />
				</section>
			</div>
		</div>
	);
};
