import { useState } from "react";
import Home from "./pages/Home";
import Converter from "./pages/Converter";

function App() {
  const [page, setPage] = useState("home");

  if (page === "converter") {
    return (
      <Converter
        onHome={() => setPage("home")}
      />
    );
  }

  return (
    <Home
      onStart={() => setPage("converter")}
    />
  );
}

export default App;