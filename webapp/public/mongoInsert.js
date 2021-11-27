const password = window.localStorage.getItem("neo4covid_password");

// eslint-disable-next-line no-unused-vars
function submitQuery(event) {
  document.querySelector("#spinner").classList.remove("hidden");
  let q = event.target.elements.query.value;
  let collection = event.target.elements.collection.value;
  event.preventDefault();
  if (q.length === 0) {
    alert("Please insert a query");
    return;
  }

  fetch(
    `${window.location.protocol}//${window.location.host}/api/mongo/insert/${collection}?docs=${q}`,
    {
      headers: {
        Authorization: `Bearer ${password}`,
      },
      method: "POST",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        document.querySelector("#result").innerHTML = data.error;
        throw data.error;
      }

      document.querySelector("#result").innerHTML = data.msg;
      document.querySelector("#spinner").classList.add("hidden");
    })
    .catch((e) => {
      document.querySelector("#spinner").classList.add("hidden");
      alert("Invalid query");
      console.error(e);
    });
}
