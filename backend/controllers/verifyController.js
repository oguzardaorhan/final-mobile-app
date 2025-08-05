// controllers/verifyController.js

exports.verifyCase = (req, res) => {
    const { type, caseNumber } = req.body;

    // Check if required fields are present
    if (!type || !caseNumber) {
        return res.status(400).json({
            valid: false,
            message: 'Missing case type or case number.'
        });
    }

    // Sample mock case numbers for validation
    const validCaseNumbers = ['123456', 'ABC987', 'CASE001'];

    const isValid = validCaseNumbers.includes(caseNumber);

    return res.status(200).json({
        valid: isValid,
        message: isValid
            ? `Case found in ${type} system.`
            : `Case not found in ${type} system.`
    });
};
