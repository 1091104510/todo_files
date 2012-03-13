class window.Todo extends Backbone.Model
  defaults: ->
      done: false
      order: Todos.nextOrder()

  toggle: ->
      @save done: not @get("done")

class window.TodoList extends Backbone.Collection
  model: Todo
  localStorage: new Store("todos")

  done: ->
    @filter (todo) ->
    todo.get "done"

  remaining: ->
      @without.apply this, @done()

  nextOrder: ->
      return 1  unless @length
      @last().get("order") + 1

  comparator: (todo) ->
      todo.get "order"

  clearCompleted: ->
      _.each @done(), (todo) ->
        todo.destroy()

      false

  initialize: ->
    @bind "change", (item) ->
        console.log "trigg'd."
        item.destroy()  if item.get("done") is true

    @bind "add", (item) ->
        console.log "trigg'..d."
        console.log "item with duedate is added"  if item.get("due") isnt null



