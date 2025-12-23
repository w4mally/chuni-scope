import { useState } from 'react';
import type { ChuniData } from './types';
// import { useChuniStats } from './hooks/useChuniStats';
import { calculateAverageForLevel, calculatePlayRate } from './utils/stats';
// import { LevelAverageChart } from './components/stats/LevelAverageChart';

function App() {
  // ユーザーが入力したデータを管理する「状態(State)」
  const [data, setData] = useState<ChuniData | null>(null);
  const levels = ["10", "10+", "11", "11+", "12", "12+", "13", "13+", "14", "14+", "15", "15+"];
  // const { levelAverages, totalPlayRate } = useChuniStats(data?.scores || null);

  const handlePaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const json = JSON.parse(e.target.value);
      setData(json);
    } catch (err) {
      console.error("Invalid JSON format");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>CHUNITHM Score Summary</h1>
      
      {/* JSON入力エリア */}
      {!data && (
        <div style={{ marginBottom: '20px' }}>
          <p>スクレイパーで取得したJSONを貼り付けてください：</p>
          <textarea 
            onChange={handlePaste}
            placeholder='{"player": ...}'
            style={{ width: '100%', height: '200px' }}
          />
        </div>
      )}

      {data && (
        <>
          <button onClick={() => setData(null)}>データをリセット</button>
          <section>
            <h2>Player: {data.player.name}</h2>
            <p>プレイヤーレベル: ☆{data.player.reborn} Lv.{data.player.level}</p>
            <p>レーティング: {data.player.rating}</p>
            <p>OVERPOWER: {data.player.overpower}</p>
            <p>楽曲プレイ率: {calculatePlayRate(data.scores).toFixed(2)}%</p>
          </section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
            {levels.map(lv => (
              <div key={lv} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', background: '#f9f9f9' }}>
                <strong style={{ fontSize: '1.2rem' }}>Lv {lv}</strong>
                <p style={{ margin: '5px 0 0' }}>
                  平均: {calculateAverageForLevel(data.scores, lv).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;