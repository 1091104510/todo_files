// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Todo Model
  // ----------

  // Our basic **Todo** model has `text`, `order`, and `done` attributes.
  window.Todo = Backbone.Model.extend({

    // Default attributes for a todo item.
    defaults: function() {
      return {
        done:  false,
        order: Todos.nextOrder()
      };
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }

  });

  // Todo Collection
  // ---------------

  // The collection of todos is backed by *localStorage* instead of a remote
  // server.
  window.TodoList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Todo,

    // Save all of the todo items under the `"todos"` namespace.
    localStorage: new Store("todos"),

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(todo){ return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new  items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
      return todo.get('order');
    },
 
   clearCompleted: function() {
      _.each(this.done(), function(todo){ todo.destroy(); });
      return false;

    },

   initialize: function(){
 
   this.bind("change", function(item) {
      console.log("trigg'd.")
      if (item.get("done") == true)
      {
        item.destroy();
      }
   }
  );

  this.bind("add", function(item){
     console.log("trigg'..d.")
    if (item.get("due")!==null)  
  {
    console.log("item with duedate is added");
  }

    });


//  this.bind("remove", function(item) {
//console.log("an item added again...hahahahahhaaa");
 // this.add(item)

 //  });

}



  });

  // Create our global collection of **Todos**.
  window.Todos = new TodoList;


  window.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-todo":  "createOnEnter",
      "keypress #new-due":  "createOnEnter",
      

      "keyup #new-todo":     "showTooltip",
      "keyup #new-due":      "showTooltip",
      "click .todo-clear a": "clearCompleted", 
      "click #button"     : "toggle_new"
      

    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      this.input    = this.$("#new-todo");
      this.input1   = this.$("#new-due");

      Todos.bind('add',   this.addOne, this);
      Todos.bind('reset', this.addAll, this);
      Todos.bind('all',   this.render, this);

      Todos.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      this.$('#todo-stats').html(this.statsTemplate({
        total:      Todos.length,
        done:       Todos.done().length,
        remaining:  Todos.remaining().length
      }));
    return this 
      
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new TodoView({model: todo});
      $("#todo-list").append(view.render().el);
       // console.log("New task is created ");
      //this.setText("New task is created ");
  //    append(this.render().el+"New task is created"); 
//append(itemView.render().el);
 //alert("New task is created!");

//  return "New Task is created"; 

},

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      Todos.each(this.addOne);
   
      
    },

    // If you hit return in the main input field, and there is text to save,
    // create new **Todo** model persisting it to *localStorage*.
    createOnEnter: function(e) {

      var text = $("#new-todo").val()  
      var due = $("#new-due").val()
       //var mes= $("messg").val();
      if (e.keyCode == 13) 
      {
	Todos.create({text: text, due: due})
	$("#new-todo").val("")
	$("#new-due").val("")
 
  // $('#messg').append("New task is created..") 
   //
  noty({text: 'New task is created! '});

     }	
   

    

//      var text = this.input.val();
//      if (!text || e.keyCode != 13) return;
//      Todos.create({text: text});
//      this.input.val('');
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.each(Todos.done(), function(todo){ todo.destroy(); });
      return false;

    },
    

    // Lazily show the tooltip that tells you to press `enter` to save
    // a new todo item, after one second.
    showTooltip: function(e) {
      var tooltip = this.$(".ui-tooltip-top");
      var val = this.input.val();
      tooltip.fadeOut();
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
      if (val == '' || val == this.input.attr('placeholder')) return;
      var show = function(){ tooltip.show().fadeIn(); };
      this.tooltipTimeout = _.delay(show, 1000);
  

     },

    toggle_new: function(e){ 
      $("#create-todo").toggle();
      
    }


  });


  window.TodoViewOne = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .check"              : "toggleDone",
      "dblclick div.todo-text"    : "edit",
      "click span.todo-destroy"   : "clear",
      "keypress .todo-input"      : "updateOnEnter", 
      "click .todo-back"          : "goback"
    
     },

    // The TodoView listens for changes to its model, re-rendering.
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    // Re-render the contents of the todo item.
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.setText();
      return this;
    },

    // To avoid XSS (not that it would be harmful in this particular app),
    // we use `jQuery.text` to set the contents of the todo item.
    setText: function() {
      var text = this.model.get('text');
      var due  = this.model.get('due');
      
      this.$('.todo-text').text(text);
      this.input = this.$('.todo-input');
      
      this.$('.todo-date').text(due);
    
      this.input.bind('blur', _.bind(this.close, this)).val(text);
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function() {
      this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      $(this.el).addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      this.model.save({text: this.input.val()});

      $(this.el).removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove this view from the DOM.
    remove: function() {
      $(this.el).remove();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    },

   goback: function()
   {
      console.log("bllassa");
      
      $("#todo-show").html("");	

    }

  });

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  window.TodoView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .check"              : "toggleDone",
      "dblclick div.todo-text"    : "edit",
      "click span.todo-destroy"   : "clear",
      "keypress .todo-input"      : "updateOnEnter",
      "click .todo-open"          : "opentodo",
      
     },

    // The TodoView listens for changes to its model, re-rendering.
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    // Re-render the contents of the todo item.
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.setText();
      return this;
    },

    // To avoid XSS (not that it would be harmful in this particular app),
    // we use `jQuery.text` to set the contents of the todo item.
    setText: function() {
      var text = this.model.get('text');
      var due  = this.model.get('due');
      
      this.$('.todo-text').text(text);
      this.input = this.$('.todo-input');
      
      this.$('.todo-date').text(due);
    
      this.input.bind('blur', _.bind(this.close, this)).val(text);
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function() {
      this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      $(this.el).addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      this.model.save({text: this.input.val()});

      $(this.el).removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove this view from the DOM.
    remove: function() {
      $(this.el).remove();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    },

    opentodo:  function()
  {
	    console.log("Yay, triggered.")
      var view = new TodoViewOne({model: this.model});
      $("#todo-show").html(view.render().el);	

  }

  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});
