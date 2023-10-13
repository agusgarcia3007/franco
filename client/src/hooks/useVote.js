import { useState } from "react";

const WAIT_TIME_TO_VOTE_AGAIN = 6 * 60 * 60 * 1000;

const useVoting = () => {
  const [canVote, setCanVote] = useState(true);

  useState(() => {
    const lastVoted = localStorage.getItem("lastVoted");

    if (lastVoted && Date.now() - lastVoted < WAIT_TIME_TO_VOTE_AGAIN) {
      setCanVote(false);
    }
  }, []);

  const registerVote = () => {
    localStorage.setItem("lastVoted", Date.now());
    setCanVote(false);
  };

  return { canVote, registerVote };
};

export default useVoting;
