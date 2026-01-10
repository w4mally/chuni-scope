export const DUMMY_DATA = {
    player: {
        name: "CHUNI_TESTER",
        reborn: 1,
        level: 99,
        rating: "17.25",
        overpower: "135000.00",
        // 全体の統計
        sss: 1500,
        sssPlus: 1400,
        aj: 1200,
        ajc: 100,
        fc: 300
    },
    
    allCharts: 1600,

    // 難易度別の統計 (Lv10〜15+)
    levelStats: {
        "10": { total: 10, sss: 10, sssPlus: 10, aj: 10, ajc: 5, fc: 0 },
        "10+": { total: 20, sss: 20, sssPlus: 20, aj: 15, ajc: 2, fc: 5 },
        "11": { total: 50, sss: 50, sssPlus: 48, aj: 40, ajc: 10, fc: 10 },
        "11+": { total: 80, sss: 80, sssPlus: 75, aj: 60, ajc: 5, fc: 15 },
        "12": { total: 150, sss: 145, sssPlus: 140, aj: 100, ajc: 20, fc: 30 },
        "12+": { total: 200, sss: 190, sssPlus: 180, aj: 120, ajc: 15, fc: 40 },
        "13": { total: 300, sss: 280, sssPlus: 260, aj: 150, ajc: 10, fc: 50 },
        "13+": { total: 350, sss: 300, sssPlus: 250, aj: 100, ajc: 5, fc: 60 },
        "14": { total: 300, sss: 200, sssPlus: 150, aj: 50, ajc: 1, fc: 30 },
        "14+": { total: 100, sss: 50, sssPlus: 30, aj: 10, ajc: 0, fc: 10 },
        "15": { total: 30, sss: 10, sssPlus: 5, aj: 1, ajc: 0, fc: 2 },
        "15+": { total: 10, sss: 2, sssPlus: 1, aj: 0, ajc: 0, fc: 0 }
    },

    scores: [
        { title: "Test Song A", difficulty: "MASTER", levelStr: "14+", score: 1009500, isPlayed: true },
        { title: "Test Song B", difficulty: "ULTIMA", levelStr: "15", score: 1005000, isPlayed: true },
        { title: "Test Song C", difficulty: "MASTER", levelStr: "13+", score: 1010000, isPlayed: true },
        { title: "Test Song D", difficulty: "MASTER", levelStr: "12", score: 1007500, isPlayed: false },
    ]
};