const password = window.localStorage.getItem("neo4covid_password");

// eslint-disable-next-line no-unused-vars
function submitQuery(event) {
  document.querySelector("#spinner").classList.remove("hidden");
  const q = event.target.elements.query.value;
  event.preventDefault();
  if (q.length === 0) {
    alert("Please insert a query");
    return;
  }

  fetch(
    `${window.location.protocol}//${window.location.host}/mongo?query=${q}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${password}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw data.error;
      }

      //TODO do something with the data

      document.querySelector("#spinner").classList.add("hidden");
    })
    .catch((e) => {
      document.querySelector("#spinner").classList.add("hidden");
      alert("Invalid query");
      console.error(e);
    });
}
