// TodoItem.js
class TodoItem {
    constructor(title, description, dueDate, priority) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.completed = false; // Track whether the task is completed or not
    }
  
    toggleComplete() {
      this.completed = !this.completed; // Toggle completion status
    }
  
    updateTask(title, description, dueDate, priority) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
    }
  
    // Additional methods if needed
  }
  
  export default TodoItem;
  