//addEventListener click for button Add
////Get the content of the <input id="task-value">
// document.getElementById("add-task").addEventListener("click", function () {
//   var taskValue = document.getElementById("task-value").value;
//   if (taskValue) alert(taskValue);
//   document.getElementById("task-value").value = "";
// });

//EVENT CLICK BUTTON ADD
document.getElementById("add-task").addEventListener("click", function () {
  var taskValue = document.getElementById("task-value").value;
  if (taskValue)  addTask(taskValue)  //alert(taskValue);
  document.getElementById("task-value").value = "";
});
// CLICK BUTTON BY ENTER
document.getElementById("task-value").addEventListener("keyup", function(event) {
  if(event.keyCode === 13){
    event.preventDefault();
    document.getElementById("add-task").click();
  }
});


// FUNCTION ADDTASK(value)

/* <div class="column dropzone">
<h3 class="column-title">Backlog</h3>
<ul class="tasks" id="tasks-added">

  <!--TASK-->
  <!-- <li class="task fill" draggable="true">
    <div class="task-content">Write the weekly note</div>
    <div class="trash">&times;</div>
    <div class="edit">&times;</div>
  </li> -->
</ul>
</div> */

function addTask(taskValue) {
  //create li tag
  var task = document.createElement("li");

  // add class and attribute
  task.classList.add("task");
  task.classList.add("fill");
  task.setAttribute("draggable", "true");

  // addEvent: dragstart and dragend
  //dragstart: kich hoat khi user bat dau keo doi tuong
  task.addEventListener("dragstart", dragStart);
  //dragEnd: kich hoat khi user tha chuot
  task.addEventListener("dragend", dragEnd);


  // create div
  var taskContent = document.createElement("div");
  // add class
  taskContent.classList.add("task-content");
  // add Text
  taskContent.innerText = taskValue;

  // TRASH DIV
  var trash = document.createElement("div");
  trash.classList.add("trash");
  trash.innerHTML = `<i class="fas fa-trash"></i>`;
  trash.addEventListener("click", removeTask);

  //EDIT DIV
  var edit = document.createElement("div");
  edit.classList.add("edit");
  edit.innerHTML = `<i class="fas fa-edit"></i>`;
  edit.addEventListener("click", editTask);

  // INPROGRESS BUTTON
  let inProgress = document.createElement("button");
  inProgress.classList.add("inProgress");
  inProgress.innerHTML = "In Progress";
  inProgress.addEventListener("click", moveInProgress);

  // REVIEW BUTTON
  let review = document.createElement("button");
  review.classList.add("review");
  review.innerHTML = "Review";
  review.addEventListener("click", moveReview);

  // DONE BUTTON
  let done = document.createElement("button");
  done.classList.add("done");
  done.innerHTML = "Done";
  done.addEventListener("click", moveDone);



  // add div taskContent vào the li
  task.appendChild(taskContent);
  // add icon trash vao the li
  task.appendChild(trash);
  task.appendChild(edit);
  task.appendChild(inProgress);
  task.appendChild(review);
  task.appendChild(done);
  console.log(task);

  // lay the co id = "tasks-added" (the ul)
  var tasks = document.getElementById("tasks-added");
  // insertBefore = inserts a node as a child, right before the first child element of an <ul> element
  tasks.insertBefore(task, tasks.childNodes[0]);
}

//Event represents the remove button = the div 
function removeTask(event) {
  // Access the <ul> list by moving 2 levels up
  var tasks = event.target.parentNode.parentNode.parentNode;
  // Access the <li> element which is the direct parent
  var task = event.target.parentNode.parentNode;
  tasks.removeChild(task);
}

//Function EditTask
function editTask(event) {
  let task = event.target.parentNode.parentNode;
  console.log(event.target); // icon
  console.log(task.childNodes);
  let taskEdit = task.childNodes[0];

 
  let form = document.createElement("form");
  form.classList.add("form-edit");
  form.addEventListener("submit", renewTask);

  let input = document.createElement("input");
  input.setAttribute("autofocus", "true");
  input.value = taskEdit.childNodes[0].nodeValue;

  let editButton = document.createElement("button");
  editButton.innerHTML = "Edit";

  form.appendChild(input);
  form.appendChild(editButton);
  task.appendChild(form);
  event.target.style.visibility = "hidden";

  function renewTask(event){
    event.preventDefault();
    taskEdit.childNodes[0].nodeValue = input.value;
    console.log(event.target);
    let myEditBtn = event.target.parentNode.childNodes[2].childNodes[0];
    console.log(myEditBtn);
    myEditBtn.style.visibility = "visible";
    event.target.remove();
  }
}


// DRAG & DROP

// A global variable to store the selected task
var task;

function dragStart(event) {
  // add class "hold"  --> tag li
  event.target.className += " hold";
  // global variable = tag li
  task = event.target;
  // add class "invisible"
  setTimeout(() => (event.target.className = "invisible"), 0);
}
//? class name task fill
function dragEnd(event) {
  event.target.className = "task fill";
}

// kich hoat khi chuot di chuyen lan dau qua phan tu muc tieu
// trong khi hanh dong keo dang dien ra
function dragEnter(event) {
  event.preventDefault();
  if (event.target.className === "column dropzone") {
    event.target.className += " hovered";
  }
}

//chuot chi di chuyen qua 1 phan tu khi hoat dong keo dien ra
function dragOver(event) {
  event.preventDefault();
}

//chuot roi khoi phan tu (trong khi hoat dong keo dang dien ra)
function dragLeave(event) {
  if (event.target.className === "column dropzone hovered") {
    event.target.className = "column dropzone";
  }
}
// su kien tha tren 1 phan tu
// event.target = the div
// childNodes[1] cua the div = ul 
function dragDrop(event) {
  if (event.target.className === "column dropzone hovered") {
    event.target.className = "column dropzone";
  }
  // event represents the column
  // Add the task to the second element of the column which is the <ul> element (the first one is a <h1>)
  event.target.childNodes[1].append(task);
}

// array of elements class = dropzone
var dropzones = document.querySelectorAll(".dropzone");

for (let index = 0; index < dropzones.length; index++) {
  const dropzone = dropzones[index];
  dropzone.addEventListener("dragenter", dragEnter);
  dropzone.addEventListener("dragover", dragOver);
  dropzone.addEventListener("dragleave", dragLeave);
  dropzone.addEventListener("drop", dragDrop);
}
/* <div class="column dropzone">
<h3 class="column-title">Backlog</h3>
<ul class="tasks" id="tasks-added">

  <!--TASK-->
  <!-- <li class="task fill" draggable="true">
    <div class="task-content">Write the weekly note</div>
    <div class="trash">&times;</div>
  </li> -->
</ul>
</div> */
function moveInProgress(event){
  //add li into column Progress
  let task = event.target.parentNode;
  let ul = document.getElementById("tasks-inProgress");
  ul.appendChild(task);
}
function moveDone(event){
  //add li into column Done
  let task = event.target.parentNode;
  let ul = document.getElementById("tasks-Done");
  ul.appendChild(task);
}
function moveReview(event){
  let task = event.target.parentNode;
  let ul = document.getElementById("tasks-Review");
  ul.appendChild(task);
}