class window.TodoViewOne extends Backbone.View
  tagName: "li"
  template: _.template($("#item-template").html())

  events: ->
    "click .check"              : "toggleDone"
    "dblclick div.todo-text"    : "edit"
    "click span.todo-destroy"   : "clear"
    "keypress .todo-input"      : "updateOnEnter"
    "click .todo-back"          : "goback"

  initialize: ->
    @model.bind "change", @render, this
    @model.bind "destroy", @remove, this

  render: ->
    $(@el).html @template(@model.toJSON())
    @setText()
    this

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
    @filter (todo) ->
    todo.get "done"

  remaining: ->
      @without.apply this, @done()

  nextOrder: ->
      return 1  unless @length
      @last().get("order") + 1

  comparator: (todo) ->
    $(@el).addClass "editing"
    @input.focus()

  close: ->
    @model.save text: @input.val()
    $(@el).removeClass "editing"

  updateOnEnter: (e) ->
    @close()  if e.keyCode is 13

  remove: ->
    $(@el).remove()

  clear: ->
    @model.destroy()

  goback: ->
    console.log "bllassa"
    $("#todo-show").html ""

class window.TodoViewOne extends Backbone.View
  tagName: "li"
  template: _.template($("#item-template").html())
  events: ->
    "click .check"              : "toggleDone"
    "dblclick div.todo-text"    : "edit"
    "click span.todo-destroy"   : "clear"
    "keypress .todo-input"      : "updateOnEnter"
    "click .todo-back"          : "goback"

  initialize: ->
    @model.bind "change", @render, this
    @model.bind "destroy", @remove, this

  render: ->
    $(@el).html @template(@model.toJSON())
    @setText()
    this

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
    @close()  if e.keyCode is 13

  remove: ->
    $(@el).remove()

  clear: ->
    @model.destroy()

  goback: ->
    console.log "bllassa"
    $("#todo-show").html ""
 



