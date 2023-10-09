import { useState, useEffect } from "react";

function useLoginTimestamp() {
  const [isTimestampValid, setIsTimestampValid] = useState(false);

  useEffect(() => {
    const timestamp = localStorage.getItem("loginTimestamp");
    if (timestamp) {
      const now = Date.now();
      const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
      const isWithinOneWeek = now - timestamp < oneWeekInMilliseconds;
      setIsTimestampValid(isWithinOneWeek);
    }
  }, []);

  const updateTimestamp = () => {
    const now = Date.now();
    localStorage.setItem("loginTimestamp", now);
  };

  return [isTimestampValid, updateTimestamp];
}

export default useLoginTimestamp;
