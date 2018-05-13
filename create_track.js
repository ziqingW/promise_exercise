var pgp = require('pg-promise')({});
var db = pgp({
    database: 'album_test',
    user: 'postgres',
    host: 'localhost'
});
var pp = require('prompt-promise');

function repeat(){
    var repeat_p = new Promise((resolve, reject) => {
        pp("More tracks? (yes/any other) ")
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

function create_track() {
    var t_name, a_id;
    pp("Track name? ")
    .then(val => {
      t_name = val;  
      return pp("Album ID? ");
    })
    .then(val => {
        a_id = parseInt(val, 10);
        return pp("Track duration? ");
    })
    .then(val => {
        let m = parseInt(val.slice(0,val.length-3), 10);
        let s = parseInt(val.slice(val.length-2), 10);
        let interval = `PT${m}M${s}S`;
        let attributes = {
            name: t_name,
            artist_id: a_id,
            duration: interval
        };
        db.query('INSERT INTO track VALUES (DEFAULT, ${name}, ${artist_id}, ${duration})', attributes);
        return repeat();
    })
    .then(()=> {
        create_track();
        })
    .catch(err => {
        console.error(err);
    });
}

create_track();