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
    sssCount : number;
    sssPlusCount : number;
    ajCount : number;
    ajcCount : number;
    fcCount : number
}

export interface ChuniData {
    allCharts: number
    player: PlayerInfo;
    scores: ScoreData[];
}