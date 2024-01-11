require('dotenv').config();
const express = require('express');
const cors = require('cors');
const restaurantRoute = require('./routes/restaurant');
const userRoute = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/restaurant', restaurantRoute);
app.use('/user',userRoute)
 
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
