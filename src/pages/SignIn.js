import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        console.log(err);
        alert("로그인 오류");
      });
  };

  return (
    <div>
      <h2>로그인</h2>

      <form>
        <input
          type="text"
          data-testid="email-input"
          value={id}
          onInput={(e) => checkId(e.target.value)}
        />
        {validateId === true ? (
          <p>사용가능한 아이디입니다.</p>
        ) : (
          <p>이메일에는 @가 들어가야합니다.</p>
        )}

        <input
          type="password"
          data-testid="password-input"
          value={pw}
          onInput={(e) => checkPw(e.target.value)}
          autoComplete="false"
        />
        {validatePw === true ? (
          <p>사용가능한 비밀번호입니다.</p>
        ) : (
          <p>비밀번호는 8자 이상으로 입력해주세요.</p>
        )}

        <button
          type="button"
          data-testid="signin-button"
          disabled={buttonState}
          onClick={() => {
            signIn();
          }}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default SignIn;
