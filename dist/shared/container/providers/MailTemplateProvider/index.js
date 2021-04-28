"use strict";

var _tsyringe = require("tsyringe");

var _HandlebarsMailTemplatProvider = _interopRequireDefault(require("./implementations/HandlebarsMailTemplatProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  handlebarns: _HandlebarsMailTemplatProvider.default
};

_tsyringe.container.registerSingleton('MailTemplateProvider', providers.handlebarns);