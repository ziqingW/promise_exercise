var rp = require('request-promise');
var fs = require('fs');
var urls = [
  'https://en.wikipedia.org/wiki/Futures_and_promises',
  'https://en.wikipedia.org/wiki/Continuation-passing_style',
  'https://en.wikipedia.org/wiki/JavaScript',
  'https://en.wikipedia.org/wiki/Node.js',
  'https://en.wikipedia.org/wiki/Google_Chrome'
];
var promises = [];
for (let i = 0; i < urls.length; i ++) {
    promises.push(rp(urls[i]));
}
Promise.all(promises)
    .then(function(response){
        response.forEach(function(data){
            fs.appendFile('web_scraping.html', data, function(error){
                if (error) {
                    console.error(error.message);
                    return;
                }
                console.log("Done!");
            });
        });
    })
    .catch(function(error){
        console.error(error);
    });