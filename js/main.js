let title = document.getElementById("title");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");

let mood = "create";
let tmp;

// create

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value,
  }


  if (title.value != "") {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "create";
    }
  }

  // save localstronge

  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
  showData();
};

// clear inputs

function clearData() {
  title.value = "";
}

// read

function showData() {
  let table = "";
  for(let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
        <td>${i+1}</td>
        <td id='tit'><span>x</span>${dataPro[i].title}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
      `;
  }
  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
      <button onclick="deleteAll()" id="delete">delete All (${dataPro.length})</button>
      `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

// delete

function deleteData(i) {
  dataPro.splice(i,1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}


// update

function updateData(i) {
  title.value = dataPro[i].title;
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
};


// search

let searchMood = "title";

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value)) {
        table += `
          <tr>
            <td>${i}</td>
            <td id='tit'><span>x</span>${dataPro[i].title}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
          </tr>
          `;
      }
  }
  document.getElementById("tbody").innerHTML = table;
}




tbody.addEventListener('click', function(ev) {
    ev.target.classList.toggle("checked");
}, false);


