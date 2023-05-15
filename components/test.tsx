import { useEffect, useState } from "react";

export const test = () => {
  console.log("レンダリング");
  const [test, setTest] = useState("");
  return (
    <div className="button" onClick={() => setTest("test")}>
      {test}
    </div>
  );
};
