import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [validateId, setValidateId] = useState(false);

  const [pw, setPw] = useState("");
  const [validatePw, setValidatePw] = useState(false);

  const [buttonState, setButtonState] = useState(true);

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
        console.log(res);
        navigate(`/signin`);
      })
      .catch((err) => {
        console.log(err);
        alert("회원가입 오류");
      });
  };

  return (
    <div>
      <h2>회원가입</h2>

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
          data-testid="signup-button"
          disabled={buttonState}
          onClick={() => {
            signUp();
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
