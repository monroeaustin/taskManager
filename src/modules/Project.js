// Project.js
class Project {
    constructor(name) {
      this.name = name;
      this.todos = []; // Store todos related to the project
    }
  
    addTodo(todoItem) {
      this.todos.push(todoItem);
    }
  
    removeTodo(title) {
      this.todos = this.todos.filter(todo => todo.title !== title); // Remove a todo by title
    }
  
    getTodos() {
      return this.todos; // Return the todos of the project
    }
  
    // Additional methods if needed
  }
  
  export default Project;
  