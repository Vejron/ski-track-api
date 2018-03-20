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
            if (!error) {
                var $ = cheerio.load(html);

                var title, release, rating;
                var json = {
                    title: "",
                    release: "",
                    rating: ""
                };

                $('tr.GridViewAltRow, tr.GridViewRow').filter(function () {
                    let data = $(this);
                    
                    console.log(data.children('td').first().text());
                    /*title = data.children().first().text();
                    release = data.children().last().children().text();

                    json.title = title;
                    json.release = release;*/
                })
            }

            // To write to the system we will use the built in 'fs' library.
            // In this example we will pass 3 parameters to the writeFile function
            // Parameter 1 :  output.json - this is what the created filename will be called
            // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
            // Parameter 3 :  callback function - a callback function to let us know the status of our function

            /*fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {

                console.log('File successfully written! - Check your project directory for the output.json file');

            })*/

            // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
            res.send(json)

        });
    });
    /*app.route('/tasks/:taskId')
      .get(todoList.read_a_task)
      .put(todoList.update_a_task)
      .delete(todoList.delete_a_task);*/
};