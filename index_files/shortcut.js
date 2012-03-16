var ShortcutKeys = Backbone.Shortcuts.extend({
  
shortcuts: {
    "alt+n" : "toggle_new", 
     "alt+x" : "clear"

    },

 clear: function() {
 
 _.each(_.toArray(window.Todos), 
    function(todo)
    { 
       console.log(todo);
       todo.destroy(); 
    });

},   

  toggle_new: function(e)
   {

      $("#create-todo").slideToggle()

  }

});

var shortcuts = new ShortcutKeys;
