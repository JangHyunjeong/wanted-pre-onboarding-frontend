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

  // token이 없는 경우, signin 으로 리다이렉트
  useEffect(() => {
    if (token === null) {
      navigate(`/signin`);
    } else {
      getTodos();
    }
  }, []);

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

  const createTodo = () => {
    let data = { todo: newTodo };

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
              <div className={style.todo_normal}>
                <label>
                  <div className={style.check_wrap}>
                    <input type="checkbox" className="visually-hidden" />
                    {item.isCompleted === false ? (
                      <i className={`xi-check-circle-o ${style.check_off}`}></i>
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
                  >
                    수정
                  </button>
                  <button
                    data-testid="delete-button"
                    className={style.bg_black}
                  >
                    삭제
                  </button>
                </div>
              </div>

              <div className={style.todo_edit}>
                <input data-testid="modify-input" />
                <div className={style.button_wrap}>
                  <button data-testid="submit-button" className={style.bg_blue}>
                    제출
                  </button>
                  <button
                    data-testid="cancel-button"
                    className={style.bg_black}
                  >
                    취소
                  </button>
                </div>
              </div>
            </li>
          );
        })}

        {/* <li className={style.todo_item}>
          <div className={style.todo_normal}>
            <label>
              <div className={style.check_wrap}>
                <input type="checkbox" className="visually-hidden" />

                <i className={`xi-check-circle-o ${style.check_off}`}></i>
                <i className={`xi-check-circle ${style.check_on}`}></i>
              </div>

              <span>
                TODO 1 TODO 1TODO 1TODO 1TODO 1TODO 1TODO 1TODO 1TODO 1TODO
                1TODO 1TODO 1TODO 1TODO 1TODO 1TODO 1TODO 1TODO 1TODO 1TODO
                1TODO 1TODO 1TODO 1TODO 1TODO 1TODO 1TODO 1TODO 1TODO 1TODO
                1TODO 1TODO 1TODO 1TODO 1TODO 1TODO 1TODO 1TODO 1
              </span>
            </label>
            <div className={style.button_wrap}>
              <button data-testid="modify-button" className={style.bg_white}>
                수정
              </button>
              <button data-testid="delete-button" className={style.bg_black}>
                삭제
              </button>
            </div>
          </div>

          <div className={style.todo_edit}>
            <input data-testid="modify-input" />
            <div className={style.button_wrap}>
              <button data-testid="submit-button" className={style.bg_blue}>
                제출
              </button>
              <button data-testid="cancel-button" className={style.bg_black}>
                취소
              </button>
            </div>
          </div>
        </li> */}
      </ul>
    </div>
  );
}

export default ToDo;
