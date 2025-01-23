import TodoItem from './TodoItem.js';
import Storage from './data.js';
import "../styling/uiStyle.css";
import closeBtn from "../assets/CloseIcon.svg";
import "../styling/popupUiStyle.css";
import Project from "./Project.js";
import TodoList from "./TodoList.js";

class UI {
  constructor(todoList) {
    this.todoList = todoList;
    this.container = null;
    this.projectListElement = null;
    this.todoItemsElement = null;
  }

  createLayout() {
    // Create container
    this.container = document.createElement('div');
    this.container.classList.add('container');

    // Create header
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'TaskMaster';
    header.appendChild(h1);

    // Create main content
    const mainContent = document.createElement('div');
    mainContent.classList.add('main-content');

    // Create sidebar
    const sidebar = document.createElement('nav');
    sidebar.classList.add('sidebar');

    const addProjectButton = document.createElement('button');
    addProjectButton.id = 'add-project';
    addProjectButton.textContent = 'Add Project';
    
    const projectList = document.createElement('ul');
    projectList.id = 'project-list';
    const defaultProject = document.createElement('li');
    defaultProject.classList.add('projectname');
    defaultProject.textContent = '';
    projectList.appendChild(defaultProject);

    sidebar.appendChild(addProjectButton);
    sidebar.appendChild(projectList);

    // Create todo list section
    const todoListSection = document.createElement('section');
    todoListSection.classList.add('todo-list');

    const addTodoButton = document.createElement('button');
    addTodoButton.id = 'add-todo';
    addTodoButton.textContent = 'Add ToDo';

    const todoItems = document.createElement('ul');
    todoItems.id = 'todo-header';
    todoItems.innerHTML = ` 
      <h3></h3>
      <h3>Task Title</h3>
      <p>Description</p>
      <p>Due Date</p>
      <p>Priority</p>`;

    // Create a default todo item
    todoListSection.appendChild(addTodoButton);
    todoListSection.appendChild(todoItems);

    const taskSection = document.createElement('div');
    taskSection.className = "taskLog";
    todoItems.after(taskSection);

    // Append sidebar and todo list section to main content
    mainContent.appendChild(sidebar);
    mainContent.appendChild(todoListSection);

    // Append header and main content to container
    this.container.appendChild(header);
    this.container.appendChild(mainContent);

    // Finally, append container to body
    document.body.appendChild(this.container);
  }

  renderProjects() {
    const sideBarSection = document.querySelector("#project-list");
    sideBarSection.innerHTML = '';
  
    const currentStorage = new Storage(); // Assuming Storage class is available
    const data = currentStorage.getAllProjects();
    const controllUI = new UI();
  
    data.forEach((project) => {
      const li = document.createElement('li');
      li.textContent = project.name;
      li.className = 'projectname';
      sideBarSection.appendChild(li);
  
      // Add an event listener to change the current project when clicked
      li.addEventListener("click", () => {
        // First, remove 'active' class from all projects
        const allProjectsUI = document.querySelectorAll('.projectname');
        allProjectsUI.forEach(element => element.classList.remove("active"));
  
        // Set the clicked project as active
        li.classList.add("active");
  
        // Fetch project tasks and render them
        currentStorage.getProject(li.textContent);
        const allTasks = currentStorage.getProjectTasks(li.textContent);
        controllUI.renderTodos(project, allTasks);
      });
    });
  }

  renderTodos(project, tasks) {
    const miniController = new UI();
    const todoItemsElement = document.querySelector(".taskLog");
    let dataTaskId = 0;
    todoItemsElement.innerHTML = '';
  
    tasks.forEach((todo) => {
      const li = document.createElement('li');
      li.className = "todo-item";
      li.innerHTML = `
        <p></p>
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
        <p>${todo.dueDate}</p>
        <p>${todo.priority}</p>
        <button class="delete-todo" data-taskid="${dataTaskId}" data-projectid="${project.name}">Delete</button>`;
  
      todoItemsElement.appendChild(li);
      dataTaskId++;
    });
  
    // Add event listeners only once after rendering all tasks
    miniController.addEventListenersToButtons();
  }

  // Handle delete button click
  handleDeleteClick(deleteBtn) {
    const controlUI = new UI();
    controlUI.removeTask(deleteBtn);
  }

  addEventListenersToButtons() {
    const deleteButtons = document.querySelectorAll('.delete-todo');
    deleteButtons.forEach((deleteBtn) => {
      deleteBtn.addEventListener('click', () => this.handleDeleteClick(deleteBtn));
    });
  }

  removeEventListenersToButtons() {
    const deleteButtons = document.querySelectorAll('.delete-todo');
    deleteButtons.forEach((deleteBtn) => {
      deleteBtn.removeEventListener('click', () => this.handleDeleteClick(deleteBtn));
    });
  }

  removeTask(deleteBtn) {
    const parentNode = deleteBtn.parentNode;
    const storageModule = new Storage();
    storageModule.removeTask(deleteBtn);
    parentNode.remove();
  }

