"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: process.env.EMAIL_DEFAULT,
      name: process.env.EMAIL_NAME
    }
  }
};
exports.default = _default;