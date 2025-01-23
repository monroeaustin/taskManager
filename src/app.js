import UI from './modules/ui.js';
import Storage from './modules/data.js'
const UIController = new UI;
UIController.createLayout(); 
// defaultState.showProjectWindow();
// defaultState.showTaskWindow();
const storageController = new Storage;
storageController.loadFromLocalStorage();
UIController.renderProjects();
UIController.attachListeners();