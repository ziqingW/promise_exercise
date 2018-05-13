var fp = require('fs-extra');

function cat2 (input_1, input_2, output) {
    var p1 = fp.readFile(input_1);
    var p2 = fp.readFile(input_2);
    Promise.all([p1, p2])
        .then( response => {
            response.forEach( data => {
                fp.appendFile(output, data +'\n');
                console.log("Good!");
            });
        })
        .catch( err => {
            console.error(err.message);
        });
}

cat2('input1.txt', 'input2.txt', 'output.txt');