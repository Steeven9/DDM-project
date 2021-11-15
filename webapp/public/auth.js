const storedPassword = window.localStorage.getItem("neo4covid_password");
if (!storedPassword && location.pathname != "/password.html") {
  location.href = "/password.html";
}

// eslint-disable-next-line no-unused-vars
function setPassword(event) {
  event.preventDefault();
  const password = event.target.elements.password.value;
  if (password && password.length > 0) {
    window.localStorage.setItem("neo4covid_password", password);
    alert("Password was set");
    window.location = `${window.location.protocol}//${window.location.host}`;
  } else {
    alert("Invalid password");
  }
}
