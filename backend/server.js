import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleWare.js';


dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

// middleware parsers
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Cookie Parser middleware
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);


app.get('/api/config/paypal', (req, res) =>
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static(path.join(__dirname, 'frontend/build')));

    // any route that is not api will be redirected to index.htnl
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => {
        res.send('API is running');
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log('Server running on port ', PORT))