import convertDate from "../utils/convertDate";
import createTask from "../components/task";

const TodoList = (function () {
  let id = 0;
  let todos = [
    {
      id,
      title: "Morning walk",
      description: "Morning walk",
      createdAt: "2011-08-19T13:45:00",
      dueDate: "2011-08-19T13:45:00",
      deletedAt: "",
    },
  ];

  let loading = true;
  const init = () => {
    const btnAddTaskEl = document.getElementById("btn-add-task");
    const btnDelTaskEls = document.querySelectorAll(".task__delete");

    btnAddTaskEl.addEventListener("click", () => {
      onChange("add");
    });
    btnDelTaskEls.forEach((element) =>
      element.addEventListener("click", () => {
        onChange("delete");
      })
    );
  };
  // Add task
  const addTask = () => {
    id++;
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    let task = {
      id,
      title,
      description,
      from,
      to,
    };
    todos.push(task);
    // reset input
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    document
      .getElementById("task-list")
      .insertAdjacentHTML(
        "beforeend",
        createTask(id, title, description, convertDate(from), convertDate(to))
      );

    // turn off modal
    $("#myModal").modal("toggle");
    //add event delete task
    document.querySelectorAll(".task__delete").forEach((element) =>
      element.addEventListener("click", () => {
        deleteTask(element.getAttribute("data-id"));
      })
    );
    //add event complete task
    document.querySelectorAll(".task__status").forEach((element) =>
      element.addEventListener("click", () => {
        completeTask(element.getAttribute("data-id"));
      })
    );
  };

  //Delete task
  const deleteTask = (id) => {
    document.querySelectorAll(".task").forEach(function (e) {
      if (e.getAttribute("data-id") === id) {
        e.remove();
      }
    });
  };
  //Complete task
  const completeTask = (id) => {
    console.log(id);
    document.querySelectorAll(".task").forEach(function (e) {
      if (e.getAttribute("data-id") === id) {
        e.classList.toggle("complete");
      }
    });
  };

  const onMount = () => {
    console.log(todos);
  };
  const onChange = (type, result) => {
    // Action Types
    const ADD = "add",
      DELETE = "delete";
    switch (type) {
      case ADD:
        addTask();
        break;

      default:
        break;
    }
  };
  return {
    onMount,
    onChange,
    init,
  };
})();
export default TodoList;
