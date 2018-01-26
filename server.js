var express = require('express'),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
//    json = require('./movies.json'),
    json = require('./timerInfo.json');
    app = express(),
    request = require('request');

app.set('port', process.env.PORT || 3500);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/* // movie code
var router = new express.Router();
router.get('/test', function(req, res) {
    var data = {
        name: 'Jason Krol',
        website: 'http://kroltech.com'
    };

    res.json(data);
});
router.get('/', function(req, res) {
    res.json(json);
});
router.post('/', function(req, res) {
    // insert the new item into the collection (validate first)
    if(req.body.Id && req.body.Title && req.body.Director && req.body.Year && req.body.Rating) {
        json.push(req.body);
        res.json(json);
    } else {
        res.json(500, { error: 'There was an error!' });
    }
});
router.put('/:id', function(req, res) {
    // update the item in the collection
    if(req.params.id && req.body.Title && req.body.Director && req.body.Year && req.body.Rating) {
        _.each(json, function(elem, index) {
            // find and update:
            if (elem.Id === req.params.id) {
                elem.Title = req.body.Title;
                elem.Director = req.body.Director;
                elem.Year = req.body.Year;
                elem.Rating = req.body.Rating;
            }
        });

        res.json(json);
    } else {
        res.json(500, { error: 'There was an error!' });
    }
});
router.delete('/:id', function(req, res) {
    var indexToDel = -1;
    _.each(json, function(elem, index) {
        if (elem.Id === req.params.id) {
            indexToDel = index;
        }
    });
    if (~indexToDel) {
        json.splice(indexToDel, 1);
    }
    res.json(json);
});
// new endpoint that accesses the endpoint of another server, which is actually this server
router.get('/external-api', function(req, res) {
    request({
            method: 'GET',
            uri: 'http://localhost:' + (process.env.PORT || 3500),
        }, function(error, response, body) {
            if (error) { throw error; }

            var movies = [];
            _.each(JSON.parse(body), function(elem, index) {
                movies.push({
                    Title: elem.Title,
                    Rating: elem.Rating
                });
            });
            res.json(_.sortBy(movies, 'Rating').reverse());
        });
});*/

// timer code
var router = new express.Router();
router.get('/test', function(req, res) {
    var data = {
        name: 'callista vojvodich',
        message: 'Here is my attempt to show you that I understand the material presented'
    };

    res.json(data);
});
router.get('/', function(req, res) {
    res.json(json);
});
router.post('/', function(req, res) {
    // insert the new timer into the collection (validate first- ensure all fields are included in request)
    if(req.body.id && req.body.state && req.body.timerName && req.body.doneTime) {
	// if all info is included, put the whole body of the request into the database. it will automatically be parsed, I think
        json.push(req.body);
        res.json(json);
    } else {
        res.json(500, { error: 'Please include all fields!' });
    }
});
router.put('/:id', function(req, res) {
    // update the existing timer in the collection
    if(req.body.id && req.body.state && req.body.timerName && req.body.doneTime) {
	// loop through until find the matching entry for the timer
        _.each(json, function(elem, index) {
            // find and update:
            if (elem.id === req.params.id) {
                elem.state = req.body.state;
                elem.timerName = req.body.timerName;
                elem.doneTime = req.body.doneTime;
            }
        });

        res.json(json);
    } else {
        res.json(500, { error: 'There was an error updating the timer!' });
    }
});
router.delete('/:id', function(req, res) {
    var indexToDel = -1;
    _.each(json, function(elem, index) {
        if (elem.id === req.params.id) {
            indexToDel = index;
        }
    });
    if (~indexToDel) {
        json.splice(indexToDel, 1);
    }
    res.json(json);
});
// new endpoint that accesses the endpoint of another server, which is actually this server
router.get('/external-api', function(req, res) {
    request({
            method: 'GET',
            uri: 'http://localhost:' + (process.env.PORT || 3500),
        }, function(error, response, body) {
            if (error) { throw error; }

            var timers = [];
            _.each(JSON.parse(body), function(elem, index) {
                timers.push({
                    id: elem.id,
                    timerName: elem.timerName,
		    doneTime: elem.doneTime
                });
            });
	    // sorts timers in reverse order of doneTime (ending last to soonest)
            res.json(_.sortBy(timers, 'doneTime').reverse());
        });
});

app.use('/', router);

var server = app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});
