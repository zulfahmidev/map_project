const readXlsxFile = require('read-excel-file/node');
const path = require('path');

exports.MarkerController = {
    index: (req, res)  => {
        readXlsxFile(process.env.PUBLIC_PATH + 'Data.xlsx').then((rows) => {
            res.send(JSON.stringify({
                message: 'Success',
                status: 200,
                body: rows,
            }));
        })
    },
}