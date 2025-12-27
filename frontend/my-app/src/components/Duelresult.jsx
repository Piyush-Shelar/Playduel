import React,{useEffect,useState} from "react"
import "./All.css"


function Duelresult()
{
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
  if (!socket) return;

  socket.on("quiz-end", ({ leaderboard }) => {
    setLeaderboard(leaderboard);
  });

  return () => socket.off("quiz-end");
}, [socket]);

return(
    <div>
        {leaderboard && (
  <div className="leaderboard">
    <h2>🏆 Leaderboard</h2>
    {leaderboard.map((p, i) => (
      <div key={i} className="leaderboard-row">
        Player {i + 1}: <span>{p.score}</span>
      </div>
    ))}
  </div>
)}

    </div>


)
}
export default Duelresult;