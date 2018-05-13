function addNumbers (a, b) {
    var p = new Promise ( (resolve, reject) => {
        if (!isNaN(a) && !isNaN(b)) {
            resolve(a + b);
        }else {
            reject();
        }
    });
    return p;
}

addNumbers(10, 123)
    .then( value => {
        console.log(value);
    })
    .catch( () => {
        console.log("They are not all numbers!");
    });