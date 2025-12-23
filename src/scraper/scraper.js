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
  // ブロック内の子要素（画像とカンマ）をすべて取得してループ
    const children = Array.from(ratingBlock.children);

    children.forEach(child => {
    if (child.tagName === "IMG") {
      // src属性（例: "...rating_kiwami_01.png"）から数字部分を抽出
        const src = child.src;
        const match = src.match(/rating_.*_(\d+)\.png/);
        if (match) {
        // "01" なら 1、"10" なら 0 というマッピングが多い
            const num = parseInt(match[1], 10);
            ratingStr += (num % 10).toString(); 
        }
    } else if (child.classList.contains("player_rating_comma")) {
      // カンマの要素が来たらドットを追加
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

// 3. レベル別巡回 (Lv10 = index 12 から Lv15+ = index 23 まで)
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

    if (blocks.length === 0) {
      console.warn(`Lv ${label} のデータが見つかりませんでした。インデックスがズレている可能性があります。`);
    }

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
  
  const result = { player, scores: allScores };
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