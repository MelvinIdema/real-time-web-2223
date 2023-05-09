import humanId from 'human-id';

export default class Room {
    constructor({ id = humanId(), status = 'waiting', users = [], messages = [] } = {}) {

        this.id = id;
        this.users = users;
        this.messages = messages;
        this.status = status;
    }

    addMessage(message) {
        this.messages.push(message);
    }

    addUser(user) {
        this.users.push(user);
    }

    removeUser(user) {
        this.users = this.users.filter(u => u.id !== user.id);
    }

    startGame() {
        this.status = 'started';
    }

    toJSON() {
        return {
            id: this.id,
            users: this.users,
            messages: this.messages,
            status: this.status
        }
    }
}