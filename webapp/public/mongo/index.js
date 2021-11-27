const password = window.localStorage.getItem("neo4covid_password");

// eslint-disable-next-line no-unused-vars
function submitQuery(event) {
  document.querySelector("#spinner").classList.remove("hidden");
  let q = event.target.elements.query.value;
  let collection = event.target.elements.collection.value;
  event.preventDefault();
  if (q.length === 0) {
    q = "{}";
  }

  fetch(
    `${window.location.protocol}//${window.location.host}/api/mongo/${collection}?query=${q}`,
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

      document.querySelector("#result").innerHTML = JSON.stringify(data);
      document.querySelector("#spinner").classList.add("hidden");
    })
    .catch((e) => {
      document.querySelector("#spinner").classList.add("hidden");
      alert("Invalid query");
      console.error(e);
    });
}
