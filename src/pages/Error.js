import { Link } from "react-router-dom";
import style from "../styles/Error.module.css";

const Error = () => {
  return (
    <div className={style.container}>
      <h2 className={style.title}>404 Not Found</h2>
      <p className={style.msg}>
        방문하시려는 페이지 주소가 잘못입력되었거나 <br />
        페이지 주소가 삭제되어 요청하신 페이지를 찾을 수 엇습니다.
        <br /> <br />
        입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </p>

      <Link to="/" className={style.button}>
        메인으로 가기
      </Link>
    </div>
  );
};

export default Error;
