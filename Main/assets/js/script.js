// ✅: save reference to important DOM elements using jQuery
var timeDisplayEl = $('#time-display');
var projectDisplayEl = $('#project-display');
var projectFormEl = $('#project-form');
// Form inputs
var projectNameInputEl = $('#project-name-input');
var projectTypeInputEl = $('#project-type-input');
var projectDateInputEl = $('#project-date-input');

// store the default project to show if no projects are in local storage
var defaultProjects = projectDisplayEl.children();

// ✅: write a function to handle displaying the time
function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}

// ✅: write a function to read projects from local storage
function readProjectsFromStorage() {
  var projects = JSON.parse(localStorage.getItem('projects')) || [];
  return projects;
}

// ✅: write a function that saves projects (passed as a parameter) to local storage
function saveProjectsToStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

// ✅: write a function that gets project data from local storage and prints/displays it in the DOM
function printProjectData() {
  // ✅: clear current projects on the page (*hint!* how can you "empty" something in jQuery)
  projectDisplayEl.empty();
  // ✅: get projects from localStorage (*hint!* call the function you already wrote!)
  var projects = readProjectsFromStorage();

  if (!projects.length) {
    projectDisplayEl.append(defaultProjects);
    return;
  }

  // ✅: loop through each project and create a row
  for (var i = 0; i < projects.length; i++) {
    var project = projects[i];
    // ✅: get the name/type/& date of the current project in the loop
    var projectName = project.name;
    var projectType = project.type;
    var projectDate = dayjs(project.date);

    // ✅: get date/time for START of today
    var today = dayjs().startOf('day');

    // ✅: Create row and column elements (*hint!* <tr> -> <td>) for the project and add text to each cell
    var rowEl = $('<tr>');
    var nameEl = $('<td>').text(projectName);
    var typeEl = $('<td>').text(projectType);
    var dateEl = $('<td>').text(projectDate.format('MM/DD/YYYY'));

    // ----- TASK 4 - ONLY WORK ON THIS IF YOU'VE COMPLETED TASKS 1 - 3!!!
    // ✅: create a Delete button in its own table cell
    var deleteEl = $(
      '<td><button class="btn btn-sm btn-delete-project" data-index="' + i + '">X</button></td>');
    // (*hint!* save the index of the project as a `data-*` attribute on the button so we know
    // what project to delete when we click that button)

    // ----- TASK 4 - ONLY WORK ON THIS IF YOU'VE COMPLETED TASKS 1 - 3!!!
    // ✅: add custom classes to the row to show if project is late or due today
    // (*hint!* comparing project date to today's date)
    if (projectDate.isBefore(today)) {
      rowEl.addClass('project-late');
    } else if (projectDate.isSame(today)) {
      rowEl.addClass('project-today');
    }

    // ✅: append elements to DOM to display them
    rowEl.append(nameEl, typeEl, dateEl, deleteEl);
    projectDisplayEl.append(rowEl);
  }
}

// ✅: write a function to add a project to local storage and call the fn that prints the project data
// (*hint!* this should happen when the form in the modal is submitted)
function handleProjectFormSubmit(event) {
  event.preventDefault();
  // ✅: read user input from the form
  var projectName = projectNameInputEl.val().trim();
  var projectType = projectTypeInputEl.val();
  var projectDate = projectDateInputEl.val();

  // ✅: mold a new object with the data from above
  var newProject = {
    name: projectName,
    type: projectType,
    date: projectDate
  }

  // ✅: add project to local storage w/ the function you already wrote
  // (*hint!* make sure it doesn't overwrite other projects, but rather ADDS it)
  var projects = readProjectsFromStorage(); // []
  projects.push(newProject);

  saveProjectsToStorage(projects);

  // ✅: print project data with the function you wrote
  printProjectData();

  // ✅: clear the form inputs
  projectNameInputEl.val('');
  projectTypeInputEl.val('');
  projectDateInputEl.val('');
}

// ----- TASK 4 - ONLY WORK ON THIS IF YOU'VE COMPLETED TASKS 1 - 3!!!
// ✅: write a function to temove a project from local storage and call the fn that prints the project data
function handleDeleteProject() {
  var projectIndex = parseInt($(this).attr('data-index'));

  var projects = readProjectsFromStorage();
  projects.splice(projectIndex, 1);
  saveProjectsToStorage(projects);

  printProjectData();
}

// ✅: set up event listeners for new project form submission and
projectFormEl.on('submit', handleProjectFormSubmit);
// ✅: and to delete a project (<-- TASK 4 ONLY)
// (*hint!* brush up on jQuery event delegation to listen for clicks on dynamically elements
projectDisplayEl.on('click', '.btn-delete-project', handleDeleteProject);

// ✅: call the function to display the initial time
displayTime();

// ✅: update the time every second
setInterval(displayTime, 1000)

// ✅: call the function to print the project data read from local storage on page load
printProjectData();