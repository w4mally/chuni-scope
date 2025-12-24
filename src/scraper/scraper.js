(async () => {
	if (window.location.hostname !== 'new.chunithm-net.com') {
        alert('このブックマークレットは CHUNITHM-NET (new.chunithm-net.com) で実行してください。');
        return;
    }

	const overlay = document.createElement('div');
	overlay.style = `
    position: fixed; top: 30px; right: 30px; z-index: 10000;
    background: rgba(15, 23, 42, 0.95); color: white; 
    padding: 36px; border-radius: 28px; font-family: 'Inter', sans-serif;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); 
    width: 380px;
    backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.15);
    display: flex; flex-direction: column; gap: 24px;
    transition: all 0.4s ease;
`;

	overlay.innerHTML = `
    <div style="display: flex; align-items: center; gap: 18px;">
        <div style="width: 28px; height: 28px; border: 4px solid #3b82f6; border-top-color: transparent; border-radius: 50%; animation: s 1s linear infinite;"></div>
        <strong style="font-size: 22px; font-weight: 900; color: #3b82f6; letter-spacing: 0.5px; text-transform: uppercase;">CHUNI SCOPE</strong>
    </div>
    
    <div style="border-top: 1px solid rgba(255,255,255,0.1); pt: 20px; padding-top: 20px;">
        <p style="font-size: 13px; color: #94a3b8; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; tracking-wider: 0.05em;">Current Status</p>
        <div id="st" style="font-size: 18px; font-weight: 800; color: #ffffff; line-height: 1.4;">Initializing...</div>
    </div>
    
    <style>@keyframes s{to{transform:rotate(360deg)}}</style>
`;
	document.body.appendChild(overlay);

	const setStatus = (msg) => {
		document.getElementById('st').innerText = msg;
	};

	const fetchAndParse = async (url, options = {}) => {
		try {
			const res = await fetch(url, options);
			const html = await res.text();
			return new DOMParser().parseFromString(html, 'text/html');
		} catch (e) {
			return null;
		}
	};

const finalize = async (data) => {
    const stElement = document.getElementById('st');
    stElement.innerText = "データ送信中";

    const baseUrl = "https://chuni-scope.vercel.app";

    try {
        const response = await fetch(`${baseUrl}/api/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("API Error: " + response.status);

        const result = await response.json();
        const id = result.id;

        window.location.href = `${baseUrl}/?id=${id}`;

    } catch (e) {
        console.error(e);
        stElement.innerHTML = `<div style="color:red; background:#fee; padding:10px;">Error: ${e.message}</div>`;
    }
};

	setStatus('トークンを生成中...');
	const homeDoc = await fetchAndParse(
		'https://new.chunithm-net.com/chuni-mobile/html/mobile/home/'
	);
	const searchDoc = await fetchAndParse(
		'https://new.chunithm-net.com/chuni-mobile/html/mobile/record/musicLevel/'
	);
	const token = searchDoc?.querySelector('input[name="token"]')?.value;
	if (!token) return console.error('トークン取得失敗しました。ログインし直してください。');

	setStatus('プレイヤー情報を取得中...');
	const ratingBlock = homeDoc.querySelector('.player_rating_num_block');
	let ratingStr = '';

	if (ratingBlock) {
		const children = Array.from(ratingBlock.children);

		children.forEach((child) => {
			if (child.tagName === 'IMG') {
				const src = child.src;
				const match = src.match(/rating_.*_(\d+)\.png/);
				if (match) {
					const num = parseInt(match[1], 10);
					ratingStr += (num % 10).toString();
				}
			} else if (child.classList.contains('player_rating_comma')) {
				ratingStr += '.';
			}
		});
	}

	const player = {
		name: homeDoc.querySelector('.player_name_in')?.innerText.trim(),
		reborn: parseInt(homeDoc.querySelector('.player_reborn')?.innerText || '0'),
		level: parseInt(homeDoc.querySelector('.player_lv')?.innerText || '0'),
		rating: ratingStr || '0.00',
		overpower: homeDoc.querySelector('.player_overpower_text')?.innerText.trim(),
	};

	const levelLabels = [
		'10',
		'10+',
		'11',
		'11+',
		'12',
		'12+',
		'13',
		'13+',
		'14',
		'14+',
		'15',
		'15+',
	];
	const allScores = [];
	const levelStats = {};

	for (let i = 0; i < levelLabels.length; i++) {
		const label = levelLabels[i];
		setStatus(`楽曲データを取得中... (Lv ${label})`);

		const res = await fetch(
			'https://new.chunithm-net.com/chuni-mobile/html/mobile/record/musicLevel/sendSearch',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({ level: i + 12, token }),
			}
		);
		const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
		const blocks = doc.querySelectorAll('.musiclist_box');

		levelStats[label] = { total: 0, sss: 0, sssPlus: 0, aj: 0, ajc: 0, fc: 0 };

		blocks.forEach((block) => {
			const difficulty = block.classList.contains('bg_master')
				? 'MASTER'
				: block.classList.contains('bg_ultima')
					? 'ULTIMA'
					: null;
			if (!difficulty) return;

			levelStats[label].total++;

			const scoreRaw = block
				.querySelector('.play_musicdata_highscore .text_b')
				?.innerText.replace(/,/g, '');
			const score = scoreRaw ? parseInt(scoreRaw) : 0;

			if (score > 0) {
				if (score >= 1009000) {
					levelStats[label].sssPlus++;
					levelStats[label].sss++;
				} else if (score >= 1007500) {
					levelStats[label].sss++;
				}

				const iconSrcs = Array.from(block.querySelectorAll('.play_musicdata_icon img')).map(
					(img) => img.src
				);
				if (iconSrcs.some((s) => s.includes('icon_alljusticecritical'))) levelStats[label].ajc++;
				if (iconSrcs.some((s) => s.includes('icon_alljustice'))) levelStats[label].aj++;
				if (iconSrcs.some((s) => s.includes('icon_fullchain'))) levelStats[label].fc++;

				allScores.push({ title: '', difficulty, levelStr: label, score, isPlayed: true });
			}
		});
	}

	// 3. 全体統計の算出
	const totalStats = Object.values(levelStats).reduce(
		(acc, curr) => ({
			sss: acc.sss + curr.sss,
			sssPlus: acc.sssPlus + curr.sssPlus,
			aj: acc.aj + curr.aj,
			ajc: acc.ajc + curr.ajc,
			fc: acc.fc + curr.fc,
			total: acc.total + curr.total,
		}),
		{ sss: 0, sssPlus: 0, aj: 0, ajc: 0, fc: 0, total: 0 }
	);

	const result = {
		allCharts: totalStats.total,
		player: {
			...player,
			sss: totalStats.sss,
			sssPlus: totalStats.sssPlus,
			aj: totalStats.aj,
			ajc: totalStats.ajc,
			fc: totalStats.fc,
		},
		levelStats,
		scores: allScores,
	};

	finalize(result);
})();
