import { validMsgFunc } from './commanFunc.js';

let signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener("click", function (e) {
  e.preventDefault();
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  let newUser = {
    name: name.value,
    email: email.value,
    password: password.value,
  };


  if (newUser.name == "") {
    validMsgFunc("Name is required", "red")
  } else if (newUser.email === "") {
    validMsgFunc("Email is required", "red")
  } else if (newUser.password === "") {
    validMsgFunc("Password is required", "red")
  } else {
    let users = localStorage.getItem("users");
    users = users ? JSON.parse(users) : [];
    let emailExists = users.some(user => user.email === newUser.email);
    if (emailExists) {
      validMsgFunc("Email already exists", "red");
    } else {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      validMsgFunc("Registered user successfully", "green");

      name.value = "";
      email.value = "";
      password.value = "";
      setTimeout(function() {
        location.href = "login.html";
      }, 2000);
    }
  }
});
