import convertDate from "../utils/convertDate";
import createTask from "../components/task";

const TodoList = (function () {
  let id = null;
  let todos = [];

  let loading = true;
  const init = () => {
    let data = localStorage.getItem("todos");
    if (data) {
      todos = JSON.parse(data);
      todos.map((task) => {
        createTask(task.id, task.title, task.description, task.from, task.to);
      });
      let taskList = document.getElementById("task-list");
      taskList.innerHTML = "";

      let newTodos = "";

      todos.forEach((element) => {
        newTodos += createTask(
          element.id,
          element.title,
          element.description,
          convertDate(element.from),
          convertDate(element.to)
        );
      });

      taskList.insertAdjacentHTML("beforeend", newTodos);
    }
    const btnAddTaskEl = document.getElementById("btn-add-task");
    const btnDelTaskEls = document.querySelectorAll(".task__delete");
    const btnStatusTaskEls = document.querySelectorAll(".task__status");

    btnAddTaskEl.addEventListener("click", () => {
      onChange("add");
    });

    btnDelTaskEls.forEach((element) =>
      element.addEventListener("click", () => {
        deleteTask(element.getAttribute("data-id"));
      })
    );

    btnStatusTaskEls.forEach((element) =>
      element.addEventListener("click", () => {
        completeTask(element.getAttribute("data-id"));
      })
    );
  };
  // Add task
  const addTask = () => {
    id = Date.now();
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

    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    let newTodos = "";

    todos.forEach((element) => {
      newTodos += createTask(
        element.id,
        element.title,
        element.description,
        convertDate(element.from),
        convertDate(element.to)
      );
    });

    taskList.insertAdjacentHTML("beforeend", newTodos);

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
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  //Delete task
  const deleteTask = (id) => {
    document.querySelectorAll(".task").forEach(function (e) {
      if (e.getAttribute("data-id") === id) {
        e.remove();
        todos = todos.filter((task) => task.id !== parseInt(id));
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    });
  };
  //Complete task
  const completeTask = (id) => {
    document.querySelectorAll(".task").forEach(function (e) {
      if (e.getAttribute("data-id") == id) {
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
