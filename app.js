const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const appointmentController = require('./controllers/appointment');
const errorController = require('./controllers/error');

const sequelize = require('./utils/database');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', appointmentController.getIndex);

app.get('/appointments', appointmentController.getAppointments);

app.post('/add-appointment', appointmentController.postAppointment);

app.post('/delete', appointmentController.postDeleteAppointment);

app.get('/edit/:appointmentId', appointmentController.getEditAppointment);

app.post('/edit', appointmentController.postEditAppointment);

app.use(errorController.get404);

const PORT = 4000;

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(PORT, () =>
      console.log(`Server is running on port no: ${PORT}`)
    );
  })
  .catch((err) => console.log(err));
