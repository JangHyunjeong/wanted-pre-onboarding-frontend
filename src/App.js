import "./App.css";
import { Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Link to="/">메인</Link>
      <Link to="/signup">회원가입</Link>
      <Link to="/signin">로그인</Link>
      <Link to="/todo">투두</Link>
      <Routes>
        <Route path="/" element={<div>메인임</div>}></Route>
        <Route path="/signup" element={<div>회원가입</div>}></Route>
        <Route path="/signin" element={<div>로그인</div>}></Route>
        <Route path="/todo" element={<div>투두</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;
