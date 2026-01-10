import ShareButton from './shareButton';

interface HeaderShareButtonProps {
	exportRef: React.RefObject<HTMLDivElement | null>;
	levelStatsExportRef: React.RefObject<HTMLDivElement | null>;
	onReset: () => void;
}

export const HeaderShareButton = ({ exportRef, levelStatsExportRef, onReset }: HeaderShareButtonProps) => {
	return (
		<div className="flex items-center gap-2">
			<div className="hidden md:flex items-center gap-2">
				<ShareButton targetRef={exportRef} fileName="chuni-all.png" label="画像を保存" />
				<ShareButton
					targetRef={levelStatsExportRef}
					fileName="chuni-level.png"
					label="レベル別のみ"
				/>
			</div>
			<button
				onClick={onReset}
				className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full transition"
			>
				トップに戻る
			</button>
		</div>
	);
};
