import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// styles
import style from "../styles/SignUp.module.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [validateId, setValidateId] = useState(false);

  const [pw, setPw] = useState("");
  const [validatePw, setValidatePw] = useState(false);

  const [buttonState, setButtonState] = useState(true);

  // 로그인시, /todo로 리다이렉트
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("access_token"));
    if (token !== null) {
      navigate(`/todo`);
    }
  }, [navigate]);

  const checkId = (value) => {
    setId(value);

    const reg = /@/;
    if (reg.test(value) === true) {
      setValidateId(true);
      if (validatePw === true) {
        setButtonState(false);
      }
    } else {
      setValidateId(false);
    }
  };

  const checkPw = (value) => {
    setPw(value);
    const reg = /[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9#?!@$ %^&*-]{8,}$/;
    if (reg.test(value) === true) {
      setValidatePw(true);
      if (validateId === true) {
        setButtonState(false);
      }
    } else {
      setValidatePw(false);
    }
  };

  const signUp = () => {
    let data = {
      email: id,
      password: pw,
    };

    axios({
      method: "post",
      url: "https://www.pre-onboarding-selection-task.shop/auth/signup",
      headers: {
        "Content-Type": `application/json`,
      },
      data: data,
    })
      .then((res) => {
        navigate(`/signin`);
      })
      .catch((err) => {
        console.log(err);
        alert("회원가입 오류");
      });
  };

  return (
    <div>
      <h2 className={style.title}>회원가입</h2>

      <form>
        <label htmlFor="signUpId" className={style.label}>
          아이디
        </label>
        <input
          type="text"
          data-testid="email-input"
          value={id}
          onInput={(e) => checkId(e.target.value)}
          className={style.input}
          id="signUpId"
        />
        {validateId === true ? (
          <p className={`${style.desc} ${style.color_blue}`}>
            사용가능한 아이디입니다.
          </p>
        ) : (
          <p className={`${style.desc} ${style.color_red}`}>
            이메일에는 @가 들어가야합니다.
          </p>
        )}

        <label htmlFor="signUpPw" className={style.label}>
          비밀번호
        </label>
        <input
          type="password"
          data-testid="password-input"
          value={pw}
          onInput={(e) => checkPw(e.target.value)}
          autoComplete="false"
          id="signUpPw"
          className={style.input}
        />
        {validatePw === true ? (
          <p className={`${style.desc} ${style.color_blue}`}>
            사용가능한 비밀번호입니다.
          </p>
        ) : (
          <p className={`${style.desc} ${style.color_red}`}>
            비밀번호는 8자 이상으로 입력해주세요.
          </p>
        )}

        <button
          type="button"
          data-testid="signup-button"
          disabled={buttonState}
          onClick={() => {
            signUp();
          }}
          className={style.button}
        >
          회원가입
        </button>

        <p className={style.tail_comment}>
          계정이 있으시다구요? <Link to="/signin">로그인 바로가기</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
