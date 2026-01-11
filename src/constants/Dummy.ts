// src/constants/dummyData.ts
import type { ChuniData } from '../types';

export const DUMMY_DATA: ChuniData = {
    // 全譜面数
    allCharts: 1600,

    // プレイヤー情報
    player: {
        name: "CHUNI_TESTER",
        reborn: 1,
        level: 99,
        rating: "17.25",
        overpower: "135000.00",
        sss: 1500,
        sssPlus: 1400,
        aj: 1200,
        ajc: 100,
        fc: 300
    },

    // 難易度別の統計 (lost を追加)
    levelStats: {
        "10": {
            // 低難易度はほぼ理論値に近いので失点は少ない
            master: { total: 10, sss: 10, sssPlus: 10, aj: 10, ajc: 5, fc: 0, lost: 150 },
            ultima: { total: 0, sss: 0, sssPlus: 0, aj: 0, ajc: 0, fc: 0, lost: 0 }
        },
        "10+": {
            master: { total: 20, sss: 20, sssPlus: 20, aj: 15, ajc: 2, fc: 5, lost: 400 },
            ultima: { total: 0, sss: 0, sssPlus: 0, aj: 0, ajc: 0, fc: 0, lost: 0 }
        },
        "11": {
            master: { total: 50, sss: 50, sssPlus: 48, aj: 40, ajc: 10, fc: 10, lost: 2500 },
            ultima: { total: 0, sss: 0, sssPlus: 0, aj: 0, ajc: 0, fc: 0, lost: 0 }
        },
        "11+": {
            master: { total: 80, sss: 80, sssPlus: 75, aj: 60, ajc: 5, fc: 15, lost: 8000 },
            ultima: { total: 0, sss: 0, sssPlus: 0, aj: 0, ajc: 0, fc: 0, lost: 0 }
        },
        "12": {
            master: { total: 150, sss: 145, sssPlus: 140, aj: 100, ajc: 20, fc: 30, lost: 35000 },
            ultima: { total: 0, sss: 0, sssPlus: 0, aj: 0, ajc: 0, fc: 0, lost: 0 }
        },
        "12+": {
            master: { total: 200, sss: 190, sssPlus: 180, aj: 120, ajc: 15, fc: 40, lost: 65000 },
            ultima: { total: 0, sss: 0, sssPlus: 0, aj: 0, ajc: 0, fc: 0, lost: 0 }
        },
        "13": {
            master: { total: 300, sss: 280, sssPlus: 260, aj: 150, ajc: 10, fc: 50, lost: 120000 },
            ultima: { total: 5, sss: 2, sssPlus: 1, aj: 0, ajc: 0, fc: 2, lost: 8500 }
        },
        "13+": {
            master: { total: 340, sss: 295, sssPlus: 245, aj: 95, ajc: 5, fc: 55, lost: 250000 },
            ultima: { total: 10, sss: 5, sssPlus: 5, aj: 5, ajc: 0, fc: 5, lost: 15000 }
        },
        "14": {
            // 高難易度は失点が一気に増える想定
            master: { total: 280, sss: 190, sssPlus: 140, aj: 45, ajc: 1, fc: 28, lost: 450000 },
            ultima: { total: 20, sss: 10, sssPlus: 10, aj: 5, ajc: 0, fc: 2, lost: 32000 }
        },
        "14+": {
            master: { total: 90, sss: 45, sssPlus: 28, aj: 8, ajc: 0, fc: 8, lost: 280000 },
            ultima: { total: 10, sss: 5, sssPlus: 2, aj: 2, ajc: 0, fc: 2, lost: 45000 }
        },
        "15": {
            master: { total: 25, sss: 8, sssPlus: 4, aj: 1, ajc: 0, fc: 2, lost: 150000 },
            ultima: { total: 5, sss: 2, sssPlus: 1, aj: 0, ajc: 0, fc: 0, lost: 25000 }
        },
        "15+": {
            master: { total: 8, sss: 2, sssPlus: 1, aj: 0, ajc: 0, fc: 0, lost: 80000 },
            ultima: { total: 2, sss: 0, sssPlus: 0, aj: 0, ajc: 0, fc: 0, lost: 15000 }
        }
    },

    // 個別のスコアデータ
    scores: [
        { title: "Test Song A", difficulty: "MASTER", levelStr: "14+", score: 1009500, isPlayed: true },
        { title: "Test Song B", difficulty: "ULTIMA", levelStr: "15", score: 1005000, isPlayed: true },
        { title: "Test Song C", difficulty: "MASTER", levelStr: "13+", score: 1010000, isPlayed: true },
        { title: "Test Song D", difficulty: "MASTER", levelStr: "12", score: 1007500, isPlayed: true },
        { title: "Test Song E", difficulty: "ULTIMA", levelStr: "14", score: 0, isPlayed: false },
        { title: "Test Song E", difficulty: "ULTIMA", levelStr: "14", score: 1010000, isPlayed: true },
    ],
    totals: {
        master: { 
            total: 1573, sss: 1490, sssPlus: 1390, aj: 1195, ajc: 100, fc: 298, lost: 1500000 
            // ※ lostプロパティがある場合はここにも追加
        },
        ultima: { 
            total: 27, sss: 10, sssPlus: 10, aj: 5, ajc: 0, fc: 2, lost: 50000 
        }
    }
};