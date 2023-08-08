import { Link } from "react-router-dom";
import "../styles/Main.module.css";

function Main() {
  return (
    <div className="container">
      <h2 className="visually-hidden">메인</h2>
      <p>로그인 혹은 회원가입을 해주세요</p>

      <div>
        <Link to="/signup">회원가입</Link>
        <Link to="/signin">로그인</Link>
      </div>
    </div>
  );
}

export default Main;
