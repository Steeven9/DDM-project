// certificate for test
{
  _id: ObjectID, // default by mongo
  testedPerson: {
    SSN: String,
    firstName: String,
    lastName: String,
    birthdate: Date,
    emailAddress: String,
    phoneNumber: String,
    address: String,
  },
  emergencyContacts: [{
    SSN: String,
    firstName: String,
    lastName: String,
    birthdate: Date,
    phoneNumber: String,
    emailAddress: String,
    address: String
  }],
  type: String, // "antigen", "rapid", ...
  date: DateTime,
  diseaseOrAgent: String, // "covid-19"
  responsible: String, // name of nurse/doctor
  attendees: [String], // names of nurses/doctors
  testedPositive: Boolean,
  entity: String, // "PS OSG", "me", ...
  location: String, // GPS coords
}

// certificate for vaccine
{
  _id: ObjectID, // default by mongo
  vaccinatedPerson: {
    SSN: String,
    firstName: String,
    lastName: String,
    birthdate: Date,
    emailAddress: String,
    phoneNumber: String,
    address: String,
  },
  emergencyContacts: [{
    SSN: String,
    firstName: String,
    lastName: String,
    birthdate: Date,
    phoneNumber: String,
    emailAddress: String,
    address: String
  }],
  type: String, // "mRNA", "to be invented yet", ...
  productName: String, // "COVID-19 Vaccine Moderna"
  manufacturer: String, // "Moderna Biotech Spain, S.L.", "Pfizer", ...
  diseaseOrAgent: String, // "covid-19"
  date: DateTime,
  doseNumber: int,
  lotNumber: String,
  responsible: String, // name of nurse/doctor
  attendees: [String], // names of nurses/doctors
  entity: String, // "PS OSG", "me", ...
  location: String, // GPS coords
}
