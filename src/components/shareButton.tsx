import { useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { RiShare2Line } from 'react-icons/ri';

interface ShareButtonProps {
    targetRef: React.RefObject<HTMLDivElement | null>;
    fileName?: string;
    label?: string;
}

const ShareButton = ({ targetRef, fileName = 'chuniscope-result.png', label = '画像を保存' }: ShareButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const dataUrlToFile = async (dataUrl: string, filename: string): Promise<File> => {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        return new File([blob], filename, { type: 'image/png' });
    };

    const handleShare = useCallback(async () => {
        if (!targetRef.current) return;
        setIsLoading(true);

        try {
            const dataUrl = await toPng(targetRef.current, {
                cacheBust: true,
                backgroundColor: '#f8fafc', 
                pixelRatio: 2,

                width: 1280,

                style: {
                    // 全体の幅を広げる
                    width: '1280px',
                    height: 'auto',
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column', 
                    alignItems: 'stretch',
                    // fontSize: '16px',
                },

                skipAutoScale: true,
            });

            const file = await dataUrlToFile(dataUrl, fileName);

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'CHUNI SCOPE',
                    text: '#chuni_scope',
                });
            } else {
                const link = document.createElement('a');
                link.download = fileName;
                link.href = dataUrl;
                link.click();
            }
        } catch (err) {
            console.error("画像生成エラー:", err);
            alert("画像の生成に失敗しました。");
        } finally {
            setIsLoading(false);
        }
    }, [targetRef, fileName]);

    return (
        <button
            onClick={handleShare}
            disabled={isLoading}
            // className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm shadow-md transition-all active:scale-95 hover:shadow-lg"
            className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm shadow-md transition-all active:scale-95 hover:shadow-lg whitespace-nowrap"
            style={{
                backgroundColor: isLoading ? '#d1d5db' : '#2563eb',
                color: '#ffffff',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                border: 'none',
                // minWidth: '150px',
                justifyContent: 'center'
            }}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    作成中...
                </>
            ) : (
                <>
                <RiShare2Line />
                    {label}
                </>
            )}
        </button>
    );
};

export default ShareButton;