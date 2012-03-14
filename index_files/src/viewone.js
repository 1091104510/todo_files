(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.TodoViewOne = (function(_super) {

    __extends(TodoViewOne, _super);

    function TodoViewOne() {
      TodoViewOne.__super__.constructor.apply(this, arguments);
    }

    TodoViewOne.prototype.tagName = "li";

    TodoViewOne.prototype.template = _.template($("#item-template").html());

    TodoViewOne.prototype.events = function() {
      return {
        "click .check": "toggleDone",
        "dblclick div.todo-text": "edit",
        "click span.todo-destroy": "clear",
        "keypress .todo-input": "updateOnEnter",
        "click .todo-back": "goback"
      };
    };

    TodoViewOne.prototype.initialize = function() {
      this.model.bind("change", this.render, this);
      return this.model.bind("destroy", this.remove, this);
    };

    TodoViewOne.prototype.render = function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.setText();
      return this;
    };

    TodoViewOne.prototype.setText = function() {
      var due, text;
      text = this.model.get("text");
      due = this.model.get("due");
      this.$(".todo-text").text(text);
      this.input = this.$(".todo-input");
      this.$(".todo-date").text(due);
      return this.input.bind("blur", _.bind(this.close, this)).val(text);
    };

    TodoViewOne.prototype.toggleDone = function() {
      return this.model.toggle();
    };

    TodoViewOne.prototype.edit = function() {
      this.filter(function(todo) {});
      return todo.get("done");
    };

    TodoViewOne.prototype.remaining = function() {
      return this.without.apply(this, this.done());
    };

    TodoViewOne.prototype.nextOrder = function() {
      if (!this.length) return 1;
      return this.last().get("order") + 1;
    };

    TodoViewOne.prototype.comparator = function(todo) {
      $(this.el).addClass("editing");
      return this.input.focus();
    };

    TodoViewOne.prototype.close = function() {
      this.model.save({
        text: this.input.val()
      });
      return $(this.el).removeClass("editing");
    };

    TodoViewOne.prototype.updateOnEnter = function(e) {
      if (e.keyCode === 13) return this.close();
    };

    TodoViewOne.prototype.remove = function() {
      return $(this.el).remove();
    };

    TodoViewOne.prototype.clear = function() {
      return this.model.destroy();
    };

    TodoViewOne.prototype.goback = function() {
      console.log("bllassa");
      return $("#todo-show").html("");
    };

    return TodoViewOne;

  })(Backbone.View);

  window.TodoViewOne = (function(_super) {

    __extends(TodoViewOne, _super);

    function TodoViewOne() {
      TodoViewOne.__super__.constructor.apply(this, arguments);
    }

    TodoViewOne.prototype.tagName = "li";

    TodoViewOne.prototype.template = _.template($("#item-template").html());

    TodoViewOne.prototype.events = function() {
      return {
        "click .check": "toggleDone",
        "dblclick div.todo-text": "edit",
        "click span.todo-destroy": "clear",
        "keypress .todo-input": "updateOnEnter",
        "click .todo-back": "goback"
      };
    };

    TodoViewOne.prototype.initialize = function() {
      this.model.bind("change", this.render, this);
      return this.model.bind("destroy", this.remove, this);
    };

    TodoViewOne.prototype.render = function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.setText();
      return this;
    };

    TodoViewOne.prototype.setText = function() {
      var due, text;
      text = this.model.get("text");
      due = this.model.get("due");
      this.$(".todo-text").text(text);
      this.input = this.$(".todo-input");
      this.$(".todo-date").text(due);
      return this.input.bind("blur", _.bind(this.close, this)).val(text);
    };

    TodoViewOne.prototype.toggleDone = function() {
      return this.model.toggle();
    };

    TodoViewOne.prototype.edit = function() {
      $(this.el).addClass("editing");
      return this.input.focus();
    };

    TodoViewOne.prototype.close = function() {
      this.model.save({
        text: this.input.val()
      });
      return $(this.el).removeClass("editing");
    };

    TodoViewOne.prototype.updateOnEnter = function(e) {
      if (e.keyCode === 13) return this.close();
    };

    TodoViewOne.prototype.remove = function() {
      return $(this.el).remove();
    };

    TodoViewOne.prototype.clear = function() {
      return this.model.destroy();
    };

    TodoViewOne.prototype.goback = function() {
      console.log("bllassa");
      return $("#todo-show").html("");
    };

    return TodoViewOne;

  })(Backbone.View);

}).call(this);
