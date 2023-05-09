export const createRoom = ({ id = null, status = 'waiting', users = [], messages = [] } = {}) => {
    if(!id) throw new Error('Room must have an id');

    return {
        id: id,
        users: users,
        messages: messages,
        status: status
    }
}