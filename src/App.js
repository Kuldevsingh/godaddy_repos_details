import { Routes, Route } from "react-router-dom";
import Repos from "./pages/Repos";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Repos />} />
      </Routes>
    </>
  );
}

export default App;
