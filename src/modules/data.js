import UI from "./ui.js";

// Initialize inventory with default value or data from localStorage
let inventory = [];
const storedProjects = localStorage.getItem("projects");

if (storedProjects) {
  try {
    inventory = JSON.parse(storedProjects);
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    inventory = [
      {
        name: "default project",
        tasks: [
          {
            title: "Save Plankton",
            description: "Head over to bikini Bottom and gather tools for Patrick",
            dueDate: "2025-01-31",
            priority: "High",
          },
        ],
      },
    ]; // Fallback to default inventory
  }
} else {
  inventory = [
    {
      name: "default project",
      tasks: [
        {
          title: "Save Plankton",
          description: "Head over to bikini Bottom and gather tools for Patrick",
          dueDate: "2025-01-31",
          priority: "High",
        },
      ],
    },
  ];
}

class Storage {
  // Add a new project to the inventory
  addProject(projectName) {
    const project = { name: projectName, tasks: [] };
    inventory.push(project);
    this.savetoLocalStorage(); // Save updated inventory to localStorage
  }

  // Add a new task to a specific project
  addTaskToProject(projectName, todo) {
    const project = inventory.find((proj) => proj.name === projectName);
    if (project) {
      project.tasks.push(todo);

      const uiModule = new UI();
      uiModule.renderTodos(project, project.tasks);
      this.savetoLocalStorage(); // Save updated inventory to localStorage
    } else {
      console.error(`Project '${projectName}' not found.`);
    }
  }

  // Retrieve all projects
  getAllProjects() {
    return inventory;
  }

  // Retrieve a specific project by name
  getProject(projectName) {
    const specificProject = inventory.find((proj) => proj.name === projectName);
    if (specificProject) {
      return specificProject;
    } else {
      console.error(`Project '${projectName}' not found.`);
      return null;
    }
  }

  // Retrieve tasks of a specific project
  getProjectTasks(projectName) {
    const specificProject = inventory.find((proj) => proj.name === projectName);
    if (specificProject) {
      return specificProject.tasks;
    } else {
      console.error(`Project '${projectName}' not found.`);
      return null;
    }
  }

  // Get the active project
  getActiveProject() {
    const currentProject = document.querySelector(".active")?.textContent;
    if (currentProject) {
      return this.getProject(currentProject);
    }
    console.error("No active project found.");
    return null;
  }

  // Save inventory to localStorage
  savetoLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(inventory));
  }

  // Load projects from localStorage
  loadFromLocalStorage() {
    const projectsJSON = localStorage.getItem("projects");

    if (!projectsJSON) {
      // If no data exists, return the default inventory
      return inventory;
    }

    // If data exists, parse and return it
    try {
      return JSON.parse(projectsJSON);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return inventory; // Fallback to default inventory if parsing fails
    }
  }

  // Remove a task from a specific project
  removeTask(node) {
    const taskIndex = node.getAttribute("data-taskid");
    const projectName = node.getAttribute("data-projectid");
    const project = inventory.find((proj) => proj.name === projectName);

    if (project) {
      if (taskIndex >= 0 && taskIndex < project.tasks.length) {
        // Remove the task at the specified index
        project.tasks.splice(taskIndex, 1);
        console.log(
          `Task at index ${taskIndex} removed from project "${projectName}".`
        );
        this.savetoLocalStorage(); // Save updated inventory to localStorage
      } else {
        console.error(
          `Invalid task index "${taskIndex}" for project "${projectName}".`
        );
      }
    } else {
      console.error(`Project "${projectName}" not found.`);
    }
  }

  // Log project info (for testing)
  logProject() {
    console.log(inventory);
  }
}

export default Storage;
