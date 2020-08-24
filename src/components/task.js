function createTask(id, title, description, from, to, complete) {
  return `
  <div class="task ${complete ? 'complete' : ''}" data-id="${id}">
  <input class="task__status" type="checkbox" data-id="${id}" />
    <div class="task__content">
        <label class="task__title" id="js-task-title">${title}</label>
        <p class="task__des" id="js-task-des">${description}</p>
    </div>
    <div class="task__date">
        <p class="task__from" id="js-task-from">${from}</p>
        <p class="task__to" id="js-task-to">${to}</p>
    </div>
    <button class="task__delete" data-id="${id}"></button>
  </div>
  `;
}

export default createTask;
