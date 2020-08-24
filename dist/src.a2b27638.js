// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/utils/convertDate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var convertDate = function convertDate(date) {
  var newDate = new Date(date);
  var day = newDate.getUTCDate(),
      month = newDate.getUTCMonth(),
      year = newDate.getUTCFullYear(),
      hour = newDate.getUTCHours(),
      minute = newDate.getUTCMinutes();
  return "".concat(day, "/").concat(month, "/").concat(year, " ").concat(hour, ":").concat(minute);
};

var _default = convertDate;
exports.default = _default;
},{}],"src/components/task.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function createTask(id, title, description, from, to) {
  return "\n  <div class=\"task\" data-id=\"".concat(id, "\">\n  <input class=\"task__status\" type=\"checkbox\" data-id=\"").concat(id, "\" />\n    <div class=\"task__content\">\n        <label class=\"task__title\" id=\"js-task-title\">").concat(title, "</label>\n        <p class=\"task__des\" id=\"js-task-des\">").concat(description, "</p>\n    </div>\n    <div class=\"task__date\">\n        <p class=\"task__from\" id=\"js-task-from\">").concat(from, "</p>\n        <p class=\"task__to\" id=\"js-task-to\">").concat(to, "</p>\n    </div>\n    <button class=\"task__delete\" data-id=\"").concat(id, "\"></button>\n  </div>\n  ");
}

var _default = createTask;
exports.default = _default;
},{}],"src/containers/TodoList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _convertDate = _interopRequireDefault(require("../utils/convertDate"));

var _task = _interopRequireDefault(require("../components/task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TodoList = function () {
  var id = null;
  var todos = [];
  var loading = true;

  var init = function init() {
    var data = localStorage.getItem("todos");

    if (data) {
      todos = JSON.parse(data);
      todos.map(function (task) {
        (0, _task.default)(task.id, task.title, task.description, task.from, task.to);
      });
      var taskList = document.getElementById("task-list");
      taskList.innerHTML = "";
      var newTodos = "";
      todos.forEach(function (element) {
        newTodos += (0, _task.default)(element.id, element.title, element.description, (0, _convertDate.default)(element.from), (0, _convertDate.default)(element.to));
      });
      taskList.insertAdjacentHTML("beforeend", newTodos);
    }

    var btnAddTaskEl = document.getElementById("btn-add-task");
    var btnDelTaskEls = document.querySelectorAll(".task__delete");
    var btnStatusTaskEls = document.querySelectorAll(".task__status");
    btnAddTaskEl.addEventListener("click", function () {
      onChange("add");
    });
    btnDelTaskEls.forEach(function (element) {
      return element.addEventListener("click", function () {
        deleteTask(element.getAttribute("data-id"));
      });
    });
    btnStatusTaskEls.forEach(function (element) {
      return element.addEventListener("click", function () {
        completeTask(element.getAttribute("data-id"));
      });
    });
  }; // Add task


  var addTask = function addTask() {
    id = Date.now();
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var task = {
      id: id,
      title: title,
      description: description,
      from: from,
      to: to
    };
    todos.push(task); // reset input

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    var taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    var newTodos = "";
    todos.forEach(function (element) {
      newTodos += (0, _task.default)(element.id, element.title, element.description, (0, _convertDate.default)(element.from), (0, _convertDate.default)(element.to));
    });
    taskList.insertAdjacentHTML("beforeend", newTodos); // turn off modal

    $("#myModal").modal("toggle"); //add event delete task

    document.querySelectorAll(".task__delete").forEach(function (element) {
      return element.addEventListener("click", function () {
        deleteTask(element.getAttribute("data-id"));
      });
    }); //add event complete task

    document.querySelectorAll(".task__status").forEach(function (element) {
      return element.addEventListener("click", function () {
        completeTask(element.getAttribute("data-id"));
      });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }; //Delete task


  var deleteTask = function deleteTask(id) {
    document.querySelectorAll(".task").forEach(function (e) {
      if (e.getAttribute("data-id") === id) {
        e.remove();
        todos = todos.filter(function (task) {
          return task.id !== parseInt(id);
        });
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    });
  }; //Complete task


  var completeTask = function completeTask(id) {
    document.querySelectorAll(".task").forEach(function (e) {
      if (e.getAttribute("data-id") == id) {
        e.classList.toggle("complete");
      }
    });
  };

  var onMount = function onMount() {
    console.log(todos);
  };

  var onChange = function onChange(type, result) {
    // Action Types
    var ADD = "add",
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
    onMount: onMount,
    onChange: onChange,
    init: init
  };
}();

var _default = TodoList;
exports.default = _default;
},{"../utils/convertDate":"src/utils/convertDate.js","../components/task":"src/components/task.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _TodoList = _interopRequireDefault(require("./containers/TodoList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_TodoList.default.init();
},{"./containers/TodoList":"src/containers/TodoList.js"}],"C:/Users/tung1/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "3511" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/tung1/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map