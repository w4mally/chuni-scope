// src/hooks/useChuniStats.ts
import { useMemo } from 'react';
import type { ScoreData } from '../types';
import { calculateAverageForLevel, getScoreDistribution, calculatePlayRate } from '../utils/stats';

const LEVELS = ["10", "10+", "11", "11+", "12", "12+", "13", "13+", "14", "14+", "15", "15+"];

export const useChuniStats = (scores: ScoreData[] | null) => {
  // レベル別平均スコアデータ (Recharts用)
    const levelAverages = useMemo(() => {
        if (!scores) return [];
            return LEVELS.map(lv => ({
                level: lv,
                average: calculateAverageForLevel(scores, lv)
            }));
    }, [scores]);

  // スコア分布データ (Recharts用)
    const scoreDistribution = useMemo(() => {
        if (!scores) return [];
            return getScoreDistribution(scores);
    }, [scores]);

  // 全体のプレイ率
    const totalPlayRate = useMemo(() => {
        if (!scores) return 0;
        return calculatePlayRate(scores);
    }, [scores]);

    return { levelAverages, scoreDistribution, totalPlayRate, levels: LEVELS };
};