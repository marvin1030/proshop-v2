import express from 'express';
import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleWare.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log('Server running on port ', PORT))