import style from "../styles/ToDo.module.css";

function ToDo() {
  return (
    <div>
      <h2 className={style.title}>투두</h2>

      <div className={style.todo_write}>
        <input data-testid="new-todo-input" />
        <button data-testid="new-todo-add-button">추가</button>
      </div>

      <ul className={style.todo_list}>
        <li className={style.todo_item}>
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
        </li>
      </ul>
    </div>
  );
}

export default ToDo;
