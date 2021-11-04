const http = require('http');
const httpProxy = require('http-proxy');
const PORT = process.env.PORT || 8000;

var addresses = [
    'https://red1.anem.dz',
    'https://red2.anem.dz',
    'https://red3.anem.dz',
];
const proxy = httpProxy.createProxyServer({ changeOrigin: true });


const server = http.createServer(function (req, res) {
    var target = addresses.shift();

    console.log('balancing request to: ', target);

    proxy.web(req, res, { target });

    addresses.push(target);
});

// proxy.on('proxyRes', function (proxyRes, req, res) {
//     console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
// });

server.listen(PORT, () =>
    console.log(`Listening on port http://localhost:${PORT} `)
);