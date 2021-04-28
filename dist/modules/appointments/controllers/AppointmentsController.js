"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateAppointmentService = _interopRequireDefault(require("../services/CreateAppointmentService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsController {
  async create(request, response) {
    const user_id = request.user.id;
    const {
      provider_id,
      date
    } = request.body;

    const createAppointmentService = _tsyringe.container.resolve(_CreateAppointmentService.default);

    const appointment = await createAppointmentService.execute({
      user_id,
      provider_id,
      date
    });
    return response.json(appointment);
  }

}

exports.default = AppointmentsController;