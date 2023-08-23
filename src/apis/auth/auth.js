import { instance } from './instance';

// 로그인
export const getSignIn = async data => {
  try {
    const res = await instance.post('/signin', data);
    return res;
  } catch (err) {
    throw err;
  }
};

// 회원가입
export const getSignUp = async data => {
  try {
    const res = await instance.post('/signup', data);
    return res;
  } catch (err) {
    throw err;
  }
};
