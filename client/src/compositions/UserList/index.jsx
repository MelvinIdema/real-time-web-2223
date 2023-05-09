import {useContext} from 'react'
import User from '../../components/User'

import GameContext from '../../providers/GameContext.js'

import {StyledUserList} from './style'

function UserList() {
    const {users} = useContext(GameContext);

    return (
        <StyledUserList>
            {users.map((user, i) => (
                <li key={i}><User name={user.name} /></li>
            ))}
        </StyledUserList>
    );
}

export default UserList;