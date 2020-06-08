import React, {useEffect, useState} from "react";
import App from "./App";

export default () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timeoutID = setTimeout(() => setCounter(counter + 1), 1000);

    return () => clearTimeout(timeoutID);
  });

  return <App count={counter} />
};
