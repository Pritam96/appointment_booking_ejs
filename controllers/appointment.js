const Appointment = require('../models/appointment');

exports.getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Home',
    path: '/',
  });
};

exports.getAppointments = (req, res, next) => {
  Appointment.findAll()
    .then((appointments) => {
      res.render('appointments', {
        data: appointments,
        pageTitle: 'All Appointments',
        path: '/appointments',
      });
    })
    .catch((err) => console.log(err));
};

exports.postAppointment = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const appointmentDate = req.body.dateInput;
  const appointmentTime = req.body.timeInput;

  Appointment.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    appointmentDate: appointmentDate,
    appointmentTime: appointmentTime,
  })
    .then((result) => {
      // console.log(result);
      res.redirect('/appointments');
      console.log('Appointment Created');
    })
    .catch((err) => console.log(err));
};

exports.postDeleteAppointment = (req, res, next) => {
  const appointmentId = req.body.appointmentId;
  Appointment.findByPk(appointmentId)
    .then((appointment) => {
      return appointment.destroy();
    })
    .then((result) => {
      // console.log(result);
      console.log('Appointment Deleted');
      res.redirect('/appointments');
    })
    .catch((err) => console.log(err));
};

exports.getEditAppointment = (req, res, next) => {
  const appointmentId = req.params.appointmentId;
  Appointment.findByPk(appointmentId)
    .then((appointment) => {
      res.render('edit-appointment', {
        data: appointment,
        pageTitle: 'Edit Appointment',
        path: '/edit',
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditAppointment = (req, res, next) => {
  const id = req.body.appointmentId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const appointmentDate = req.body.dateInput;
  const appointmentTime = req.body.timeInput;

  Appointment.findByPk(id)
    .then((appointment) => {
      appointment.firstName = firstName;
      appointment.lastName = lastName;
      appointment.email = email;
      appointment.phone = phone;
      appointment.appointmentDate = appointmentDate;
      appointment.appointmentTime = appointmentTime;

      return appointment.save();
    })
    .then((result) => {
      // console.log(result);
      console.log('Appointment Updated');
      res.redirect('/appointments');
    })
    .catch((err) => console.log(err));
};
