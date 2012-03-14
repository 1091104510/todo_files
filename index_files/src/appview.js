(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.el = $("#todoapp");

    AppView.prototype.template = _.template($("#stats-template").html());

    AppView.prototype.events = {
      "keypress #new-todo": "createOnEnter",
      "keypress #new-due": "createOnEnter",
      "keyup #new-todo": "showTooltip",
      "keyup #new-due": "showTooltip",
      "click .todo-clear a": "clearCompleted",
      "click #button": "toggle_new"
    };

    return AppView;

  })(Backbone.View);

  ({
    initialize: function() {
      this.input = this.$("#new-todo");
      this.input1 = this.$("#new-due");
      Todos.bind("add", this.addOne, this);
      Todos.bind("reset", this.addAll, this);
      Todos.bind("all", this.render, this);
      return Todos.fetch();
    },
    render: function() {
      this.$("#todo-stats").html(this.statsTemplate({
        total: Todos.length,
        done: Todos.done().length,
        remaining: Todos.remaining().length
      }));
      return this;
    },
    addOne: function(todo) {
      var view;
      view = new TodoView({
        model: todo
      });
      return $("#todo-list").append(view.render().el);
    },
    addAll: function() {
      return Todos.each(this.addOne);
    },
    createOnEnter: function(e) {
      var due, text;
      text = $("#new-todo").val();
      due = $("#new-due").val();
      if (e.keyCode === 13) {
        Todos.create({
          text: text,
          due: due
        });
        $("#new-todo").val("");
        $("#new-due").val("");
        return noty({
          text: "New task is created! "
        });
      }
    },
    clearCompleted: function() {
      _.each(Todos.done(), function(todo) {
        return todo.destroy();
      });
      return false;
    },
    showTooltip: function(e) {
      var show, tooltip, val;
      tooltip = this.$(".ui-tooltip-top");
      val = this.input.val();
      tooltip.fadeOut();
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
      if (val === "" || val === this.input.attr("placeholder")) return;
      show = function() {
        return tooltip.show().fadeIn();
      };
      return this.tooltipTimeout = _.delay(show, 1000);
    },
    toggle_new: function(e) {
      return $("#create-todo").slideToggle();
    }
  });

  window.App = new AppView;

}).call(this);
