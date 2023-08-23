import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodos, getCreateTodo, getDeleteTodo, getUpdateTodo } from '../apis/todo/todo';

// styles
import style from '../styles/ToDo.module.css';

const ToDo = () => {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState('');
  const token = JSON.parse(localStorage.getItem('access_token'));
  const [todoList, setTodoList] = useState([]);
  const [isEditable, setIsEditable] = useState('');
  const [editModeInput, setEditModeInput] = useState('');

  // token이 없는 경우, signin 으로 리다이렉트
  useEffect(() => {
    if (token === null) {
      navigate(`/signin`);
    } else {
      loadTodoList();
    }
    // eslint-disable-next-line
  }, []);

  // 리스트 가져오기
  const loadTodoList = () => {
    getTodos()
      .then(res => {
        setTodoList(res.data);
      })
      .catch(err => {
        alert(`오류 : ${err.message}`);
      });
  };

  // 생성하기
  const createTodo = () => {
    getCreateTodo({ todo: newTodo })
      .then(() => {
        setNewTodo('');
        loadTodoList();
      })
      .catch(err => {
        if (err.response.status === 400) {
          alert('할일을 입력해주세요');
        } else {
          alert(`생성 오류 : ${err.message}`);
        }
      });
  };

  // 삭제하기
  const deleteTodo = id => {
    getDeleteTodo(id)
      .then(() => {
        loadTodoList();
      })
      .catch(err => {
        alert(`삭제 오류 : ${err.message}`);
      });
  };

  // 수정하기
  const updateTodo = (id, isCompleted, value) => {
    getUpdateTodo(id, { todo: value, isCompleted: isCompleted })
      .then(() => {
        loadTodoList();
        setIsEditable('');
      })
      .catch(err => {
        alert(`수정 오류 : ${err.message}`);
      });
  };

  // 수정할 input 가져오기
  const getEditModeInput = value => {
    setEditModeInput(value);
  };

  // 수정모드로 전환
  const changeMode = id => {
    const target = [...todoList].find(item => {
      return item.id === id;
    });

    setIsEditable(id);
    setEditModeInput(target.todo);
  };

  return (
    <div>
      <h2 className={style.title}>할일 리스트</h2>

      <div className={style.todo_write}>
        <input
          data-testid="new-todo-input"
          onInput={e => {
            setNewTodo(e.target.value);
          }}
          value={newTodo}
        />
        <button data-testid="new-todo-add-button" onClick={() => createTodo()}>
          추가
        </button>
      </div>

      <ul className={style.todo_list}>
        {todoList.length === 0 ? (
          <li className={style.todo_empty}>등록된 할일이 없습니다.</li>
        ) : (
          todoList.map(item => {
            return (
              <li className={style.todo_item} key={item.id}>
                {isEditable !== item.id ? (
                  <div className={style.todo_normal}>
                    <label>
                      <div className={style.check_wrap}>
                        <input
                          type="checkbox"
                          className="visually-hidden"
                          onChange={e => {
                            updateTodo(item.id, e.target.checked, item.todo);
                          }}
                        />
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
                      onInput={e => {
                        getEditModeInput(e.target.value);
                      }}
                      value={editModeInput}
                    />
                    <div className={style.button_wrap}>
                      <button
                        data-testid="submit-button"
                        className={style.bg_blue}
                        onClick={() => {
                          updateTodo(item.id, item.isCompleted, editModeInput);
                        }}
                      >
                        제출
                      </button>
                      <button
                        data-testid="cancel-button"
                        className={style.bg_black}
                        onClick={() => {
                          setIsEditable('');
                        }}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default ToDo;
