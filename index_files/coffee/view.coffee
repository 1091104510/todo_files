class window.TodoView extends Backbone.View
  tagName: "li"
  template: _.template($("#item-template").html())

  events: ->
    "click .check"              : "toggleDone"
    "dblclick div.todo-text"    : "edit"
    "click span.todo-destroy"   : "clear"
    "keypress .todo-input"      : "updateOnEnter"
    "click .todo-open"          : "opentodo"

  initialize: ->
      @model.bind "change", @render, this
      @model.bind "destroy", @remove, this

  render: ->
      $(@el).html @template(@model.toJSON())
      @setText()
      @

  setText: ->
      text = @model.get("text")
      due = @model.get("due")
      @$(".todo-text").text text
      @input = @$(".todo-input")
      @$(".todo-date").text due
      @input.bind("blur", _.bind(@close, this)).val text

  toggleDone: ->
      @model.toggle()

  edit: ->
      $(@el).addClass "editing"
      @input.focus()

  close: ->
      @model.save text: @input.val()
      $(@el).removeClass "editing"

  updateOnEnter: (e) -> 
      class window.AppView extends Backbone.View
      @close()  if e.keyCode is 13

  remove: ->
      $(@el).remove()

  clear: ->
      @model.destroy()

  opentodo: ->
      console.log "Yay, triggered."
      view = new TodoViewOne(model: @model)
      $("#todo-show").html view.render().el




