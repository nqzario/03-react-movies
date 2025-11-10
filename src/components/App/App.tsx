import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
import { useState } from "react";
import type { Votes, VoteType } from "../../types/votes";

function App() {
  const [votes, setVotes] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });

  function handleVote(type: VoteType) {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  }

  function resetVotes() {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  }
  const totalVotes = votes.bad + votes.good + votes.neutral;
  const positiveRate =
    votes.bad + votes.good + votes.neutral
      ? Math.round((votes.good / totalVotes) * 100)
      : 0;
  return (
    <div className={css.app}>
      <CafeInfo />

      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />

      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
export default App;
