import {v4} from 'uuid';

export default class User {
    constructor({id = v4(), name = 'Anonymous', roomId = null} = {}) {
        this.id = id;
        this.name = name;
        this.roomId = roomId;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            roomId: this.roomId
        }
    }

}