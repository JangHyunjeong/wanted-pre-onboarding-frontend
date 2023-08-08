import { Link } from "react-router-dom";

function Main() {
  return (
    <div>
      <h2>메인</h2>
      <Link to="/signup">회원가입</Link>
      <Link to="/signin">로그인</Link>
    </div>
  );
}

export default Main;
