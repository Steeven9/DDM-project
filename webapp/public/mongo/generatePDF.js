/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const qrCodeGenerator = (url) => {
  const cv = document.createElement("canvas");
  new QRious({
    element: cv,
    size: 100,
    value: url,
  });

  return cv.toDataURL("image/png");
};

const generateCertificate = (type, person, description, url) => {
  const birthdate = new Date(person.birthdate);
  const personDescription =
    `${person.firstName} ${person.lastName} ` +
    `(${birthdate.toLocaleDateString()})\n` +
    `Address: ${person.address}\n` +
    `Email: ${person.emailAddress}\n` +
    `Phone: ${person.phoneNumber}\n`;

  const margin = 10;
  const doc = new jsPDF();
  const pageWidth =
    doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

  doc.setFont("Fira Sans");
  doc.setFontSize(12);
  doc.addImage(logoImg, "JPEG", margin, margin, 221, 36);
  doc.text("COVID-19 Certificate", pageWidth / 2, 80, { align: "center" });
  doc.text("Personal information", margin, 120);
  doc.text(personDescription, margin * 9, 120, {
    lineHeightFactor: 2,
    charSpace: 0.5,
  });
  doc.line(margin, 145, pageWidth - margin, 145, "F");
  doc.text(`${type} information`, margin, 152);
  doc.text(description, margin * 9, 152);
  doc.addImage(
    qrCodeGenerator(url),
    "JPEG",
    margin,
    182,
    pageWidth / 3,
    pageWidth / 3
  );
  doc.save(`${type}-certificate.pdf`);
};

function generateTestCertificate(data) {
  const testDate = new Date(data.date);

  const testString =
    `Test type: ${data.type}\n` +
    `Date: ${testDate.toLocaleString()}\n` +
    `Responsible: ${data.responsible}\n` +
    `Attendees: ${data.attendees.join(",")}\n` +
    `Entity: ${data.entity}\n`;

  const url = `${window.location.protocol}//${window.location.host}/api/mongo/check/tests/${data._id}`;

  generateCertificate("Test", data.testedPerson, testString, url);
}

function generateVaccineCertificate(data) {
  const vaccineDate = new Date(data.date);

  const vaccineDescription =
    `Vaccine type: ${data.type}\n` +
    `Product: ${data.productName}\n` +
    `Manufacturer: ${data.manufacturer}\n` +
    `Date: ${vaccineDate.toLocaleString()}\n` +
    `Responsible: ${data.responsible}\n` +
    `Attendees: ${data.attendees.join(",")}\n` +
    `Entity: ${data.entity}\n` +
    `Dose: ${data.doseNumber}\n` +
    `Lot: ${data.lotNumber}\n`;

  const url = `${window.location.protocol}//${window.location.host}/api/mongo/check/vaccines/${data._id}`;

  generateCertificate(
    "Vaccine",
    data.vaccinatedPerson,
    vaccineDescription,
    url
  );
}
