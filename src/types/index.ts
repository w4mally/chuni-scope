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
}

export interface ChuniData {
    player: PlayerInfo;
    scores: ScoreData[];
}