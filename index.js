const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.js');
const Product = require('./models/product.model');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("AAAAAAAA IM IN LONDON!");
});

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});

    }
});

app.get('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});

    }
});

// update product
app.put('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({message: "Product not found"})
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});

    }
});

app.delete('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findById(id, req.body);

        if (!product) {
            return res.status(404).json({message: "Product not found"})
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});

    }
});

const PORT = 3000;

mongoose.connect(config.DBURL)
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });
