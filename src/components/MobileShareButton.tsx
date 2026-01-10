import { useState } from 'react';
import ShareButton from './shareButton';
import { PiDownloadSimpleBold } from "react-icons/pi";
import { IconContext } from 'react-icons';

interface MobileShareButtonProps {
	exportRef: React.RefObject<HTMLDivElement | null>;
	levelStatsExportRef: React.RefObject<HTMLDivElement | null>;
}

export const MobileShareButton = ({ exportRef, levelStatsExportRef }: MobileShareButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{isOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
					onClick={() => setIsOpen(false)}
				/>
			)}
			<div className="md:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
				{/*選択肢*/}
				{isOpen && (
					<div className="flex flex-col gap-3 mb-2 animate-in slide-in-from-bottom-4 fade-in duration-200">
						{/* レベル別のみ */}
						<div className="flex items-center gap-2 justify-end">
							<span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm shadow-sm">
								レベル別のみ
							</span>
							<div className="shadow-xl rounded-full">
								<ShareButton
									targetRef={levelStatsExportRef}
									fileName="chuni-level.png"
									label="保存"
								/>
							</div>
						</div>

						{/* 全体を保存 */}
						<div className="flex items-center gap-2 justify-end">
							<span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm shadow-sm">
								全体を保存
							</span>
							<div className="shadow-xl rounded-full">
								<ShareButton targetRef={exportRef} fileName="chuni-all.png" label="保存" />
							</div>
						</div>
					</div>
				)}

				{/*トリガーボタン*/}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all active:scale-95 text-black`}
					style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
				>
					{isOpen ? (
						// 閉じる(×)アイコン
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					) : (
						// 保存(共有)アイコン
						<div className="relative">
                            <IconContext.Provider value={{ size: '1.7em' }}>
                                <PiDownloadSimpleBold />
                            </IconContext.Provider>
						</div>
					)}
				</button>
			</div>
		</>
	);
};
