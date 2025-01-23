// TodoList.js
class TodoList {
    constructor() {
      this.projects = [new Project('Default Project')]; // Default project
      this.currentProjectIndex = 0; // Default to the first project
    }
  
    // Method to get the current project
    getCurrentProject() {
      return this.projects[this.currentProjectIndex]; 
    }
  
    // Method to set the current project when a project is clicked
    setCurrentProject(index) {
      this.currentProjectIndex = index;
    }
  
    // Additional methods...
  }
  
  export default TodoList;
  