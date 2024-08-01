import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';
import kue from 'kue';



const client = createClient();

client.on('connect', function() {
    console.log('Redis client connected to the server');
});
client.on('error', function(err) {
    console.log(`Redis client not connected to the server: ${err}`);
});

const getAsync = promisify(client.get).bind(client);

function reserveSeat(number) {
  client.set('available_seats', number);
}

async function getCurrentAvailableSeats() {
  const seats = await getAsync('available_seats');
  return parseInt(seats, 10);
}


const queue = kue.createQueue();


let reservationEnabled = true;


const initialSeats = 50;


const app = express();
