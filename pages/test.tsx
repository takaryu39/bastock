import { useState } from "react";

const Test = () => {
  const [currentPage, setCurrentPage] = useState("top");
  return (
    <div>
      {currentPage === "top" && (
        <div>
          <h1>Top page</h1>
          <ul>
            <li>
              <button onClick={() => setCurrentPage("sub1")}>Sub page 1</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage("sub2")}>Sub page 2</button>
            </li>
          </ul>
        </div>
      )}

      {currentPage === "sub1" && (
        <div>
          <h2>Sub page 1</h2>
          <p>
            <button onClick={() => setCurrentPage("top")}>Back</button>
          </p>
        </div>
      )}

      {currentPage === "sub2" && (
        <div>
          <h2>Sub page 2</h2>
          <p>
            <button onClick={() => setCurrentPage("top")}>Back</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Test;
