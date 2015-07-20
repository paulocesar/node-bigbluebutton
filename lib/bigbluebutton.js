var _ = require('lodash'),
    Q = require('q'),
    crypto = require('crypto'),
    parser = require('xml2json'),
    utils = require('./utils'),
    validation = require('./validation'),
    http = require('http');

/**
 * bigbluebutton class
 */

/**
 * Url - BigBlueButton server url
 * Salt - BigBlueButton personal secret which can be retrieve runnig bbb-conf --salt within BBB server
 */
var BigBlueButton = function (url, salt) {
    this.url = url;
    this.salt = salt;
};

/**
 * Link
 * returns a link using the URL and salt data.
 * it adds the correct checksum in the end
 * for more information visit: https://code.google.com/p/bigbluebutton/wiki/API
 */

BigBlueButton.prototype.link = function (data) {
    var result = validation.bbb(data),
        action = data.action,
        params = data.params,
        urlParams = '',
        sha1 = crypto.createHash('sha1'),
        key = null;

    if (!result.success) {
        throw new Error(result.message);
    }

    params = params || {};

    _.each(params, function (value, param) {
        if (urlParams) {
            urlParams += '&';
        }

        value = value.toString ? value.toString().replace(/ /g,'+') : '';

        urlParams += param.replace(/ /g,'+') + '=' + value;
    });

    key = sha1.update(action + urlParams + this.salt);

    if(urlParams !== '') {
        urlParams += '&';
    }

    urlParams += 'checksum=' + key.digest('hex');

    return utils.addSlashIfNeed(this.url) + 'api/' + action + '?' + urlParams;
};

/**
 * Request
 * create GET and POST requests for a BigBlueButton server and returns the response
 */

BigBlueButton.prototype.request = function (data, callback) {
    var deferred = Q.defer();
    var link  = this.link(data);

    //creates request options (method,header,body...) and do the request
    options = utils.hostData(link);
    options.method = 'GET';

    body = null;
    if(data.body) {
        body = '<?xml version="1.0" encoding="UTF-8"?>' + parser.toXml(data.body);

        options.method = 'POST';
        options.headers = {
            'Content-Length' : body.length
        };
    }

    var req = http.request(options, function (res) {
        var str = '';

        res.on('data',function (chunk) {
            str += chunk;
        });

        res.on('end',function () {
            deferred.resolve(JSON.parse(parser.toJson(str)));
        });
    });

    req.on('error',function (err) {
        deferred.reject(err);
    });

    if(body)
        req.write(body);

    req.end();

    deferred.promise.nodeify(callback);

    return deferred.promise;
};

module.exports = BigBlueButton;
