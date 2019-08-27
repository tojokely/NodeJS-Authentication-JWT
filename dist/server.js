"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _db = require("./utils/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const SERVER_PORT = process.env.SERVER_PORT;
const app = (0, _express.default)();
exports.app = app;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const start = async () => {
  try {
    await (0, _db.connect)();
    app.listen(SERVER_PORT, () => // idk why SERVER_PORT is undefined 👇
    console.log(`Running on http://localhost:${SERVER_PORT}/`));
  } catch (e) {
    console.error(e);
  }
};

exports.start = start;