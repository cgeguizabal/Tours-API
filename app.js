const express = require('express');

const app = express();

//HARDCODING MONGOOSE CONNECTION
// mongoose.connect(
//   'mongodb+srv://cgeguizabal:Cgeo14051997$&@natours-app.fqpkuls.mongodb.net/natours'
// );
// app.listen('3001', () => {
//   console.log('Server is running');
// });

const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//1 Middlewares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); //middlware to parse JSON data
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint... but it does not do anything yet!');
// });

// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
// );

// ENDPOINTS
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//3 Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

///// 4 START SERVER
module.exports = app;
