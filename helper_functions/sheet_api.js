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

        let labels = [];
        let data = [];
        let title;

        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            labels.push(row['label']);
            data.push(row['data']);
            if (row['title'] === undefined) {
                continue;
            } else {
                title = row['title'];
            }
        };

        return {
            status: 1,
            labels: labels,
            data: data,
            title: title
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