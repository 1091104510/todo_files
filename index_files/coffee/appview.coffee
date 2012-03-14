class window.AppView extends Backbone.View

  el: $("#todoapp")
  template: _.template($("#stats-template").html())

  events:
      "keypress #new-todo"        : "createOnEnter"
      "keypress #new-due"         : "createOnEnter"
      "keyup #new-todo"           : "showTooltip"
      "keyup #new-due"            : "showTooltip"
      "click .todo-clear a"       : "clearCompleted"
      "click #button"             : "toggle_new"

 initialize: ->
      @input = @$("#new-todo")
      @input1 = @$("#new-due")
      Todos.bind "add", @addOne, @
      Todos.bind "reset", @addAll, @
      Todos.bind "all", @render, @
      Todos.fetch() 

  render: ->
      @$("#todo-stats").html @statsTemplate(
        total: Todos.length
        done: Todos.done().length
        remaining: Todos.remaining().length
      )
      @

  addOne: (todo) ->
      view = new TodoView(model: todo)
      $("#todo-list").append view.render().el

  addAll: ->
      Todos.each @addOne

  createOnEnter: (e) ->
      text = $("#new-todo").val()
      due = $("#new-due").val()
      if e.keyCode is 13
        Todos.create
          text: text
          due: due

        $("#new-todo").val ""
        $("#new-due").val ""
        noty text: "New task is created! "

  clearCompleted: ->
      _.each Todos.done(), (todo) ->
        todo.destroy()

      false

  showTooltip: (e) ->
      tooltip = @$(".ui-tooltip-top")
      val = @input.val()
      tooltip.fadeOut()
      clearTimeout @tooltipTimeout  if @tooltipTimeout
      return  if val is "" or val is @input.attr("placeholder")
      show = ->
        tooltip.show().fadeIn()

      @tooltipTimeout = _.delay(show, 1000)

  toggle_new: (e) ->
      $("#create-todo").slideToggle()

   window.App = new AppView



