export const createMessage = ({id = null, content = '', userId = null, userName ='Anonymous', timeStamp = Date.now(), isMine = false} = {}) => {
    if(!id) throw new Error('Message must have an id');
    if(!content) throw new Error('Message must have content');
    if(!userId) throw new Error('Message must have a user id');

    return {
        id: id,
        content: content,
        userId: userId,
        userName: userName,
        timeStamp: timeStamp,
        isMine: isMine
    }
}