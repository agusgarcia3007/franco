import { useState, useEffect } from "react";
import Form from "./pages/Form";
import ThankYou from "./pages/ThankYou";
import useVote from "./hooks/useVote";
import Introduction from "./pages/Introduction";

const App = () => {
  const [step, setStep] = useState(0);
  const { canVote } = useVote();

  useEffect(() => {
    if (!canVote) {
      setStep(2);
    }
  }, [canVote]);

  const views = [
    { component: <Introduction setStep={setStep} /> },
    { component: <Form setStep={setStep} /> },
    { component: <ThankYou /> },
  ];

  return (
    <div style={{ overflow: "hidden" }}>
      {views[step]?.component || "404 - Page not found"}
    </div>
  );
};

export default App;
