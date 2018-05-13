var fp = require('fs-extra');
function catNfiles (inputfiles, output) {
    var promises = [];
    inputfiles.forEach( inputfile => {
        promises.push(fp.readFile(inputfile));
    });
    Promise.all(promises)
        .then(responses => {
            responses.forEach(data => {
                fp.appendFile(output, data +"\n"); 
                console.log("Yes!");
            });
        })
        .catch( err => {
            console.error(err.message);
        });
}

catNfiles(['input1.txt', 'input2.txt', 'input3.txt', 'input4.txt'], 'outputN.txt');