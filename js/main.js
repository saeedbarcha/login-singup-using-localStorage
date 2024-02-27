let logInUser = localStorage.getItem("userInfo");
let tableClickBtn = document.getElementById("tableClickBtn");
let headerCont = document.getElementById("headerCont");

// Function to logout
function logout() {
  localStorage.removeItem("userInfo");
  window.location.href = "login.html";
}


if (logInUser) {
  headerCont.innerHTML = `
    <ul class="nav">
    <li class="nav-item active">
      <a class="nav-link text-white" href="index.html">home</a>
    </li>
    <li class="nav-item">
    <a class="nav-link text-white" href="table.html">table</a>
  </li>
    <li class="nav-item">
    <a class="nav-link text-white" onclick="logout()" href="">logout</a>
    </li>
  </ul>
    `;
} else {
  headerCont.innerHTML = `
    <ul class="nav">
    <li class="nav-item active">
      <a class="nav-link text-white" href="index.html">home</a>
    </li>
 
    <li class="nav-item">
      <a class="nav-link text-white" href="login.html">Login</a>
    </li>
    <li class="nav-item ">
      <a class="nav-link text-white" href="signup.html">Register</a>
    </li>
  </ul>
    `;
}