  showTaskWindow() {
    // Function to create and show the "Create New Task" popup
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.classList.add('popup');

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');

    const topContainer = document.createElement('div');
    topContainer.classList.add('top-container');

    const title = document.createElement('h2');
    title.textContent = 'Create New Task';

    const closeSpan = document.createElement('span');
    const closeImg = document.createElement('img');
    closeImg.src = closeBtn;
    closeImg.id = 'close';
    closeImg.alt = 'ClosePopup';

    closeSpan.appendChild(closeImg);
    topContainer.appendChild(title);
    topContainer.appendChild(closeSpan);

    const form = document.createElement('form');
    form.id = 'task-form';

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Task Title';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.name = 'title';
    titleInput.required = true;
    titleInput.maxLength = 40;
    titleInput.placeholder = 'Ex... Hire Ops Specialist';

    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description';

    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'description';
    descriptionInput.name = 'description';
    descriptionInput.required = true;
    descriptionInput.maxLength = 40;
    descriptionInput.placeholder = 'Ex.... Relocate Work';

    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'dueDate');
    dueDateLabel.textContent = 'Due Date';

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.id = 'dueDate';
    dueDateInput.name = 'dueDate';
    dueDateInput.required = true;

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'priority');
    priorityLabel.textContent = 'Priority';

    const prioritySelect = document.createElement('select');
    prioritySelect.id = 'priority';
    prioritySelect.name = 'priority';
    prioritySelect.required = true;

    const lowOption = document.createElement('option');
    lowOption.value = 'low';
    lowOption.textContent = 'Low';

    const mediumOption = document.createElement('option');
    mediumOption.value = 'medium';
    mediumOption.textContent = 'Medium';

    const highOption = document.createElement('option');
    highOption.value = 'high';
    highOption.textContent = 'High';

    prioritySelect.appendChild(lowOption);
    prioritySelect.appendChild(mediumOption);
    prioritySelect.appendChild(highOption);

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Add Task';

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(dueDateLabel);
    form.appendChild(dueDateInput);
    form.appendChild(priorityLabel);
    form.appendChild(prioritySelect);
    form.appendChild(button);

    popupContent.appendChild(topContainer);
    popupContent.appendChild(form);

    popup.appendChild(popupContent);

    document.body.appendChild(popup);

    closeImg.addEventListener('click', () => {
      popup.remove();
    });

    button.addEventListener('click', (e) => {
      if (document.querySelector('.active') == null) {
        alert("Please select a project");
      } else {
        const taskTitle = titleInput.value;
        const taskDesc = descriptionInput.value;
        const taskDueDate = dueDateInput.value;
        const taskPriority = prioritySelect.value;
    
        // Validate input fields
        if (!taskTitle || !taskDesc || !taskDueDate || !taskPriority) {
          alert("All fields are required.");
          return;
        } else {
          const newTask = {
            title: taskTitle,
            description: taskDesc,
            dueDate: taskDueDate,
            priority: taskPriority,
          };
    
          const storageModule = new Storage();
          storageModule.addTaskToProject(document.querySelector('.active').textContent, newTask);
          popup.remove();
        }
      }
    });
  }

  showProjectWindow() {
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.classList.add('popup');

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');

    const topContainer = document.createElement('div');
    topContainer.classList.add('top-container');

    const title = document.createElement('h2');
    title.textContent = 'Create New Project';

    const closeSpan = document.createElement('span');
    const closeImg = document.createElement('img');
    closeImg.src = closeBtn;
    closeImg.id = 'close';
    closeImg.alt = 'ClosePopup';

    closeSpan.appendChild(closeImg);
    topContainer.appendChild(title);
    topContainer.appendChild(closeSpan);

    const form = document.createElement('form');
    form.id = 'task-form';

    const label = document.createElement('label');
    label.setAttribute('for', 'title');
    label.textContent = 'Project Title';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'title';
    input.name = 'title';
    input.required = true;
    input.maxLength = 40;
    input.placeholder = 'Ex... Data Analytics';

    const button = document.createElement('button');
    button.type = 'button';  // Set button type to "button" to prevent form submission
    button.textContent = 'Add Project';
    button.className = "newproject";

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);

    popupContent.appendChild(topContainer);
    popupContent.appendChild(form);

    popup.appendChild(popupContent);

    document.body.appendChild(popup);

    closeImg.addEventListener('click', () => {
      popup.remove();
    });

    // Add event listener for the form submit to prevent page reload
    form.addEventListener('submit', (e) => {
      e.preventDefault();  // Prevent form submission and page reload
    });

    button.addEventListener('click', () => {
      this.newProjectFlow(input);
    });
  }

  newProjectFlow(input) {
    const storageModule = new Storage();
    const uiModule = new UI();
    const projectTitle = input.value;
    storageModule.addProject(projectTitle);
    uiModule.renderProjects();

    popup.remove();
  }

  addTodoToProject(title, description, dueDate, priority) {
    const todo = new TodoItem(title, description, dueDate, priority);
    const currentProject = this.todoList.getCurrentProject();
    if (!currentProject) return;

    currentProject.addTodo(todo);
    this.renderTodos();
    Storage.saveData(this.todoList);
  }

  attachListeners() {
    const ProjectBtn = document.querySelector("#add-project");
    const TasktBtn = document.querySelector("#add-todo");

    ProjectBtn.addEventListener("click", () => {
      const UIstate = new UI();
      UIstate.removeEventListenersToButtons();
      UIstate.showProjectWindow();
    });

    TasktBtn.addEventListener("click", () => {
      const UIstate = new UI();
      UIstate.showTaskWindow();
    });
  }
}

export default UI;
