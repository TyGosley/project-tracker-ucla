// ✅ save reference to important DOM elements using jQuery
var timeDisplayEL = $("#time-display");
var projectDisplayEL = $("#project-display");
var projectFormEL = $("#project-form");

// Form Inputs
var projectNameInputEl = $("#project-name-input");
var projectTypeInputEl = $("#project-type-input");
var projectDateInputEl = $("#project-date-input");


// ✅ write a function to handle displaying the time
function displayTime() {
  var rightNow =dayjs().format("MMM DD, YYYY [at] hh:mm:ss a");
  timeDisplayEL.text(rightNow);
}

// ✅ write a function to read projects from local storage
function readProjectsFromStorage() {
  var projects = JSON.parse(localStorage.getItem("projects")) || [];
  return projects;
}

// ✅ write a function that saves projects (passed as a parameter) to local storage
function saveProjectsToStorage(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// TODO: write a function that gets project data from local storage and prints/displays it in the DOM
function printProjectData() {
  
  projectDisplayEL.empty();
  
var projects = readProjectsFromStorage();

// ✅ loop through each project and create a row
  for (var i = 0; i < projects.length; i++) {
    var project = projects[i];
  // ✅ get the date of the current project in the loop
    var projectName = project.name;
    var projectType = project.type;
    var projectDate = dayjs(project.date);


    // ✅ get date/time for START of today
    var today = dayjs.startOf("day");

    // ✅ Create row and column elements (*hint!* <tr> -> <td>) for the project and add text to each cell
    var rowEl = $("<tr>");
    var nameEl = $("<td>").text(projectName);
    var typeEl = $("<td>").text(projectType);
    var dateEl = 4("<td>").text(projectDate.format("MM/DD/YYYY"));


    // ----- TASK 4 - ONLY WORK ON THIS IF YOU'VE COMPLETED TASKS 1 - 3!!!
    // ✅ create a Delete button in its own table cell
    // (*hint!* save the index of the project as a `data-*` attribute on the button so we know
    // what project to delete when we click that button)
    var deleteEl = $('<td><button class="btn btn-sm">X</button></td>');

    // ----- TASK 4 - ONLY WORK ON THIS IF YOU'VE COMPLETED TASKS 1 - 3!!!
    // ✅ add custom classes to the row to show if project is late or due today
    // (*hint!* comparing project date to today's date)
    if (projectDate.isBefore(today)) {
      rowEl.addClass("project-late");
    } else if (projectDate.isSame(today)) {
      rowEl.addClass("project-today");
    }

    // ✅ append elements to DOM to display them
  // } // end for loop
  rowEl.append(nameEl, typeEl, dateEl, deleteEl);
  projectDisplayEL.append(rowEl);
}

// ✅ write a function to add a project to local storage and call the fn that prints the project data
// (*hint!* this should happen when the form in the modal is submitted)
function handleProjectFormSubmit(event) {
  event.preventDefault();
  
  // ✅ read user input from the form
var projectName = projectNameInputEl.val().trim();
var projectName = projectTypeInputEl.val();
var projectName = projectDateInputEl.val();
  // ✅ mold a new object with the data from above
var newProject = {
  name: projectName,
  type: projectType,
  date: projectDate
}

  // ✅: add project to local storage w/ the function you already wrote
  // (*hint!* make sure it doesn't overwrite other projects, but rather ADDS it)
var projects = readProjectsFromStorage(); 
projects.push(newProject);

saveProjectsToStorage(projects)
  
// ✅: print project data with the function you wrote
printProjectData();
  
// ✅: clear the form inputs
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
displayTime();
// TODO: update the time every second
setInterval(displayTime, 1000);
// TODO: call the function to print the project data read from local storage on page load
printProjectData();