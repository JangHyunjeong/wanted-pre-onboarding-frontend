import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// styles
import style from "../styles/SignIn.module.css";

const SignIn = () => {
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
      setButtonState(true);
    }
  };

  const checkPw = (value) => {
    setPw(value);
    const reg = /.{8,}$/;
    if (reg.test(value) === true) {
      setValidatePw(true);
      if (validateId === true) {
        setButtonState(false);
      }
    } else {
      setValidatePw(false);
      setButtonState(true);
    }
  };

  const signIn = () => {
    let data = {
      email: id,
      password: pw,
    };

    axios({
      method: "post",
      url: "https://www.pre-onboarding-selection-task.shop/auth/signin",
      headers: {
        "Content-Type": `application/json`,
      },
      data: data,
    })
      .then((res) => {
        localStorage.setItem(
          "access_token",
          JSON.stringify(res.data.access_token)
        );
        navigate(`/todo`);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("아이디 혹은 비밀번호를 확인해주세요.");
        } else {
          alert(`로그인 오류 : ${err.message}`);
        }
      });
  };

  return (
    <div>
      <h2 className={style.title}>로그인</h2>

      <form>
        <label htmlFor="joinId" className={style.label}>
          아이디
        </label>
        <input
          type="text"
          data-testid="email-input"
          value={id}
          onInput={(e) => checkId(e.target.value)}
          className={style.input}
          id="joinId"
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

        <label htmlFor="joinPw" className={style.label}>
          비밀번호
        </label>
        <input
          type="password"
          data-testid="password-input"
          value={pw}
          onInput={(e) => checkPw(e.target.value)}
          autoComplete="false"
          id="joinPw"
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
          data-testid="signin-button"
          disabled={buttonState}
          onClick={() => {
            signIn();
          }}
          className={style.button}
        >
          로그인
        </button>

        <p className={style.tail_comment}>
          계정이 없으시다구요? <Link to="/signup">회원가입 바로가기</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
