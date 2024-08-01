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

client.hset('HolbertonSchools', 'Portland', 50, redis.print);
client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
client.hset('HolbertonSchools', 'New York', 20, redis.print);
client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
client.hset('HolbertonSchools', 'Cali', 40, redis.print);
client.hset('HolbertonSchools', 'paris', 2, redis.print);

client.hgetall('HolbertonSchools', (err, data) => {
        if (err){
                console.log(err);
        } else {
                console.log(data);
        }
});
