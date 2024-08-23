
import express from  'express';
import dotenv from 'dotenv';
import auth from './routers/authRoute.js';
const app = express();


dotenv.config();
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/auth", auth)

app.listen(5000, () => console.log(`Server is running onn ${PORT}`));
