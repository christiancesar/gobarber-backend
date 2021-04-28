"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListProviderAppointmentsService = _interopRequireDefault(require("../services/ListProviderAppointmentsService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsController {
  async index(request, response) {
    const provider_id = request.user.id;
    const {
      day,
      month,
      year
    } = request.query;

    const listProviderAppointmentsService = _tsyringe.container.resolve(_ListProviderAppointmentsService.default);

    const appointment = await listProviderAppointmentsService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });
    return response.json(appointment);
  }

}

exports.default = AppointmentsController;