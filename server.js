const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xlsx = require('xlsx');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/submitData', (req, res) => {
  const formData = req.body.formData;

  // Read existing data from the file
  let existingData = [];
  try {
    const fileContents = fs.readFileSync('C:/Users/rishabh/Desktop/data.xlsx');
    const workbook = xlsx.read(fileContents, { type: 'buffer' });
    existingData = xlsx.utils.sheet_to_json(workbook.Sheets.Sheet1);
  } catch (error) {
    console.error('Error reading file:', error);
  }

  // Append new data to a new row
  existingData.push({
    name: formData.name,
    billingRuleType: formData.billingRuleType,
    lienTypes: formData.lienTypes,
    collectorSpecific: formData.collectorSpecific,
    firstProductPrice: formData.firstProductPrice,
    firstProductLikelihood: formData.firstProductLikelihood,
    firstProdExpColDate: formData.firstProdExpColDate,
    secondProductPrice: formData.secondProductPrice,
    secondProductLikelihood: formData.secondProductLikelihood,
    secondProdExpColDate: formData.secondProdExpColDate,
    subseqProductPrice: formData.subseqProductPrice,
    subseqProductLikelihood: formData.subseqProductLikelihood,
    subseqProdExpColDate: formData.subseqProdExpColDate,
    pricingTriggers: formData.pricingTriggers,
    billingTriggers: formData.billingTriggers,
    // Add more fields as needed
  });

  // Write data back to the file
  const newWorksheet = xlsx.utils.json_to_sheet(existingData);
  const newWorkbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
  const newData = xlsx.write(newWorkbook, { bookType: 'xlsx', type: 'buffer' });

  fs.writeFileSync('C:/Users/rishabh/Desktop/data.xlsx', newData);

  res.status(200).send('Data submitted and updated successfully');
  console.warn('Submitted');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
