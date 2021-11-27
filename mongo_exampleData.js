// certificate for test
{
  testedPerson: {
    SSN: "756.5000.4000.32",
    firstName: "Palo",
    lastName: "Nelculo",
    birthdate: new Date("2001-04-02"),
    emailAddress: "asd@asd.asd",
    phoneNumber: "0387489237",
    address: "Via dei pali 5, 6593 Cadenazzo",
  },
  emergencyContacts: [{
    SSN: "756.3333.3333.33",
    firstName: "Asd",
    lastName: "Dsa",
    birthdate: new Date("2001-04-02"),
    phoneNumber: "34543534334",
    emailAddress: "dads@sdada.das",
    address: "Via dalle Molle 69, 6900 Lugano"
  }],
  type: "PCR", // "antigen", "rapid", ...
  date: new Date("2021-04-02T13:40:12+0000"),
  diseaseOrAgent: "COVID-19", // "covid-19"
  responsible: "Dr. Or Manno", // name of nurse/doctor
  attendees: ["Bleh Asd"], // names of nurses/doctors
  testedPositive: false,
  entity: "Farmacia Portami via, 6900 Lugano", // "PS OSG", "me", ...
  location: "23.03478, 2.4444", // GPS coords
}
  
// certificate for vaccine
{
  vaccinatedPerson: {
    SSN: "756.3333.3333.33",
    firstName: "Asd",
    lastName: "Dsa",
    birthdate: new Date("2001-04-02"),
    phoneNumber: "34543534334",
    emailAddress: "dads@sdada.das",
    address: "Via dalle Molle 69, 6900 Lugano"
  },
  emergencyContacts: [{
    SSN: "756.5000.4000.32",
    firstName: "Palo",
    lastName: "Nelculo",
    birthdate: new Date("2001-04-02"),
    emailAddress: "asd@asd.asd",
    phoneNumber: "0387489237",
    address: "Via dei pali 5, 6593 Cadenazzo",
  }],
  type: "mRNA", // "mRNA", "to be invented yet", ...
  productName: "COVID-19 Vaccine Moderna", // "COVID-19 Vaccine Moderna"
  manufacturer: "Moderna Biotech Spain, S.L.", // "Moderna Biotech Spain, S.L.", "Pfizer", ...
  diseaseOrAgent: "COVID-19", // "covid-19"
  date: new Date("2021-04-02T13:40:12+0000"),
  doseNumber: 1,
  lotNumber: "123123131",
  responsible: "Dr. Manco Lui", // name of nurse/doctor
  attendees: ["Nonna Papera", "Luigi Igiul"], // names of nurses/doctors
  entity: "Centro Vaccinazioni Lugano", // "PS OSG", "me", ...
  location: "4.2231, 30.3433", // GPS coords
}
