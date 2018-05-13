var rp = require('request-promise');
var fp = require('fs-extra');

function saveWebPage(url, filename) {
    rp(url)
        .then( response => {
            return response;
        })
        .then( data => {
            fp.writeFile(filename, data);
            })
        .then( () => {
            console.log('Success!');
        })
        .catch( error => {
            console.error(error.message);
        });
}

saveWebPage('https://www.google.com', 'google_test.html');