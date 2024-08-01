import { createClient } from 'redis';
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

function displaySchoolValue(key){
        client.get(key, (err, value) => {
                if (err) {
                    console.error(`Error getting value for key ${key}:`, err);
                } else {
                    console.log(`${value}`);
                }
        });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
