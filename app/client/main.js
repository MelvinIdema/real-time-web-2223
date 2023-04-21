import './assets/style.css'
import { io } from 'socket.io-client';
const socket = io();

const form = document.querySelector('form');

function onFormSubmit(event) {
    event.preventDefault();
    const input = document.querySelector('input');
    const value = input.value;
    socket.emit('chat message', value);
    input.value = '';
}

function onMessageReceived(message) {
    const messagesEl = document.querySelector('.messages');
    const messageEl = document.createElement('li');
    messageEl.innerText = message;
    messagesEl.appendChild(messageEl);
}


form.addEventListener('submit', onFormSubmit);
socket.on('chat message', onMessageReceived);