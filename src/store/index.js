import convertDate from "../utils/convertDate";
import createTask from "../components/task";
import todos from "./reducers/todo";

let createStore = (reducer) => {
  let state;
  let taskList = document.getElementById("task-list");

  let getState = () => state;

  let dispatch = (action) => {
    state = reducer(state, action);
    console.log(state);
    updateHtml();
  };
  let updateHtml = () => {
    // console.log(state);
    taskList.innerHTML = "";

    let htmlString = "";

    state.forEach((element) => {
      htmlString += createTask(
        element.id,
        element.title,
        element.description,
        convertDate(element.from),
        convertDate(element.to),
        element.completed
      );
    });

    taskList.insertAdjacentHTML("beforeend", htmlString);

    const btnDelTaskEls = document.querySelectorAll(".task__delete");
    btnDelTaskEls.forEach((element) =>
      element.addEventListener("click", () => {
        dispatch({
          type: "REMOVE_TODO",
          payload: {
            id: parseInt(element.getAttribute("data-id")),
          },
        });
      })
    );

    const btnStatusTaskEls = document.querySelectorAll(".task__status");
    btnStatusTaskEls.forEach((element) =>
      element.addEventListener("click", () => {
        dispatch({
          type: "TOGGLE_TODO",
          payload: {
            id: parseInt(element.getAttribute("data-id")),
          },
        });
      })
    );
  };
  dispatch({});
  return { getState, dispatch };
};

export default createStore(todos);
