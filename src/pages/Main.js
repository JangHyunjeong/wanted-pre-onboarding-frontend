import { Link } from "react-router-dom";
import style from "../styles/Main.module.css";

function Main() {
  return (
    <div className={style.main_wrap}>
      <h2 className="visually-hidden">메인</h2>
      <p>
        서비스 사용을 위해서는 로그인을 해주세요.
        <br /> 계정이 없다면, 회원가입을 해주세요.{" "}
      </p>

      <div className={style.button_wrap}>
        <Link to="/signup" className={style.bg_white}>
          회원가입
        </Link>
        <Link to="/signin" className={style.bg_black}>
          로그인
        </Link>
      </div>
    </div>
  );
}

export default Main;
