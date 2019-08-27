"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const connect = (url = process.env.DB_URL, opts = {}) => {
  return _mongoose.default.connect(url, { ...opts,
    useNewUrlParser: true
  });
};

exports.connect = connect;