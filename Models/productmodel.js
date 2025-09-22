const products = require("../data/products.json");
const {writedatatofile} = require('../utils');
const {v4 : uuidv4 } = require('uuid');

function fetchAll(){
    return new Promise((resolve,reject) => {
        resolve(products);
    })
}
function fetchOne(id){
    return new Promise((resolve,reject) => {
        const product = products.find((p) => p.id === id);
        resolve(product);
    })
}
function create(product){
    return new Promise((resolve ,reject) => {
        const newprod = { id : uuidv4(), ...product};
        products.push(newprod);
        writedatatofile('./data/products.json',JSON.stringify(products));
        resolve(newprod);
    })
}
function update(id, updatedFields) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
            resolve(null);
        } else {
            products[index] = { ...products[index], ...updatedFields };
            writedatatofile('./data/products.json', JSON.stringify(products));
            resolve(products[index]);
        }
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
            resolve(false);
        } else {
            const deleted = products.splice(index, 1);
            writedatatofile('./data/products.json', JSON.stringify(products));
            resolve(deleted[0]);
        }
    });
}
module.exports = {
    fetchAll,
    fetchOne,
    create,
    update,
    remove
} 