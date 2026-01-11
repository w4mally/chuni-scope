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

export interface DifficultyStat {
    total: number;
    sss: number;
    sssPlus: number;
    aj: number;
    ajc: number;
    fc: number;
    lost: number;
}

export interface LevelData {
    master: DifficultyStat;
    ultima: DifficultyStat;
}

export interface ChuniData {
    allCharts: number
    player: PlayerInfo;
    levelStats: Record<string, LevelData>;
    scores: ScoreData[];
    totals: {
        master: DifficultyStat;
        ultima: DifficultyStat;
    }
}