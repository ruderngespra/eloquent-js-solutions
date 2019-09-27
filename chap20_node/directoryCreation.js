const { mkdir } = require('fs').promises;
const { urlPath } = require('./fileServer/server.js');

module.exports = function(request) {
    let path = urlPath(request.url);
    return mkdir(path)
        .then(data => {
            return { status: 200, body: `dir ${request.url} created.` };
        })
        .catch(err => {
            return { status: 500 };
        });
};

/*

Solution Haverbeke:

Haverbeke:
// This code won't work on its own, but is also included in the
// code/file_server.js file, which defines the whole system.

methods.MKCOL = async function(request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    await mkdir(path);
    return {status: 204};
  }
  if (stats.isDirectory()) return {status: 204};
  else return {status: 400, body: "Not a directory"};
};

*/
