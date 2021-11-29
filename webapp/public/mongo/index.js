const password = window.localStorage.getItem("neo4covid_password");

function formatPersonInfo(person) {
  return (
    "<ul>" +
    `<li><b>SSN</b>: ${person.SSN}</li>` +
    `<li><b>Name</b>: ${person.lastName} ${person.firstName}</li>` +
    `<li><b>Birth date</b>: ${new Date(
      person.birthdate
    ).toLocaleDateString()}</li>` +
    `<li><b>Email</b>: <a href="mailto:${person.emailAddress}">${person.emailAddress}</a></li>` +
    `<li><b>Phone</b>: <a href="tel:${person.phoneNumber}">${person.phoneNumber}</a></li>` +
    `<li><b>Address</b>: ${person.address}</li>` +
    "</ul>"
  );
}

function buildTestsTable(data) {
  let builder =
    "<table><tr>" +
    "<th>Person</th>" +
    "<th>Type</th>" +
    "<th>Date</th>" +
    "<th>Disease</th>" +
    "<th>Tested positive</th>" +
    "<th>Responsible</th>" +
    "<th>Attendees</th>" +
    "<th>Entity</th>" +
    "<th>Location</th>" +
    "<th>Emergency contacts</th>" +
    "<th>Download</th>" +
    "</tr>\n";
  data.forEach((item) => {
    builder +=
      "<tr>" +
      `<td>${formatPersonInfo(item.testedPerson)}</td>` +
      `<td>${item.type}</td>` +
      `<td>${new Date(item.date).toLocaleString()}</td>` +
      `<td>${item.diseaseOrAgent}</td>` +
      `<td>${item.testedPositive ? "Positive" : "Negative"}</td>` +
      `<td>${item.responsible}</td>` +
      `<td><ul>${item.attendees.map((a) => `<li>${a}</li>`)}</ul></td>` +
      `<td>${item.entity}</td>` +
      `<td>${item.location}</td>` +
      `<td><ul>${item.emergencyContacts.map(
        (p) => `<li>${formatPersonInfo(p)}</li>`
      )}</ul></td>` +
      `<td><button id="pdf_${item._id}" class="certificateBtn">PDF</button></td>` +
      "</tr>";
  });
  builder += "</table>";

  document.querySelector("#result").innerHTML = builder;
  data.forEach((item) => {
    const button = document.getElementById(`pdf_${item._id}`);
    if (!button) {
      return;
    }
    button.addEventListener("click", (event) => {
      event.preventDefault();
      generateTestCertificate(item);
    });
  });
}

function buildVaccinesTable(data) {
  let builder =
    "<table><tr>" +
    "<th>Person</th>" +
    "<th>Type</th>" +
    "<th>Product name</th>" +
    "<th>Manufacturer</th>" +
    "<th>Disease</th>" +
    "<th>Date</th>" +
    "<th>Dose number</th>" +
    "<th>Lot number</th>" +
    "<th>Responsible</th>" +
    "<th>Attendees</th>" +
    "<th>Entity</th>" +
    "<th>Location</th>" +
    "<th>Emergency contacts</th>" +
    "<th>Download</th>" +
    "</tr>\n";
  data.forEach((item) => {
    builder +=
      "<tr>" +
      `<td>${formatPersonInfo(item.vaccinatedPerson)}</td>` +
      `<td>${item.type}</td>` +
      `<td>${item.productName}</td>` +
      `<td>${item.manufacturer}</td>` +
      `<td>${item.diseaseOrAgent}</td>` +
      `<td>${new Date(item.date).toLocaleString()}</td>` +
      `<td>${item.doseNumber}</td>` +
      `<td>${item.lotNumber}</td>` +
      `<td>${item.responsible}</td>` +
      `<td><ul>${item.attendees.map((a) => `<li>${a}</li>`)}</ul></td>` +
      `<td>${item.entity}</td>` +
      `<td>${item.location}</td>` +
      `<td><ul>${item.emergencyContacts.map(
        (p) => `<li>${formatPersonInfo(p)}</li>`
      )}</ul></td>` +
      `<td><button id="pdf_${item._id}" class="certificateBtn">PDF</button></td>` +
      "</tr>";
  });
  builder += "</table>";

  document.querySelector("#result").innerHTML = builder;
  data.forEach((item) => {
    const button = document.getElementById(`pdf_${item._id}`);
    if (!button) {
      return;
    }
    button.addEventListener("click", (event) => {
      event.preventDefault();
      generateVaccineCertificate(item);
    });
  });
}

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

      switch (collection) {
        case "tests":
          buildTestsTable(data);
          break;
        case "vaccines":
          buildVaccinesTable(data);
          break;
      }
      document.querySelector("#spinner").classList.add("hidden");
    })
    .catch((e) => {
      document.querySelector("#spinner").classList.add("hidden");
      alert("Invalid query");
      console.error(e);
    });
}
