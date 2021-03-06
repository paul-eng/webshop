"use strict";
var node_fetch_1 = require("node-fetch");

module.exports = function wakeUp(url, interval, callback) {
  console.log(`Pinging ${url}`)
  var _interval = interval ? interval : 25;
  var milliseconds = _interval * 60000;
  setTimeout(function () {
    try {
      const time = new Date().getHours();
      if (time >= 9) {
        // time >= 9 (and going to 24) is UTC military time equivalent of EDT (5am-8pm)
        console.log(`UTC Time is ${time}, waking up`) 
        node_fetch_1.default(url);
      } else {
        console.log(`UTC Time is ${time}, staying asleep`) 
      }
    } catch (err) {
    } finally {
      try {
        if (callback) {
          callback();
        }
      } catch (e) {
        callback ? console.log("Callback failed: ", e.message) : null;
      } finally {
        return wakeUp(url, _interval, callback);
      }
    }
  }, milliseconds);
};
