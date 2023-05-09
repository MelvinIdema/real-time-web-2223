import {Circles} from 'react-loader-spinner'

import Poll from '../../components/Poll'
import { socket } from '../../services/socket.js'

import {StyledParagraph, StyledStory, LoaderContainer} from './style.js'

function Story({story, isLoading}) {
    function handlePollItemClick(pollItemIndex) {
        socket.emit('story:vote', pollItemIndex);
    }

    return (<>
        {story && !isLoading ?
            <StyledStory>
                <StyledParagraph>{story.paragraph}</StyledParagraph>
                <Poll options={story.options} onPollItemClick={handlePollItemClick}/>
            </StyledStory>
            :
            <LoaderContainer>
                <Circles
                    height="80"
                    width="80"
                    color="#6d8cfd"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </LoaderContainer>
        }
    </>)
}

export default Story