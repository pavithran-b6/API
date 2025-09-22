const { fetchAll, fetchOne, create, update, remove } = require("../Models/productmodel");

async function getProducts(req,res){
    try{
        const products = await fetchAll();
        res.writeHead(200,{ 'Content-Type' : 'application/JSON' });
        res.write(JSON.stringify(products));
        res.end();
    }
    catch(error){
        console.log(error);
    }
}
async function getProduct(req,res,id){
    try{
        const product = await fetchOne(id);
        if(!product){
            res.writeHead(404,{ 'Content-Type' : 'application/json' });
            res.end(JSON.stringify({
                "message" : "Product not found"
            }));
        }
        else{
            res.writeHead(200,{ 'Content-Type' : 'application/json' });
            res.end(JSON.stringify(product));
        }
    }
    catch(error){
        console.log(error);
    }
}
async function createProduct(req,res){
    try{
        let body = '';
        req.on('data',(chunk) =>{
            body += chunk.toString();
        })
        req.on('end' ,async () => {
            const {name,description,price} = JSON.parse(body)
            const product = {
                name,
                description,
                price
            }
            const prod = await create(product);
            res.writeHead(201,{ 'Content-Type' : 'application/json' })
            res.end(JSON.stringify(prod));
        })
    }
    catch(error){
        console.log(error);
    }
}

async function updateProduct(req, res, id) {
    try {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const updatedFields = JSON.parse(body);
            const updated = await update(id, updatedFields);
            if (!updated) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Product not found' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updated));
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function deleteProduct(req, res, id) {
    try {
        const deleted = await remove(id);
        if (!deleted) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product not found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product deleted', product: deleted }));
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct
    ,updateProduct
    ,deleteProduct
}