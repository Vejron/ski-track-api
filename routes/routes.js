module.exports = function (app) {

    const request = require('request');
    const cheerio = require('cheerio');

    // todoList Routes
    app.route('/tasks').get((req, res) => {

        // The URL we will scrape from - in our example Anchorman 2.

        url = 'http://anlaggningsregister.umea.se/SmsGrupp.aspx?gid=12';

        // The structure of our request call
        // The first parameter is our URL
        // The callback function takes 3 parameters, an error, response status code and the html

        request(url, function (error, response, html) {
            let places = [];

            if (!error) {
                const $ = cheerio.load(html);
    
                $('tr.GridViewAltRow, tr.GridViewRow').each((i, elm) => {
                    info = $(elm).children('td').eq(1).text().trim().split(' ');
                    let date = new Date();
                    if(info.length > 3) {
                        date = Date.parse(info[info.length - 2] + ' ' + info[info.length - 1]);
                    }
                   

                    places.push({
                        track: $(elm).children('td').eq(0).text(),
                        date: date
                    });
                });

                console.log(places);
            }

            res.send(places)
        });
    });
    /*app.route('/tasks/:taskId')
      .get(todoList.read_a_task)
      .put(todoList.update_a_task)
      .delete(todoList.delete_a_task);*/
};