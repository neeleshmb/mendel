/* Copyright 2016, Yahoo Inc.
   Copyrights licensed under the MIT License.
   See the accompanying LICENSE file for terms. */

var oneNumber = require('./some-number');
var util = require('./util');

module.exports = function() {
    var a = [oneNumber()];
    return util.isArray(a) ? a : [];
};
