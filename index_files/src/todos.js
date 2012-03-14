(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Todo = (function(_super) {

    __extends(Todo, _super);

    function Todo() {
      Todo.__super__.constructor.apply(this, arguments);
    }

    Todo.prototype.defaults = function() {
      return {
        done: false,
        order: Todos.nextOrder()
      };
    };

    Todo.prototype.toggle = function() {
      return this.save({
        done: !this.get("done")
      });
    };

    return Todo;

  })(Backbone.Model);

  window.TodoList = (function(_super) {

    __extends(TodoList, _super);

    function TodoList() {
      TodoList.__super__.constructor.apply(this, arguments);
    }

    TodoList.prototype.model = Todo;

    TodoList.prototype.localStorage = new Store("todos");

    TodoList.prototype.done = function() {
      this.filter(function(todo) {});
      return todo.get("done");
    };

    TodoList.prototype.remaining = function() {
      return this.without.apply(this, this.done());
    };

    TodoList.prototype.nextOrder = function() {
      if (!this.length) return 1;
      return this.last().get("order") + 1;
    };

    TodoList.prototype.comparator = function(todo) {
      return todo.get("order");
    };

    TodoList.prototype.clearCompleted = function() {
      _.each(this.done(), function(todo) {
        return todo.destroy();
      });
      return false;
    };

    TodoList.prototype.initialize = function() {
      this.bind("change", function(item) {
        console.log("trigg'd.");
        if (item.get("done") === true) return item.destroy();
      });
      return this.bind("add", function(item) {
        console.log("trigg'..d.");
        if (item.get("due") !== null) {
          return console.log("item with duedate is added");
        }
      });
    };

    window.Todos = new TodoList;

    return TodoList;

  })(Backbone.Collection);

}).call(this);
