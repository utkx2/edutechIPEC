const connectDb = require('./db')
const express = require('express');
const app = express();
const port = 3000;
const contentRoutes = require('./routes/ContentRoute')

app.use(express.json());

connectDb();

app.use('/api/auth', require('./auth/auth'));
app.use('/api/content', contentRoutes);

app.listen(port, () => {
    console.log(`app listning at port: ${port}`);
});
