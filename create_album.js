var pgp = require('pg-promise')({});
var pp = require('prompt-promise');
var album_name, album_year, artist_id;
var db = pgp({
    database: 'album_test',
    user: 'postgres',
    host: 'localhost'
});
function repeat(){
    var repeat_p = new Promise((resolve, reject) => {
        pp("More albums? (yes/any other) ")
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
function create_album(){
    pp("Album name? ")
    .then(val => {
        album_name = val;
        return pp("Album year? ");
    })
    .then(val => {
        album_year = parseInt(val, 10);
        return pp("Artist ID? ");
    })
    .then(val => {
        artist_id = parseInt(val, 10);
    })
    .then(() => {
        var attributes = {
            name: album_name,
            year: album_year,
            artist: artist_id
        };
        var q = 'INSERT INTO album VALUES (DEFAULT, ${name}, ${year}, ${artist})';
        db.query(q, attributes);
        console.log("OK!");
        return repeat();
    })
    .then(() => {
        create_album();
    })
    .catch( err => {
        console.error(err);
        pgp.end();
    });
}
create_album();