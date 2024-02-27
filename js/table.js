showCompanies();

let companyName = document.getElementById("companyName");
let companyRegNumber = document.getElementById("companyRegNumber");
let validateTxt = document.getElementById("validateTxt");
let updateCompBtn = document.getElementById("updateCompBtn");
updateCompBtn.style.display = "none";




//************************************************/
//***            Add a new comapny             ***/
//************************************************/
let addCompBtn = document.getElementById("addCompBtn");
addCompBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let companies = localStorage.getItem("companies");
  companies = companies ? JSON.parse(companies) : [];

  let newId =
    companies.length > 0
      ? Math.max(...companies.map((comp) => comp.id)) + 1
      : 1;

  let newComp = {
    id: newId,
    RegNumber: companyRegNumber.value,
    name: companyName.value,
  };

  if (newComp.name === "") {
    validateTxt.innerText = "Name is required";
    validateTxt.style.color = "red";
  } else if (newComp.RegNumber === "") {
    validateTxt.innerText = "Registration is required";
    validateTxt.style.color = "red";
  } else {
    companies.push(newComp);
    localStorage.setItem("companies", JSON.stringify(companies));

    validateTxt.innerText = "Company Added successfully";
    validateTxt.style.color = "green";
    updateCompBtn.style.display = "none";

    setTimeout(function () {
      companyName.value = "";
      companyRegNumber.value = "";
      showCompanies();
      validateTxt.innerText = "";
    }, 2000);
  }
});




//************************************************/
//***             Show Companies               ***/
//************************************************/
function showCompanies() {
  let companies = localStorage.getItem("companies");
  companies = companies ? JSON.parse(companies) : [];
  let showInnerHtml = "";
  companies.forEach(function (element, index) {
    showInnerHtml += `
        <tr>
        <td>${index + 1}</td>
        <td>${element.name}</td>
        <td>${element.RegNumber}</td>
        <td>
        <button id="${index}" onclick="editCompany(this.id)" class="btn btn-primary">Edit</button>
        <button id="${index}" onclick="deleteCompany(this.id)" class="btn btn-danger">Delete</button>
        </td>
      </tr>
      
        `;
  });

  // Element  to create a comapny
  let companyElement = document.getElementById("tableBody");
  companyElement.innerHTML = (companies.length != 0) ? showInnerHtml : "Nothing to show!";
}




//************************************************/
//***        On Edit button Function           ***/
//************************************************/
function editCompany(index) {
  let companies = localStorage.getItem("companies");
  companies = companies ? JSON.parse(companies) : [];

  if (companies[index]) {
    companyName.value = companies[index].name;
    companyRegNumber.value = companies[index].RegNumber;
  }
  // Store the index of the edited company
  updateCompBtn.dataset.index = index;
  updateCompBtn.style.display = "block";
}



//************************************************/
//***              Update company              ***/
//************************************************/
updateCompBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let index = this.dataset.index;
  let companies = localStorage.getItem("companies");
  companies = JSON.parse(companies);

  if (companies[index]) {
    let updatedName = companyName.value;
    let updatedRegNumber = companyRegNumber.value;

    if (updatedName === "") {
      validateTxt.innerText = "Name is required";
      validateTxt.style.color = "red";
    } else if (updatedRegNumber === "") {
      validateTxt.innerText = "Registration is required";
      validateTxt.style.color = "red";
    } else {
      companies[index].name = updatedName;
      companies[index].RegNumber = updatedRegNumber;

      localStorage.setItem("companies", JSON.stringify(companies));

      validateTxt.innerText = "Company updated successfully";
      validateTxt.style.color = "green";

      setTimeout(function () {
        companyName.value = "";
        companyRegNumber.value = "";
        showCompanies();
        validateTxt.innerText = "";
        updateCompBtn.style.display = "none";
      }, 2000);
    }
  }
});



//************************************************/
//***             Delete company               ***/
//************************************************/
function deleteCompany(index) {
  let companies = localStorage.getItem("companies");
  companies = companies ? JSON.parse(companies) : [];
  companies.splice(index, 1);
  localStorage.setItem("companies", JSON.stringify(companies));
  companyName.value = "";
  companyRegNumber.value = "";
  updateCompBtn.style.display = "none";

  showCompanies();
}
