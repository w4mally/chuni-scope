import type { ScoreData } from '../types';

// 特定のレベル文字列の平均スコアを計算する
export const calculateAverageForLevel = (scores: ScoreData[], level: string) => {
    const targetScores = scores.filter(s => s.levelStr === level && s.isPlayed);
    if (targetScores.length === 0) return 0;

    const sum = targetScores.reduce((acc, curr) => acc + curr.score, 0);
    return Math.floor(sum / targetScores.length);
};

// プレイ率を計算する
export const calculatePlayRate = (scores: ScoreData[]) => {
    if (scores.length === 0) return 0;
    const playedCount = scores.filter(s => s.isPlayed).length;
    return (playedCount / scores.length) * 100;
};

// スコア分布データを作成する
export const getScoreDistribution = (scores: ScoreData[]) => {
    const playedScores = scores.filter(s => s.isPlayed);

     // ランクの基準と表示ラベル
    const ranges = [
        { name: '～S+', min: 0, max: 989999 },
        { name: 'SS～', min: 1000000, max: 1004999 },
        { name: 'SS+～', min: 1005000, max: 1007499 },
        { name: 'SSS～', min: 1007500, max: 1008999 },
        { name: 'SSS+', min: 1009000, max: 1010000 },
    ];

    // 初期化（カウント0）
    const distribution = ranges.map(r => ({ name: r.name, count: 0, min: r.min, max: r.max }));

    playedScores.forEach(s => {
        for (const dist of distribution) {
            if (s.score >= dist.min && s.score <= dist.max) {
                dist.count++;
                break;
            }
        }
    });

  // Rechartsが読み込める形式（nameとcountの配列）で返す
    return distribution.map(({ name, count }) => ({ name, count }));
};