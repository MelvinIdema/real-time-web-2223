import {StartPageContainer} from './StartPage.style'

function StartPage() {
return (
        <StartPageContainer>
            <header>
                <h1>Welcome to your Artificial Adventure</h1>
            </header>
            <section>
                <button>Create a new adventure</button><br/><br/>
                <input type="text" placeholder="Room ID"/>
                <button>Join an existing adventure</button>

            </section>
        </StartPageContainer>
    )
}

export default StartPage;