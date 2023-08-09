import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// styles
import style from "../styles/ToDo.module.css";

function ToDo() {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState("");
  const token = JSON.parse(localStorage.getItem("access_token"));
  const [todoList, setTodoList] = useState([]);
  const [isEditable, setIsEditable] = useState("");
  const [editModeInput, setEditModeInput] = useState("");

  // token이 없는 경우, signin 으로 리다이렉트
  useEffect(() => {
    if (token === null) {
      navigate(`/signin`);
    } else {
      getTodos();
    }
  }, []);

  // 리스트 가져오기
  const getTodos = () => {
    axios({
      method: "get",
      url: "https://www.pre-onboarding-selection-task.shop/todos",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setTodoList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 생성하기
  const createTodo = () => {
    const data = { todo: newTodo };

    axios({
      method: "post",
      url: "https://www.pre-onboarding-selection-task.shop/todos",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        getTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 삭제하기
  const deleteTodo = (id) => {
    axios({
      method: "DELETE",
      url: `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        getTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 수정하기
  const updateTodo = (isCompleted, id) => {
    const data = { todo: editModeInput, isCompleted: isCompleted };

    axios({
      method: "PUT",
      url: `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        getTodos();
        setIsEditable("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 체크하기
  const updateCompleted = (isCompleted, id) => {
    const target = [...todoList].find((item) => {
      return item.id === id;
    });
    const data = { todo: target.todo, isCompleted: isCompleted };

    axios({
      method: "PUT",
      url: `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        getTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 수정할 input 가져오기
  const getEditModeInput = (value) => {
    setEditModeInput(value);
  };

  // 수정모드로 전환
  const changeMode = (id) => {
    const target = [...todoList].find((item) => {
      return item.id === id;
    });

    setIsEditable(id);
    setEditModeInput(target.todo);
  };

  return (
    <div>
      <h2 className={style.title}>투두</h2>

      <div className={style.todo_write}>
        <input
          data-testid="new-todo-input"
          onInput={(e) => {
            setNewTodo(e.target.value);
          }}
          value={newTodo}
        />
        <button data-testid="new-todo-add-button" onClick={() => createTodo()}>
          추가
        </button>
      </div>

      <ul className={style.todo_list}>
        {todoList.map((item) => {
          return (
            <li className={style.todo_item} key={item.id}>
              {isEditable !== item.id ? (
                <div className={style.todo_normal}>
                  <label>
                    <div className={style.check_wrap}>
                      <input
                        type="checkbox"
                        className="visually-hidden"
                        onChange={(e) => {
                          updateCompleted(e.target.checked, item.id);
                        }}
                      />
                      {item.isCompleted === false ? (
                        <i
                          className={`xi-check-circle-o ${style.check_off}`}
                        ></i>
                      ) : (
                        <i className={`xi-check-circle ${style.check_on}`}></i>
                      )}
                    </div>

                    <span>{item.todo}</span>
                  </label>
                  <div className={style.button_wrap}>
                    <button
                      data-testid="modify-button"
                      className={style.bg_white}
                      onClick={() => {
                        changeMode(item.id);
                      }}
                    >
                      수정
                    </button>
                    <button
                      data-testid="delete-button"
                      className={style.bg_black}
                      onClick={() => {
                        deleteTodo(item.id);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ) : (
                <div className={style.todo_edit}>
                  <input
                    data-testid="modify-input"
                    onInput={(e) => {
                      getEditModeInput(e.target.value);
                    }}
                    value={editModeInput}
                  />
                  <div className={style.button_wrap}>
                    <button
                      data-testid="submit-button"
                      className={style.bg_blue}
                      onClick={() => {
                        updateTodo(item.isCompleted, item.id);
                      }}
                    >
                      제출
                    </button>
                    <button
                      data-testid="cancel-button"
                      className={style.bg_black}
                      onClick={() => {
                        setIsEditable("");
                      }}
                    >
                      취소
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ToDo;
