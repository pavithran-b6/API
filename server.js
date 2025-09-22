const http = require('http');
const productcontoller = require('./Controllers/productcontroller');

const products = require('./data/products.json');

const server = http.createServer((req,res) => {
    if(req.method === 'GET' && req.url === '/api/products'){
        productcontoller.getProducts(req,res);
    }
    else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET'){
        const id = req.url.split('/')[3];
        productcontoller.getProduct(req,res,id);
    }
    else if(req.url.match(/\/api\/products\/([0-9a-fA-F\-]+)/) && req.method === 'PUT'){
        const id = req.url.split('/')[3];
        productcontoller.updateProduct(req,res,id);
    }
    else if(req.url.match(/\/api\/products\/([0-9a-fA-F\-]+)/) && req.method === 'DELETE'){
        const id = req.url.split('/')[3];
        productcontoller.deleteProduct(req,res,id);
    }
    else if(req.url === '/api/products' && req.method === 'POST'){
        productcontoller.createProduct(req,res);
    }
    else{
        res.writeHead(404, { "content-type" : 'application/json' });
        res.end(JSON.stringify({
            "status" : "404",
            "Bad Request" : "Route not found"
        }));
    }
})
const port = 3000;
server.listen(port,()=> {
    console.log("Server is listening on port:",port);
})