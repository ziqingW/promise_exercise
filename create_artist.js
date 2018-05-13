var pgp = require('pg-promise')({});
var db = pgp({
    database: 'album_test',
    host: 'localhost',
    user: 'postgres'
});
var pp = require('prompt-promise');
function repeat(){
    var repeat_p = new Promise((resolve, reject) => {
        pp("More artists? (yes/any other) ")
        .then(val => {
            if (val.toLowerCase() == "yes" || val.toLowerCase() == "y") {
                resolve();
            } else {
                console.log("Bye!");
                pgp.end();
            }
        });
    });
    return repeat_p;
}
function create_artist(){
    var artist_name;
    
    pp("Artist name? ")
    .then( val => {
        artist_name = val;
    })
    .then(() => {
        db.query("INSERT INTO artist VALUES (DEFAULT, ${name})", {name: artist_name});
        return repeat();
    })
    .then(() => {
        create_artist();
    })
    .catch(err => {
        console.error(err);
    });
}

create_artist();