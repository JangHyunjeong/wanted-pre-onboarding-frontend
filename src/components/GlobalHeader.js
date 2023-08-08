import { Link } from "react-router-dom";

// css
import style from "../styles/GlobalHeader.module.css";

function GlobalHeader() {
  return (
    <header className={style.GlobalHeader}>
      <h1 className={style.title}>
        <Link to="/" className={style.link}>
          TO DO LIST
        </Link>
      </h1>
    </header>
  );
}
export default GlobalHeader;
