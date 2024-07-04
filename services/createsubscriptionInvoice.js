const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { Pool } = require('pg');
const config = require('../config/config');
const { v4: uuidv4 } = require('uuid');

const pool = new Pool({
    host: config.db.host,
    user: config.db.user,
    port: config.db.port,
    password: config.db.password,
    database: config.db.name,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});

const createInvoice = (invoice, filePath) => {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.pipe(fs.createWriteStream(filePath));
  doc.end();
};

const generateHeader = (doc) => {
  doc
    // .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Crystelgeyser Inc.", 110, 57)
    .fontSize(15)
    .text("Crystelgeyser Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
};

const generateCustomerInformation = (doc, invoice) => {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    // .text("Balance Due:", 50, customerInformationTop + 30)
    // .text(
    //   formatCurrency(invoice.subtotal - invoice.paid),
    //   150,
    //   customerInformationTop + 30
    // )
    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 350, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 350, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country+", "+invoice.shipping.postal_code,
      350,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
};

const generateInvoiceTable = (doc, invoice) => {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Itemname",
    // "Description",
    "From Date",
    "To Date",
    "Total Cost"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.name,
      // item.description,
      item.fromDate,
      item.toDate,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
//   generateTableRow(
//     doc,
//     subtotalPosition,
//     "",
//     "",
//     "Subtotal",
//     "",
//     formatCurrency(invoice.subtotal)
//   );

  const paidToDatePosition = subtotalPosition + 20;
  // generateTableRow(
  //   doc,
  //   paidToDatePosition,
  //   "",
  //   "",
  //   "Paid To Date",
  //   "",
  //   formatCurrency(invoice.paid)
  // );

  // const duePosition = paidToDatePosition + 25;
  // doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Total Amount",
    "",
    formatCurrency(invoice.paid)
  );
  doc.font("Helvetica");
};

const generateFooter = (doc) => {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
};

const generateTableRow = (doc, y, item, description, unitCost, quantity, lineTotal) => {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 340, y)
    .text(unitCost, 390, y, { width: 90, align: "right" })
    .text(quantity, 460, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
};

const generateHr = (doc, y) => {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
};

const formatCurrency = (cents) => {
  return "$" + (cents);
};


const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
};

const getSubscriptionInvoicePdf = async (request, response) => {
  try {
      const invoice = request.body;
      const result = await pool.query('SELECT quantity FROM invoice_number_subscription_table ORDER BY quantity DESC LIMIT 1');
      let lastInvoiceNr = result.rows[0]?.quantity || 0;
      let newInvoiceNr = lastInvoiceNr + 1;

     
      invoice.invoice_nr = newInvoiceNr;
      console.log(invoice.invoice_nr);
      await pool.query('INSERT INTO invoice_number_subscription_table (quantity) VALUES ($1)', [newInvoiceNr]);
      const filePath = path.join(__dirname, '..', 'invoices', `invoice_1234.pdf`);

      
      const directory = path.dirname(filePath);
      if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory, { recursive: true });
      }



      createInvoice(invoice, filePath);
      response.download(filePath, `invoice_1234.pdf`, (err) => {
          if (err) {
              console.error('Error sending the file:', err);
              response.status(500).send('Error sending the file');
          }
      });
  } catch (error) {
      console.error('Error generating invoice PDF', error);
      response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getSubscriptionInvoicePdf
};
