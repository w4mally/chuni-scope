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
    box-shadow: 0 25px 50px -12px rgba(46, 37, 37, 0.5); 
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

	const autoClose = (delay = 4000) => {
		setTimeout(() => {
			if (overlay && overlay.parentNode) {
				overlay.style.opacity = '0';
				overlay.style.transform = 'translateY(-20px)';
				setTimeout(() => {
					if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
				}, 500);
			}
		}, delay);
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
		stElement.innerText = 'データ送信中...';
		``;

		// const baseUrl = 'https://chuni-scope.vercel.app';
		const baseUrl = 'http://localhost:3000/';

		try {
			const response = await fetch(`${baseUrl}/api/save`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (!response.ok) throw new Error('API Error: ' + response.status);

			const result = await response.json();
			const id = result.id;

			window.location.href = `${baseUrl}/?id=${id}`;
		} catch (e) {
			console.error(e);
			stElement.innerHTML = `<div style="color:red; background:#fee; padding:10px;">Error: ${e.message}</div>`;
			autoClose(2000);
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
	if (!token) {
		setStatus('Error: トークンが見つかりません');
		const stElement = document.getElementById('st');
		if (stElement) stElement.style.color = '#ef4444';

		alert('トークンの取得に失敗しました。再ログインしてください。');
		autoClose(500);
		return;
	}

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
		'16',
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

		levelStats[label] = {
			master: { total: 0, sss: 0, sssPlus: 0, aj: 0, ajc: 0, fc: 0, lost: 0 },
			ultima: { total: 0, sss: 0, sssPlus: 0, aj: 0, ajc: 0, fc: 0, lost: 0 },
		};

		blocks.forEach((block) => {
			const difficulty = block.classList.contains('bg_master')
				? 'MASTER'
				: block.classList.contains('bg_ultima')
					? 'ULTIMA'
					: null;
			if (!difficulty) return;

			const targetStats = levelStats[label][difficulty.toLowerCase()];

			targetStats.total++;

			const scoreRaw = block
				.querySelector('.play_musicdata_highscore .text_b')
				?.innerText.replace(/,/g, '');
			const score = scoreRaw ? parseInt(scoreRaw) : 0;

			if (score > 0) {
				targetStats.lost += 1010000 - score;
				if (score >= 1009000) {
					targetStats.sssPlus++;
					targetStats.sss++;
				} else if (score >= 1007500) {
					targetStats.sss++;
				}
				const iconSrcs = Array.from(block.querySelectorAll('.play_musicdata_icon img')).map(
					(img) => img.src
				);
				if (iconSrcs.some((s) => s.includes('icon_alljusticecritical'))) targetStats.ajc++;
				if (iconSrcs.some((s) => s.includes('icon_alljustice'))) targetStats.aj++;
				if (iconSrcs.some((s) => s.includes('icon_fullchain'))) targetStats.fc++;

				allScores.push({ title: '', difficulty, levelStr: label, score, isPlayed: true });
			} else {
				allScores.push({ title: '', difficulty, levelStr: label, score, isPlayed: false });
			}
		});
	}

	const res = await fetch(
		'https://new.chunithm-net.com/chuni-mobile/html/mobile/record/musicGenre/ultima',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({ token }),
		}
	);
	const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
	const blocks = doc.querySelectorAll('.musiclist_box');
	const melodiniqBlock = Array.from(blocks).find((block) =>
		block.textContent?.includes('Melodiniq')
	);
	if (melodiniqBlock) {
		const label = '16';
		const difficulty = 'ULTIMA';

		const targetStats = levelStats[label][difficulty.toLowerCase()];

		targetStats.total++;

		const scoreRaw = melodiniqBlock
			.querySelector('.play_musicdata_highscore .text_b')
			?.innerText.replace(/,/g, '');
		const score = scoreRaw ? parseInt(scoreRaw) : 0;

		if (score > 0) {
			targetStats.lost += 1010000 - score;
			if (score >= 1009000) {
				targetStats.sssPlus++;
				targetStats.sss++;
			} else if (score >= 1007500) {
				targetStats.sss++;
			}
			const iconSrcs = Array.from(block.querySelectorAll('.play_musicdata_icon img')).map(
				(img) => img.src
			);
			if (iconSrcs.some((s) => s.includes('icon_alljusticecritical'))) targetStats.ajc++;
			if (iconSrcs.some((s) => s.includes('icon_alljustice'))) targetStats.aj++;
			if (iconSrcs.some((s) => s.includes('icon_fullchain'))) targetStats.fc++;

			allScores.push({ title: '', difficulty, levelStr: label, score, isPlayed: true });
		} else {
			allScores.push({ title: '', difficulty, levelStr: label, score, isPlayed: false });
		}
	}

	if (allScores.length === 0) {
		setStatus('Error: 楽曲データが取得できませんでした');
		stElement = document.getElementById('st');
		if (stElement) stElement.style.color = '#ef4444';

		alert(
			'楽曲データが見つかりませんでした。\nプレイデータがないか、通信エラーの可能性があります。'
		);
		autoClose(500);
		return;
	}
	const initialStat = { total: 0, sss: 0, sssPlus: 0, aj: 0, ajc: 0, fc: 0, lost: 0 };
	const totals = Object.values(levelStats).reduce(
		(acc, curr) => {
			acc.master.total += curr.master.total;
			acc.master.sss += curr.master.sss;
			acc.master.sssPlus += curr.master.sssPlus;
			acc.master.aj += curr.master.aj;
			acc.master.ajc += curr.master.ajc;
			acc.master.fc += curr.master.fc;
			acc.master.lost += curr.master.lost;

			acc.ultima.total += curr.ultima.total;
			acc.ultima.sss += curr.ultima.sss;
			acc.ultima.sssPlus += curr.ultima.sssPlus;
			acc.ultima.aj += curr.ultima.aj;
			acc.ultima.ajc += curr.ultima.ajc;
			acc.ultima.fc += curr.ultima.fc;
			acc.ultima.lost += curr.ultima.lost;

			return acc;
		},
		{
			master: { ...initialStat },
			ultima: { ...initialStat },
		}
	);

	const grandTotal = {
		sss: totals.master.sss + totals.ultima.sss,
		sssPlus: totals.master.sssPlus + totals.ultima.sssPlus,
		aj: totals.master.aj + totals.ultima.aj,
		ajc: totals.master.ajc + totals.ultima.ajc,
		fc: totals.master.fc + totals.ultima.fc,
		total: totals.master.total + totals.ultima.total,
	};

	const result = {
		allCharts: grandTotal.total,
		player: {
			...player,
			sss: grandTotal.sss,
			sssPlus: grandTotal.sssPlus,
			aj: grandTotal.aj,
			ajc: grandTotal.ajc,
			fc: grandTotal.fc,
		},
		levelStats,
		scores: allScores,
		totals: totals,
	};

	finalize(result);
})();
