import fs from 'fs';

module.exports = function(app, passport){
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == `index.js`) return;
        let name = file.substr(0, file.indexOf(`.`));
        require(`./` + name)(app, passport); // eslint-disable-line
    });
};
