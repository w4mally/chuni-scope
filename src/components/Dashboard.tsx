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
						<StatCard
							label="SSS"
							mascount={data.totals.master.sss}
							mastotal={data.totals.master.total}
							ultcount={data.totals.ultima.sss}
							ulttotal={data.totals.ultima.total}
							colorKey="rose"
						/>
						<StatCard
							label="SSS"
							mascount={data.totals.master.sssPlus}
							mastotal={data.totals.master.total}
							ultcount={data.totals.ultima.sssPlus}
							ulttotal={data.totals.ultima.total}
							colorKey="red"
						/>
						<StatCard
							label="AJ"
							mascount={data.totals.master.aj}
							mastotal={data.totals.master.total}
							ultcount={data.totals.ultima.aj}
							ulttotal={data.totals.ultima.total}
							colorKey="orange"
						/>
						<StatCard
							label="AJC"
							mascount={data.totals.master.ajc}
							mastotal={data.totals.master.total}
							ultcount={data.totals.ultima.ajc}
							ulttotal={data.totals.ultima.total}
							colorKey="yellow"
						/>
						<StatCard
							label="FULLCHAIN"
							mascount={data.totals.master.fc}
							mastotal={data.totals.master.total}
							ultcount={data.totals.ultima.fc}
							ulttotal={data.totals.ultima.total}
							colorKey="emerald"
						/>
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
