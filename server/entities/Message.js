import {v4} from 'uuid';

export default class Message {

    constructor({id = v4(), content = '', userId = null, userName = 'Anonymous', timeStamp = Date.now()} = {}) {
        this.id = id;
        this.content = content;
        this.userId = userId;
        this.userName = userName;
        this.timeStamp = timeStamp;
    }

    toJSON() {
        return {
            id: this.id,
            content: this.content,
            userId: this.userId,
            userName: this.userName,
            timeStamp: this.timeStamp
        }
    }

}