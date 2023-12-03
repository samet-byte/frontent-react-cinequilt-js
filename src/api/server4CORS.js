// Author: sametbayat
// Dec 03, 2023 1:29 AM

// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');


const cors = require('cors');
const app = express();

app.use(cors());


const createDynamicProxy = target => {
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        secure: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        onProxyRes: (proxyRes, req, res) => {
            console.log('Proxy Response Headers:', proxyRes.headers);
            console.log('Proxy Response Status:', proxyRes.statusCode);
        },
        onError: (err, req, res) => {
            console.error('Proxy Error:', err);
            res.status(500).send('Proxy Error');
        },
    });
};

// Use the dynamic proxy middleware for all routes
app.use('/:endpoint', (req, res, next) => {
    const dynamicProxyMiddleware = createDynamicProxy(
        // getDynamicTargetURL()
        // "http://192.168.1.8:9876"
        encodeURIComponent(req.params.endpoint)
    ); // Implement getDynamicTargetURL() based on your logic
    dynamicProxyMiddleware(req, res, next);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});