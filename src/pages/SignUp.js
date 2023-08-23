import { useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useValidate from "../hooks/useValidate";

// styles
import style from "../styles/SignUp.module.css";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    value: id,
    validateValue: validateId,
    validateStatus: validateIdStatus,
  } = useValidate();

  const {
    value: pw,
    validateValue: validatePw,
    validateStatus: validatePwStatus,
  } = useValidate();

  // 로그인시, /todo로 리다이렉트
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("access_token"));
    if (token !== null) {
      navigate(`/todo`);
    }
  }, [navigate]);

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
      .then(() => {
        alert("회원가입 완료");
        navigate(`/signin`);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("동일한 이메일이 이미 존재합니다.");
        } else {
          alert(`회원가입 오류 : ${err.message}`);
        }
      });
  };

  return (
    <div>
      <h2 className={style.title}>회원가입</h2>

      <form>
        <label htmlFor="signUpId" className={style.label}>
          이메일
        </label>
        <input
          type="text"
          data-testid="email-input"
          value={id}
          onInput={(e) => validateId([e.target.value, /@/])}
          className={style.input}
          id="signUpId"
        />
        {validateIdStatus === true ? (
          <p className={`${style.desc} ${style.color_blue}`}>
            사용가능한 이메일입니다.
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
          onInput={(e) => validatePw([e.target.value, /.{8,}$/])}
          autoComplete="false"
          id="signUpPw"
          className={style.input}
        />
        {validatePwStatus === true ? (
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
          disabled={!(validateIdStatus && validatePwStatus)}
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
