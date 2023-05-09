export const createUser = ({id = null, name = 'Anonymous', roomId = null} = {}) => {
    if(!id) throw new Error('User must have an id');

    return {
        id: id,
        name: name,
        roomId: roomId
    }
}