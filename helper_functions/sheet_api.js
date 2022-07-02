const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const get_data = async (sheet_id, sheet_name) => {

    try {
        
        const doc = new GoogleSpreadsheet(sheet_id, sheet_name)

        await doc.useServiceAccountAuth({
            client_email: CREDENTIALS.client_email,
            private_key: CREDENTIALS.private_key
        });

        await doc.loadInfo();

        let sheet = doc.sheetsByTitle[sheet_name];

        let rows = await sheet.getRows();

        let keys = Object.keys(rows['0'])
        keys = keys.slice(3, keys.length);

        let data = {};

        keys.forEach(key => {
            data[key] = [];
        });

        rows.forEach(row => {
            keys.forEach(key => {
                if (row[key] === undefined) {
                    data[key].push('');
                } else {
                    data[key].push(row[key]);   
                }
            });
        });

        return {
            status: 1,
            data: data
        };
        
    } catch (error) {
        console.log(`Error at getSimpleResponse --> ${error}`);
        return {
            status: 0
        };
    }
};

module.exports = {
    get_data
};