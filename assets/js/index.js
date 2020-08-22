const TodoList = (function () {
  let id = 0;
  let btnAddTask;
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
  init = () => {
    document.getElementById("btn-add-task").addEventListener("click", () => {
      this.onChange("add");
    });
    document.querySelectorAll(".task__delete").forEach((element) =>
      element.addEventListener("click", () => {
        this.onChange("delete");
      })
    );
  };
  // Add task
  addTask = () => {
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

    document.getElementById("task-list").insertAdjacentHTML(
      "beforeend",
      `
      <div class="task" data-id="${id}">
        <input class="task__status" type="checkbox" data-id="${id}" />
          <div class="task__content">
              <label class="task__title" id="js-task-title">${title}</label>
              <p class="task__des" id="js-task-des">${description}</p>
          </div>
          <div class="task__date">
              <p class="task__from" id="js-task-from">${this.convertDate(
                from
              )}</p>
              <p class="task__to" id="js-task-to">${this.convertDate(to)}</p>
          </div>
          <button class="task__delete" data-id="${id}"></button>
        </div>
        `
    );
    $("#myModal").modal("toggle");
    //add event delete task
    document.querySelectorAll(".task__delete").forEach((element) =>
      element.addEventListener("click", () => {
        this.deleteTask(element.getAttribute("data-id"));
      })
    );
    //add event complete task
    document.querySelectorAll(".task__status").forEach((element) =>
      element.addEventListener("click", () => {
        this.completeTask(element.getAttribute("data-id"));
      })
    );
  };

  //Delete task
  deleteTask = (id) => {
    document.querySelectorAll(".task").forEach(function (e) {
      if (e.getAttribute("data-id") === id) {
        e.remove();
      }
    });
  };
  //Complete task
  completeTask = (id) => {
    document.querySelectorAll(".task").forEach(function (e) {
      if (e.getAttribute("data-id") === id) {
        e.classList.toggle("complete");
      }
    });
  };

  convertDate = (date) => {
    var newDate = new Date(date);

    const day = newDate.getUTCDate(),
      month = newDate.getUTCMonth(),
      year = newDate.getUTCFullYear(),
      hour = newDate.getUTCHours(),
      minute = newDate.getUTCMinutes();

    return `${day}/${month}/${year} ${hour}:${minute}`;
  };

  onMount = () => {
    console.log(todos);
  };
  onChange = (type, result) => {
    // Action Types
    const ADD = "add",
      DELETE = "delete";
    switch (type) {
      case ADD:
        addTask();
        break;
        // case DELETE:
        //   deleteTask();
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
TodoList.init();
