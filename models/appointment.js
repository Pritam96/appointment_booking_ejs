const db = require('../utils/database');

module.exports = class Appointment {
  constructor(
    id,
    firstName,
    lastName,
    email,
    phone,
    appointmentDate,
    appointmentTime
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.appointmentDate = appointmentDate;
    this.appointmentTime = appointmentTime;
  }

  save() {
    if (this.id) {
      return db.execute(
        'UPDATE appointments SET firstName = ?, lastName = ?, email = ?, phone = ?, appointmentDate = ?, appointmentTime = ? WHERE appointments.id = ?',
        [
          this.firstName,
          this.lastName,
          this.email,
          this.phone,
          this.appointmentDate,
          this.appointmentTime,
          this.id,
        ]
      );
    } else {
      return db.execute(
        'INSERT INTO appointments (firstName, lastName, email, phone, appointmentDate, appointmentTime) VALUES (?,?,?,?,?,?)',
        [
          this.firstName,
          this.lastName,
          this.email,
          this.phone,
          this.appointmentDate,
          this.appointmentTime,
        ]
      );
    }
  }

  static deleteById(id) {
    return db.execute('DELETE FROM appointments WHERE appointments.id = ?', [
      id,
    ]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM appointments');
  }

  static findById(id) {
    return db.execute('SELECT * FROM appointments WHERE appointments.id = ?', [
      id,
    ]);
  }
};
