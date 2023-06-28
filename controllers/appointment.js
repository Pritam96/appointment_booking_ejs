const Appointment = require('../models/appointment');

exports.getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Home',
    path: '/',
  });
};

exports.getAppointments = (req, res, next) => {
  Appointment.fetchAll()
    .then((data) => {
      res.render('appointments', {
        data: data[0],
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

  const appointment = new Appointment(
    null,
    firstName,
    lastName,
    email,
    phone,
    appointmentDate,
    appointmentTime
  );

  //   console.log(appointment);

  appointment
    .save()
    .then((result) => {
      console.log('Appointment Added');
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

exports.postDeleteAppointment = (req, res, next) => {
  const appointmentId = req.body.appointmentId;
  Appointment.deleteById(appointmentId)
    .then((result) => {
      console.log('Appointment Deleted');
      res.redirect('/appointments');
    })
    .catch((err) => console.log(err));
};

exports.getEditAppointment = (req, res, next) => {
  const appointmentId = req.params.appointmentId;
  Appointment.findById(appointmentId)
    .then(([data]) => {
      const dateInput = new Date(Date.parse(data[0].appointmentDate));
      //   console.log(dateInput.toJSON().slice(0, 10));
      res.render('edit-appointment', {
        data: data[0],
        dateInput: dateInput.toJSON().slice(0, 10),
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

  const updatedAppointment = new Appointment(
    id,
    firstName,
    lastName,
    email,
    phone,
    appointmentDate,
    appointmentTime
  );

  updatedAppointment
    .save()
    .then((result) => {
      console.log('Appointment Edited');
      res.redirect('/appointments');
    })
    .catch((err) => console.log(err));
};
