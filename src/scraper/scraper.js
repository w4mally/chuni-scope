(async () => {
    console.log("データ取得を開始します...");

    const fetchAndParse = async (url, options = {}) => {
        try {
            const res = await fetch(url, options);
            const html = await res.text();
            return new DOMParser().parseFromString(html, "text/html");
        } catch (e) { return null; }
    };

    // 1. プレイヤー情報とトークン取得
    const homeDoc = await fetchAndParse("https://new.chunithm-net.com/chuni-mobile/html/mobile/home/");
    const searchDoc = await fetchAndParse("https://new.chunithm-net.com/chuni-mobile/html/mobile/record/musicLevel/");
    const token = searchDoc?.querySelector('input[name="token"]')?.value;
    if (!token) return console.error("トークン取得失敗しました。ログインし直してください。");

    // レーティング画像のブロックを取得
    const ratingBlock = homeDoc.querySelector(".player_rating_num_block");
    let ratingStr = "";

    if (ratingBlock) {
        const children = Array.from(ratingBlock.children);

        children.forEach(child => {
        if (child.tagName === "IMG") {
            const src = child.src;
            const match = src.match(/rating_.*_(\d+)\.png/);
            if (match) {
                const num = parseInt(match[1], 10);
                ratingStr += (num % 10).toString(); 
            }
            } else if (child.classList.contains("player_rating_comma")) {
                ratingStr += ".";
            }
        });
    }

    const player = {
        name: homeDoc.querySelector(".player_name_in")?.innerText.trim(),
        reborn: parseInt(homeDoc.querySelector(".player_reborn")?.innerText || "0"),
        level: parseInt(homeDoc.querySelector(".player_lv")?.innerText || "0"),
        rating: ratingStr || "0.00",
        overpower: homeDoc.querySelector(".player_overpower_text")?.innerText.trim(),
    };

    // 2. スコアデータとレベル別統計の取得
    const levelLabels = ["10", "10+", "11", "11+", "12", "12+", "13", "13+", "14", "14+", "15", "15+"];
    const allScores = [];
    const levelStats = {};

    for (let i = 0; i < levelLabels.length; i++) {
        const label = levelLabels[i];
        console.log(`Lv ${label} を集計中...`);
        
        const res = await fetch("https://new.chunithm-net.com/chuni-mobile/html/mobile/record/musicLevel/sendSearch", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ level: i + 12, token })
        });
        const doc = new DOMParser().parseFromString(await res.text(), "text/html");
        const blocks = doc.querySelectorAll(".musiclist_box");

        // このレベルの統計を初期化
        levelStats[label] = { total: 0, sss: 0, sssPlus: 0, aj: 0, ajc: 0 , fc: 0};

        blocks.forEach(block => {
            const difficulty = block.classList.contains("bg_master") ? "MASTER" : 
                            block.classList.contains("bg_ultima") ? "ULTIMA" : null;
            if (!difficulty) return;

            levelStats[label].total++; // 全譜面数をカウント

            const scoreRaw = block.querySelector(".play_musicdata_highscore .text_b")?.innerText.replace(/,/g, "");
            const score = scoreRaw ? parseInt(scoreRaw) : 0;
            
            if (score > 0) {
                if (score >= 1009000){
                    levelStats[label].sssPlus++;
                    levelStats[label].sss++;
                } 
                else if (score >= 1007500){
                    levelStats[label].sss++;
                }

                const iconSrcs = Array.from(block.querySelectorAll(".play_musicdata_icon img")).map(img => img.src);
                if (iconSrcs.some(s => s.includes("icon_alljusticecritical"))) levelStats[label].ajc++;
                if (iconSrcs.some(s => s.includes("icon_alljustice"))) levelStats[label].aj++;
                if (iconSrcs.some(s => s.includes("icon_fullchain"))) levelStats[label].fc++;

                allScores.push({ title: "", difficulty, levelStr: label, score, isPlayed: true });
            }
        });
    }

    // 3. 全体統計の算出
    const totalStats = Object.values(levelStats).reduce((acc, curr) => ({
        sss: acc.sss + curr.sss,
        sssPlus: acc.sssPlus + curr.sssPlus,
        aj: acc.aj + curr.aj,
        ajc: acc.ajc + curr.ajc,
        fc: acc.fc + curr.fc,
        total: acc.total + curr.total
    }), { sss: 0, sssPlus: 0, aj: 0, ajc: 0, fc: 0, total: 0 });

    const result = {
        allCharts: totalStats.total,
        player: { ...player, sss: totalStats.sss, sssPlus: totalStats.sssPlus, aj: totalStats.aj, ajc: totalStats.ajc, fc: totalStats.fc},
        levelStats,
        scores: allScores
    };

    const finalJson = JSON.stringify(result);

    try {
        await navigator.clipboard.writeText(finalJson);
        console.log("✅ 成功！クリップボードにJSONがコピーされました。");
        console.log(`合計 ${allScores.length} 件の譜面データを取得しました。`);
    } catch (err) {
        console.error("コピーに失敗しました。以下のJSONをコピーしてください:");
        console.log(finalJson);
    }
})();