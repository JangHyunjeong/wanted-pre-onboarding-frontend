import { Link } from "react-router-dom";
import style from "../styles/Main.module.css";

function Main() {
  const token = JSON.parse(localStorage.getItem("access_token"));

  return (
    <div className={style.main_wrap}>
      <h2 className="visually-hidden">메인</h2>
      {token === null ? (
        <div>
          <p>
            서비스 사용을 위해서는 로그인을 해주세요.
            <br /> 계정이 없다면, 회원가입을 해주세요.
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
      ) : (
        <div>
          <p>
            로그인 하셨었네요?
            <br /> 아래 버튼을 클릭해 얼른 할일을 적으러 가셔요
          </p>

          <div className={style.button_wrap}>
            <Link to="/todo" className={style.bg_blue}>
              할일 적으러 가기
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
