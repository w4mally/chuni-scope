import { useState, useCallback } from 'react';
import { toPng } from 'html-to-image';

interface ShareButtonProps {
    targetRef: React.RefObject<HTMLDivElement | null>;
    fileName?: string;
    label?: string;
}

const ShareButton = ({ targetRef, fileName, label = 'chuni-scope-result.png' }: ShareButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

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

            const link = document.createElement('a');
            link.download = fileName || 'chuni-scope-result.png'
            link.href = dataUrl;
            link.click();
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
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm shadow-md transition-all active:scale-95 hover:shadow-lg"
            style={{
                backgroundColor: isLoading ? '#d1d5db' : '#2563eb',
                color: '#ffffff',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                border: 'none',
                minWidth: '150px',
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    {label}
                </>
            )}
        </button>
    );
};

export default ShareButton;