/* eslint-disable no-unused-vars */

// EdgeWorkers has no timer APIs, but the SDK calls them during initialization
// (configuration refresh, data cleanup, request retries). These no-op stubs keep
// it from throwing; since they never fire, main.ts refreshes the configuration
// explicitly via refreshDataFileIfStale().

function setTimeout() {
  return 100;
}

function setInterval() {
  return 200;
}

function clearTimeout() {}
function clearInterval() {}
