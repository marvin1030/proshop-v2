import express from 'express';
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

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log('Server running on port ', PORT))