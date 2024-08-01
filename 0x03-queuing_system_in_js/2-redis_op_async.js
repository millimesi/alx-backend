import { createClient } from 'redis';
import { promisify } from 'util';
import redis from 'redis';

const client = createClient();

client.on('connect', function() {
        console.log('Redis client connected to the server');
});
client.on('error', (err) => {
        console.log(`Redis client not connected to the server: ${err}`);
});

function setNewSchool(key, value){
        client.set(key, value, redis.print);
}

const getAsync = promisify(client.get).bind(client);

async function displaySchoolValue(key){
        const value = await getAsync(key);
        console.log(value)
}

async function run() {
        await displaySchoolValue('Holberton');
        setNewSchool('HolbertonSanFrancisco', '100');
        await displaySchoolValue('HolbertonSanFrancisco');
}
run();
