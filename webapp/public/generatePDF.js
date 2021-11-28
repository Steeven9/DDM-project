// const test = {
//     "testedPerson": {
//       "SSN": "756.5000.4000.32",
//       "firstName": "Palo",
//       "lastName": "Nelculo",
//       "birthdate": 986169600000,
//       "emailAddress": "asd@asd.asd",
//       "phoneNumber": "0387489237",
//       "address": "Via dei pali 5, 6593 Cadenazzo"
//     },
//     "emergencyContacts": [{
//       "SSN": "756.3333.3333.33",
//       "firstName": "Asd",
//       "lastName": "Dsa",
//       "birthdate": 986169600000,
//       "phoneNumber": "34543534334",
//       "emailAddress": "dads@sdada.das",
//       "address": "Via dalle Molle 69, 6900 Lugano"
//     }],
//     "type": "PCR",
//     "date": 1617370812000,
//     "diseaseOrAgent": "COVID-19",
//     "responsible": "Dr. Or Manno",
//     "attendees": ["Bleh Asd"],
//     "testedPositive": false,
//     "entity": "Farmacia Portami via, 6900 Lugano",
//     "location": "23.03478, 2.4444"
//   };

// const vaccine = {
//     "vaccinatedPerson": {
//       "SSN": "756.3333.3333.33",
//       "firstName": "Asd",
//       "lastName": "Dsa",
//       "birthdate": 986169600000,
//       "phoneNumber": "34543534334",
//       "emailAddress": "dads@sdada.das",
//       "address": "Via dalle Molle 69, 6900 Lugano"
//     },
//     "emergencyContacts": [{
//       "SSN": "756.5000.4000.32",
//       "firstName": "Palo",
//       "lastName": "Nelculo",
//       "birthdate": 986169600000,
//       "emailAddress": "asd@asd.asd",
//       "phoneNumber": "0387489237",
//       "address": "Via dei pali 5, 6593 Cadenazzo"
//     }],
//     "type": "mRNA",
//     "productName": "COVID-19 Vaccine Moderna",
//     "manufacturer": "Moderna Biotech Spain, S.L.",
//     "diseaseOrAgent": "COVID-19",
//     "date": 1617370812000,
//     "doseNumber": 1,
//     "lotNumber": "123123131",
//     "responsible": "Dr. Manco Lui",
//     "attendees": ["Nonna Papera", "Luigi Igiul"],
//     "entity": "Centro Vaccinazioni Lugano",
//     "location": "4.2231, 30.3433"
//   };

const qrCodeGenerator = (url) => {
    const cv =  document.createElement('canvas');
    const qrCode =  new QRious({
        element: cv,
        size: 100,
        value: url
    });

    const imgQrCode = cv.toDataURL('image/png');

    return imgQrCode
}


function generateTestCertificate (data) {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    const birthdate = new Date(data.testedPerson.birthdate);
    const testDate = new Date(data.date);
    const url = 'https://rr.noordstar.me/30726119';
    
    const personString = `
    ${data.testedPerson.firstName } ${data.testedPerson.lastName} ${birthdate.getDay()}.${birthdate.getMonth()}.${birthdate.getYear()}
    Address: ${data.testedPerson.address}
    Email: ${data.testedPerson.emailAddress}
    Phone n.: ${data.testedPerson.phoneNumber}
    `;

    const testString = `
    Test type  ${data.type}
    Date ${testDate.getDay()}.${testDate.getMonth()}.${testDate.getYear()}
    Responsible ${data.responsible}
    Attendees ${data.attendees.join(',')}
    Entity ${data.entity}
    `;


    doc.setFont('Fira Sans');
    doc.setFontSize(12);
    doc.addImage(logoImg, 'JPEG', 10, 10, pageWidth, 50);
    doc.text('COVID-19 Certificate', pageWidth / 2, 80, {align: 'center'});
    doc.text('Person', margin, 120)
    doc.text(personString, margin + 10, 120, {lineHeightFactor: 2, charSpace: 0.5});
    doc.line(margin, 145, pageWidth - margin, 145, 'F');
    doc.text('Test', margin, 152)
    doc.text(testString, margin + 10, 152);
    doc.addImage(qrCodeGenerator(url), 'JPEG', margin, 182, pageWidth/3, pageWidth/3);
    doc.save("a4.pdf");
}

const margin = 10;

function generateVaccineCertificate (data) {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    const birthdate = new Date(data.vaccinatedPerson.birthdate);
    const vaccineDate = new Date(data.date);
    const url = 'https://rr.noordstar.me/30726119';


    const personString = `
    ${data.vaccinatedPerson.firstName } ${data.vaccinatedPerson.lastName} ${birthdate.getDay()}.${birthdate.getMonth()}.${birthdate.getYear()}
    Address: ${data.vaccinatedPerson.address}
    Email: ${data.vaccinatedPerson.emailAddress}
    Phone n.: ${data.vaccinatedPerson.phoneNumber}
    `;

    const testString = `
    Vaccine type  ${data.type}
    Product ${data.productName}
    Manufacturer ${data.manufacturer}
    Date ${vaccineDate.getDay()}.${vaccineDate.getMonth()}.${vaccineDate.getYear()}
    Responsible ${data.responsible}
    Attendees ${data.attendees.join(',')}
    Entity ${data.entity}
    Dose ${data.doseNumber}
    Lot n. ${data.lotNumber}
    `;


    doc.setFont('Fira Sans');
    doc.setFontSize(12);
    doc.addImage(logoImg, 'JPEG', 10, 10, pageWidth, 50);
    doc.text('COVID-19 Certificate', pageWidth / 2, 80, {align: 'center'});
    doc.text('Person', margin, 100)
    doc.text(personString, margin + 10, 100, {lineHeightFactor: 2, charSpace: 0.5});
    doc.line(margin, 125, pageWidth - margin, 127, 'F');
    doc.text('Vaccine', margin, 132)
    doc.text(testString, margin + 10, 132);
    doc.addImage(qrCodeGenerator(url), 'JPEG', margin, 152, pageWidth/3, pageWidth/3);
    doc.save("a4.pdf");
}

function generatePDF (data) {
    //generateTestCertificate(test);
    //generateVaccineCertificate(vaccine);

    if (data.testedPerson) {
        generateTestCertificate(data);
    } else {
        generateVaccineCertificate(data);
    }
}