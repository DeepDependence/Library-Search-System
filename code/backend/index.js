var config = require('./config/config.json')
var process = require('process')
var express = require('express');
var app = express();
var mysql = require('mysql');

var port = 4000;
if (process.argv.length > 2)
    port = process.argv[2];


console.log("The connection info is: " + config);

// Get books from the mysql DB
function getBooks(keyword, callback) {
    var con = mysql.createConnection(config);
    con.connect(function(err) {
        if (err) throw err;
        sql = "select * from book where concat(title, description, author)  like ?";
        con.query(sql, ['%' + keyword + '%'], function (err, result, fields) {
            if (err) throw err;
            callback & callback(result);
            con.end();
        });
    });
    con.on('error', function() {
        console.log('mysql connection error!');
        conn.end();
    });
}

// Save the search record to mysql database
function recordSearch(ip, keyword, hit, time) {
    var con = mysql.createConnection(config);
    con.connect(function(err) {
        if (err) throw err;
        sql = "insert into search_log (keyword, hit, ip, search_time) values(?, ?, ?, ?)";
        time.setMilliseconds(0);
        con.query(sql, [keyword, hit, ip, time], function (err, result, fields) {
            if (err) {
                console.log('failed to log search data:' + keyword + ', hit:' + hit + ', at: ' + time);
                throw err;
            }
            console.log('success to log search data:' + keyword + ', hit:' + hit + ', at: ' + time);
            con.end();
        });
    });
    con.on('error', function() {
        console.log('mysql connection error!');
        conn.end();
    });
}

app.use('/', express.static('static'));

var router = express.Router();
router.use(express.json());
router.route('/')
    .get((req, res) => {
        var rawKey = req.query.keyword, keys = [];
        if (rawKey) {
            keys = rawKey.toLowerCase().split(',');
        }

        getBooks("%" + keys.join("%") + "%", function(books) {
            console.log('[debug]: found ' + books.length + ' books');
            recordSearch(req.ip, rawKey.replace(',', ' '), books.length, new Date());
            res.send(books.slice(0, 11)); // only return top 10
        });
    });

app.use('/api/books', router);

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port ${port}`);
});
