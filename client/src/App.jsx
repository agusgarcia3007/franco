import { useState, useEffect } from "react";
import Form from "./pages/Form";
import ThankYou from "./pages/ThankYou";
import useVote from "./hooks/useVote";

const App = () => {
  const [step, setStep] = useState(0);
  const { canVote } = useVote();

  useEffect(() => {
    if (!canVote) {
      setStep(1);
    }
  }, [canVote]);

  const views = [
    { component: <Form setStep={setStep} /> },
    { component: <ThankYou /> },
  ];

  return <>{views[step]?.component || "404 - Page not found"}</>;
};

export default App;
