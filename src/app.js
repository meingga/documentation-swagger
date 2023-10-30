require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const basicAuth = require('express-basic-auth');

const swaggerDocument = require('../docs/api.json');

const app = express();
const port = process.env.PORT || 3000;
const base_url = process.env.URL || "http://localhost";
const verifyAuth = basicAuth({
    users: { 'fahmifaqih': 'abbcccdddd' },
    challenge: true,
});
// Menggunakan Swagger UI untuk menampilkan dokumentasi
app.use('/docs', verifyAuth, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// default
app.use((req, res) => {
    const data = {
        'Documentation [API]': `${base_url}:${port}/docs/api`
    }

    res.status(404).json(data);
});
app.listen(port, () => {
    console.log(`Server is running on ${base_url}:${port}`);
    console.log(`Documentation [API] on ${base_url}:${port}/docs/api`);
});
