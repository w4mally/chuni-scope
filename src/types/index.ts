export type Difficulty = 'MASTER' | 'ULTIMA';

export interface ScoreData {
    title: string;
    difficulty: Difficulty;
    levelStr: string;
    score: number;
    isPlayed: boolean;
}

export interface PlayerInfo {
    name: string;
    reborn : number;
    level: number;
    rating: string;
    overpower: string;
    sss : number;
    sssPlus : number;
    aj : number;
    ajc : number;
    fc : number
}

export interface LevelStat {
    total: number;
    sss: number;
    aj: number;
    ajc: number;
}

export interface ChuniData {
    allCharts: number
    player: PlayerInfo;
    scores: ScoreData[];
    levelStats: Record<string, LevelStat>;
}