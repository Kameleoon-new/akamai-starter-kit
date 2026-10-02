/* eslint-disable no-unused-vars */

// TODO: Describe polyfills here if available in the EdgeWorkers scope.
// This will allow Kameleoon SDK to update client configuration at regular intervals.

function setTimeout() {
  return 100;
}

function setInterval() {
  return 200;
}

function clearTimeout() {}
function clearInterval() {}
