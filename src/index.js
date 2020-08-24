import todosStore from "./store/index";

const btnAddTaskEl = document.getElementById("btn-add-task");
btnAddTaskEl.addEventListener("click", function () {
  let id = Date.now();
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;

  todosStore.dispatch({
    type: "ADD_TODO",
    payload: {
      id,
      title,
      completed: false,
      description,
      from,
      to,
    },
  });
});
