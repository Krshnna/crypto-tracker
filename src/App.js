import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from "./components/Header";
import CoinPage from "./Pages/CoinPage";
import HomePage from "./Pages/HomePage";
function App() {
  return (
    <BrowserRouter>
    <div className="classes">
    <Header/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/coin/:id" element={<CoinPage/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
