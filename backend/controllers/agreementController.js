// controllers/agreementController.js

const fs = require('fs');
const path = require('path');

exports.createAgreement = (req, res) => {
    const { parties, summary, conditions, signedBy } = req.body;

    if (!parties || !summary || !conditions || !signedBy) {
        return res.status(400).json({
            status: 'error',
            message: 'All fields (parties, summary, conditions, signedBy) are required.'
        });
    }

    const agreementId = `AG-${Date.now()}`;

    const content = `
Agreement ID: ${agreementId}

Parties Involved:
${parties.map((p, i) => `  ${i + 1}. ${p}`).join('\n')}

Summary:
${summary}

Conditions:
${conditions.map((c, i) => `  - ${c}`).join('\n')}

Signed By: ${signedBy}
Date: ${new Date().toLocaleString()}
    `;

    const agreementDir = path.join(__dirname, '../agreements');
    if (!fs.existsSync(agreementDir)) {
        fs.mkdirSync(agreementDir);
    }

    const filePath = path.join(agreementDir, `${agreementId}.txt`);
    fs.writeFileSync(filePath, content);

    return res.status(200).json({
        status: 'success',
        message: 'Agreement document created successfully.',
        agreementId,
        filePath: `/agreements/${agreementId}.txt`
    });
};
