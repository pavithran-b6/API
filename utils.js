const { error } = require('console');
const fs = require('fs');

function writedatatofile(filename,content){
    try {
        fs.writeFileSync(filename, content, 'utf8');
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    writedatatofile
}