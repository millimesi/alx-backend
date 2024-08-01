import express from 'express';
import { createClient } from 'redis';
import redis from 'redis';
import { promisify } from 'util';
// List of products
const listproducts = [
    {Id: 1, name: "Suitcase 250", price: 50, stock: 4},
    {Id: 2, name: "Suitcase 450", price: 100, stock: 10},
    {Id: 3, name: "Suitcase 650", price: 350, stock: 2},
    {Id: 4, name: "Suitcase 1050", price: 550, stock: 5}
]


// function that returns product with specific Id
function getItemById(id){
    const product = listproducts.find(product => product.Id === id);
    if(! product){
        return JSON.stringify({'Id': id, 'status': 'Not found'});
    }
    return product;
}

const app = express();

app.get('/list_products', (req, res) => {
    res.json(listproducts);
})

app.get('/list_products/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId, 10);
	const product = getItemById(itemId);

	if (!product) {
		return res.status(404).json({ status: 'Product not found' });
	}

	const currentQuantity = await getCurrentReservedStockById(itemId);
	const response = {
		itemId: product.id,
		itemName: product.name,
		price: product.price,
		initialAvailableQuantity: product.stock,
        currentQuantity: currentQuantity !== null ? parseInt(currentQuantity) : product.stock,
	};

    res.status(200).json(response);
})

app.get('/reserve_product/:itemId', async (req, res) => {
	const itemId = parseInt(req.params.itemId, 10);
        const product = getItemById(itemId);

	if (!product) {
                return res.status(404).json({ status: 'Product not found' });
        }

	const currentQuantity = await getCurrentReservedStockById(itemId);
	const availableStock = currentQuantity !== null ? currentQuantity : product.stock;
	if (availableStock < 1) {
		return res.status().json({"status":"Not enough stock available","itemId": itemId});
	}
	reserveStockById(itemId, availableStock - 1);
	return res.status(200).json({"status":"Reservation confirmed","itemId": itemId});
});

app.listen(1245, ()=> {
    console.log("App is running in port 1245");
})

// In stock redis

const client = createClient();

// Connect with the redis
client.on('connect', function() {
    console.log('Redis client connected to the server');
});
client.on('error', function(err) {
    console.log(`Redis client not connected to the server: ${err}`);
});

function reserveStockById(itemId, stock){
    const key = `item.${itemId}`;
    client.set(key, stock, redis.print);
}

const getAsync = promisify(client.get).bind(client);

async function getCurrentReservedStockById(itemId){
    const key = `item.${itemId}`;
    return await getAsync(key);
    
}
