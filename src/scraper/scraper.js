(async () => {
    console.log("データ取得を開始します...");

    // 1. 検索ページに移動して最新のトークンを取得する
    const searchPageRes = await fetch("https://new.chunithm-net.com/chuni-mobile/html/mobile/record/musicLevel/search/");
    const searchPageHtml = await searchPageRes.text();
    const searchPageDoc = new DOMParser().parseFromString(searchPageHtml, "text/html");
    const token = searchPageDoc.querySelector('input[name="token"]')?.value;

    if (!token) {
        console.error("トークンが取得できませんでした。ログイン状態を確認してください。");
        return;
    }

    const fetchAndParse = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
            const html = await res.text();
            return new DOMParser().parseFromString(html, "text/html");
        } catch (e) {
            console.error(`Error fetching ${url}:`, e);
            return null;
        }
    };

    // 1. プレイヤー情報の取得
    const homeDoc = await fetchAndParse("https://new.chunithm-net.com/chuni-mobile/html/mobile/home/");
    if (!homeDoc) return;

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
    // プレイヤーデータの取得
    const player = {
        name: homeDoc.querySelector(".player_name_in")?.innerText.trim() || "Unknown",
        reborn : parseInt(homeDoc.querySelector(".player_reborn")?.innerText || "0"),
        level: parseInt(homeDoc.querySelector(".player_lv")?.innerText || "0"),
        rating: ratingStr || "0.00",
        overpower: homeDoc.querySelector(".player_overpower_text")?.innerText.trim() || "Unknown",
    };

    console.log("統計を取得中...");
    const recordDocMas = await fetchAndParse("https://new.chunithm-net.com/chuni-mobile/html/mobile/record/musicGenre/master");
    const scoreListsMas = recordDocMas.querySelectorAll(".score_list");

    let ajCount = 0;
    let fcCount = 0;
    let sssCount = 0;
    let sssPlusCount = 0;
    let ajcCount = 0;

    scoreListsMas.forEach(list => {
        const iconSrc = list.querySelector(".score_list_top img")?.src || "";
        
        const count = parseInt(list.querySelector(".score_num_text")?.innerText.replace(/,/g, "") || "0");

        if (iconSrc.includes("icon_alljustice.png")) ajCount += count;    // AJ
        if (iconSrc.includes("icon_alljusticecritical.png")) ajcCount += count;   // AJC
        if (iconSrc.includes("icon_fullchain.png")) fcCount += count;    // fullchain
        if (iconSrc.includes("icon_rank_12.png")) sssCount += count;   // SSS
        if (iconSrc.includes("icon_rank_13.png")) sssPlusCount += count; // SSS+
    });

    const recordDocUlt = await fetchAndParse("https://new.chunithm-net.com/chuni-mobile/html/mobile/record/musicGenre/ultima");
    const scoreListsUlt = recordDocUlt.querySelectorAll(".score_list");

    scoreListsUlt.forEach(list => {
        const iconSrc = list.querySelector(".score_list_top img")?.src || "";
        
        const count = parseInt(list.querySelector(".score_num_text")?.innerText.replace(/,/g, "") || "0");

        if (iconSrc.includes("icon_alljustice.png")) ajCount += count;    // AJ
        if (iconSrc.includes("icon_alljusticecritical.png")) ajcCount += count;   // AJC
        if (iconSrc.includes("icon_fullchain.png")) fcCount += count;    // fullchain
        if (iconSrc.includes("icon_rank_12.png")) sssCount += count;   // SSS
        if (iconSrc.includes("icon_rank_13.png")) sssPlusCount += count; // SSS+
    });

    const getTotalCharts = (doc) => {
        const text = doc.querySelector(".score_all_text")?.innerText || "0";
        return parseInt(text.replace(/[\/,]/g, ""));
    };

    const totalMas = getTotalCharts(recordDocMas);
    const totalUlt = getTotalCharts(recordDocUlt);

// スコアデータ取得
  const levelLabels = ["10", "10+", "11", "11+", "12", "12+", "13", "13+", "14", "14+", "15", "15+"];
  const allScores = [];

  for (let i = 0; i < levelLabels.length; i++) {
    const levelIndex = i + 12; // Lv10は13番目なのでindex 12
    const label = levelLabels[i];
    console.log(`Lv ${label} を取得中...`);

    const formData = new URLSearchParams();
    formData.append('level', levelIndex);
    formData.append('token', token);

    // POSTで検索リクエストを送信
    const res = await fetch("https://new.chunithm-net.com/chuni-mobile/html/mobile/record/musicLevel/sendSearch", {
      method: "POST",
      body: formData
    });
    
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const blocks = doc.querySelectorAll(".musiclist_box");

    blocks.forEach(block => {
      let difficulty = "";
      if (block.classList.contains("bg_master")) difficulty = "MASTER";
      else if (block.classList.contains("bg_ultima")) difficulty = "ULTIMA";
      
      if (difficulty) {
        const title = block.querySelector(".music_title")?.innerText.trim();
        const score = block.querySelector(".play_musicdata_highscore .text_b")?.innerText.replace(/,/g, "");
        
        allScores.push({
          title,
          difficulty,
          levelStr: label,
          score: score ? parseInt(score) : 0,
          isPlayed: !!score && score !== "0"
        });
      }
    });

    // await sleep(1000); // 連続リクエストを避ける
  }
  
const result = {
    allCharts: totalMas + totalUlt,
    player: {
        ...player, // name, level, rating 等が含まれている想定
        sssCount: sssCount,
        sssPlusCount: sssPlusCount,
        ajCount: ajCount,
        ajcCount: ajcCount,
        fcCount: fcCount,
    },
    scores: allScores // ScoreData[] 型の配列
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