import { validMsgFunc } from "./commanFunc.js";

let logInBtn = document.getElementById("logInBtn");
logInBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let logiUser = {
    email: email.value,
    password: password.value,
  };

  if (logiUser.email === "") {
    validMsgFunc("Email is required", "red");
  } else if (logiUser.password === "") {
    validMsgFunc("Password is required", "red");
  } else {
    let users = localStorage.getItem("users");
    users = users ? JSON.parse(users) : [];
    if(users.length===0){
      validMsgFunc("User dosn't exist", "red");
    }else{

      users.forEach(function (user) {
        if (
          user.email === logiUser.email &&
          user.password === logiUser.password
        ) {
          localStorage.setItem("userInfo", JSON.stringify(logiUser));
          validMsgFunc("Login successfully", "green");
          email.value = "";
          password.value = "";
          setTimeout(function () {
            location.href = "table.html";
          }, 2000);
        } else {
          validMsgFunc("Email or password is incorrect", "red");
        }
      });
    }

  }
}
);
