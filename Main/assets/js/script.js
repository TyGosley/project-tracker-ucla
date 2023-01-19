// TODO: save reference to important DOM elements using jQuery
var timeDisplayEL = $("#time-display");
var projectDisplayEL = $("#project-display");
var projectFormEL = $("#project-form");

// Form Inputs
var projectNameInputEl = $("#project-name-input");
var projectTypeInputEl = $("#project-type-input");
var projectDateInputEl = $("#project-date-input");


// TODO: write a function to handle displaying the time
function displayTime() {
  // ...
}

// TODO: write a function to read projects from local storage
function readProjectsFromStorage() {
  // ...
}

// TODO: write a function that saves projects (passed as a parameter) to local storage
function saveProjectsToStorage(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// TODO: write a function that gets project data from local storage and prints/displays it in the DOM
function printProjectData() {
  // TODO: clear current projects on the page (*hint!* how can you "empty" something in jQuery)

  // TODO: get projects from localStorage (*hint!* call the function you already wrote!)

  // TODO: loop through each project and create a row

  // for () { // start for loop
    // TODO: get the date of the current project in the loop

    // TODO: get date/time for START of today

    // TODO: Create row and column elements (*hint!* <tr> -> <td>) for the project and add text to each cell


    // ----- TASK 4 - ONLY WORK ON THIS IF YOU'VE COMPLETED TASKS 1 - 3!!!
    // TODO: create a Delete button in its own table cell
    // (*hint!* save the index of the project as a `data-*` attribute on the button so we know
    // what project to delete when we click that button)

    // ----- TASK 4 - ONLY WORK ON THIS IF YOU'VE COMPLETED TASKS 1 - 3!!!
    // TODO: add custom classes to the row to show if project is late or due today
    // (*hint!* comparing project date to today's date)
    if ('project is late') {
      // project is late
    } else if ('project is do today') {
      // project is do today
    }

    // TODO: append elements to DOM to display them
  // } // end for loop
}

// ✅ write a function to add a project to local storage and call the fn that prints the project data
// (*hint!* this should happen when the form in the modal is submitted)
function handleProjectFormSubmit(event) {
  event.preventDefault();
  
  // TODO: read user input from the form
var projectName = projectNameInputEl.val().trim();
var projectName = projectTypeInputEl.val();
var projectName = projectDateInputEl.val();
  // TODO: mold a new object with the data from above
var newProject = {
  name: projectName,
  type: projectType,
  date: projectDate
}

  // TODO: add project to local storage w/ the function you already wrote
  // (*hint!* make sure it doesn't overwrite other projects, but rather ADDS it)
var projects = []; //TODO: write and call readProjects
projects.push(newProject);

saveProjectsToStorage(projects)
  
printProjectData();
  
  projectNameInputEl.val("");
  projectTypeInputEl.val("");
  projectDateInputEl.val("");
}

// ----- TASK 4 - ONLY WORK ON THIS IF YOU'VE COMPLETED TASKS 1 - 3!!!
// TODO: write a function to temove a project from local storage and call the fn that prints the project data
function handleDeleteProject() {
  // ...
}

// ✅ set up event listeners for new project form submission and
projectFormEL.on("submit", handleProjectFormSubmit);
// TODO: and to delete a project (<-- TASK 4 ONLY)
// (*hint!* brush up on jQuery event delegation to listen for clicks on dynamically elements

// TODO: call the function to display the initial time

// TODO: update the time every second

// TODO: call the function to print the project data read from local storage on page load
