// utils/pdfGenerator.js

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const generateAgreementPDF = (caseData, caseId) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const fileName = `agreement_${caseId}.pdf`;
            const filePath = path.join(__dirname, '../agreements', fileName);
            const writeStream = fs.createWriteStream(filePath);

            doc.pipe(writeStream);

            doc.fontSize(18).text('Agreement Document', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Case ID: ${caseId}`);
            doc.text(`Court: ${caseData.isInCourt}`);
            doc.text(`Police: ${caseData.isInPolice}`);
            doc.text(`File Path: ${caseData.proofFile}`);
            doc.text(`Date: ${new Date().toLocaleString()}`);
            doc.end();

            writeStream.on('finish', () => resolve(fileName));
            writeStream.on('error', (err) => reject(err));

        } catch (err) {
            reject(err);
        }
    });
};

module.exports = generateAgreementPDF;
