import express from 'express';

export default class MapServer {
  constructor(planeList) {
    this.planeList = planeList;
    this.server = express();

    this.server.get('/data', (req, res) => {
      res.send(JSON.stringify(this.planeList));
    });
  }

  listen(port) {
    this.server.listen(8080, function () {
      console.log('Map server listening on port 8080');
    });
  }
}
