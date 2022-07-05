const fs = require('fs');
exports.Provider = {
    get: () => {
        let file = './Database/Models/Graph.json';
        let result = fs.readFileSync(file);
        return JSON.parse(result)
    }
}