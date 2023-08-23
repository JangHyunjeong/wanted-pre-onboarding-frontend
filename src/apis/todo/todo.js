import { instance } from './instance';

export const getTodos = async () => {
  try {
    const res = await instance.get();
    return res;
  } catch (err) {
    console.error();
    throw err;
  }
};

export const getCreateTodo = async data => {
  try {
    const res = await instance.post('', data);
    return res;
  } catch (err) {
    console.error();
    throw err;
  }
};

export const getDeleteTodo = async id => {
  try {
    const res = await instance.delete(`${id}`);
    return res;
  } catch (err) {
    console.error();
    throw err;
  }
};

export const getUpdateTodo = async (id, data) => {
  try {
    const res = await instance.put(`${id}`, data);
    return res;
  } catch (err) {
    console.error();
    throw err;
  }
};
