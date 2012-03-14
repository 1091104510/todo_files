(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.TodoView = (function(_super) {

    __extends(TodoView, _super);

    function TodoView() {
      TodoView.__super__.constructor.apply(this, arguments);
    }

    TodoView.prototype.tagName = "li";

    TodoView.prototype.template = _.template($("#item-template").html());

    TodoView.prototype.events = function() {
      return {
        "click .check": "toggleDone",
        "dblclick div.todo-text": "edit",
        "click span.todo-destroy": "clear",
        "keypress .todo-input": "updateOnEnter",
        "click .todo-open": "opentodo"
      };
    };

    TodoView.prototype.initialize = function() {
      this.model.bind("change", this.render, this);
      return this.model.bind("destroy", this.remove, this);
    };

    TodoView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.setText();
      return this;
    };

    TodoView.prototype.setText = function() {
      var due, text;
      text = this.model.get("text");
      due = this.model.get("due");
      this.$(".todo-text").text(text);
      this.input = this.$(".todo-input");
      this.$(".todo-date").text(due);
      return this.input.bind("blur", _.bind(this.close, this)).val(text);
    };

    TodoView.prototype.toggleDone = function() {
      return this.model.toggle();
    };

    TodoView.prototype.edit = function() {
      $(this.el).addClass("editing");
      return this.input.focus();
    };

    TodoView.prototype.close = function() {
      this.model.save({
        text: this.input.val()
      });
      return $(this.el).removeClass("editing");
    };

    TodoView.prototype.updateOnEnter = function(e) {
      window.AppView = (function(_super2) {

        __extends(AppView, _super2);

        function AppView() {
          AppView.__super__.constructor.apply(this, arguments);
        }

        return AppView;

      })(Backbone.View);
      if (e.keyCode === 13) return this.close();
    };

    TodoView.prototype.remove = function() {
      return $(this.el).remove();
    };

    TodoView.prototype.clear = function() {
      return this.model.destroy();
    };

    TodoView.prototype.opentodo = function() {
      var view;
      console.log("Yay, triggered.");
      view = new TodoViewOne({
        model: this.model
      });
      return $("#todo-show").html(view.render().el);
    };

    return TodoView;

  })(Backbone.View);

}).call(this);
