const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://imgur.com/search?q=funny'; 


axios.get(url).then(response => {
    console.log(response.data);
    var $ = cheerio.load(response.data);

    $('img')


})
.catch(error => {
    console.log('error:', error);
})

