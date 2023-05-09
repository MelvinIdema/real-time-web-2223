import * as dotenv from 'dotenv'

dotenv.config();
import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

const systemMessage = {
    "role": "system",
    "content": `
        You're an Artificial Intelligence model trained in text-based adventure games. You will start with a randomly generated introduction of a text-based adventure game and provide three (3) options to continue. Your answers should be in JSON code as if it is a response of an API. The following is an example of a response:

\`\`\`
{
    "paragraph" = "One fateful day, while wandering through the woods, Amara stumbled upon a hidden cave. Inside, she found an ancient tome written in a language she didn’t recognize. As she read through the pages, a strange sensation coursed through her body.",
    "options" = [
        {
            "text": "Continue reading",
            "votedUsers": []
        },
        {
            "text": "Close the book",
            "votedUsers": []
        },
        {
            "text": "Leave the cave",
            "votedUsers": []
        }
    ]
}
\`\`\`

Every response after the first message is one of the options. You will respond with a follow-up of the story which should not be longer than 1 paragraph. You will also add 3 options to continue. This will be in JSON format too. The following is an example:

Leave the cave

\`\`\`
{
    "paragraph" = "As Amara stepped out of the cave, the world around her seemed different. Colors were more vibrant, scents were stronger, and the sounds of the forest were clearer. She felt a surge of energy coursing through her veins and a heightened sense of awareness. ",
    "options" = [
        {
            "text": "Amara seeks translator for ancient tome.",
            "votedUsers": []
        },
        {
            "text": "Amara unlocks magic in ancient tome.",
            "votedUsers": []
        },
        {
            "text": "Amara faces danger with ancient tome.",
            "votedUsers": []
        }
    ]
}
\`\`\`

It will start from now on. REALLY REALLY REALLY REALLY IMPORTANT: Only respond with JSON per example!!! If you don't, the game will break and you will be disqualified. Good luck!`
};

export async function fetchStory({room, message = null} = {}) {
    console.log(room.history);

    if(room.history.length === 0) {
        room.history.push(systemMessage);
    }

    if(message) {
        room.history.push({
            "role": "user",
            "content": message
        });
    }

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: room.history
        });
        const response = completion.data.choices[0].message.content;

        const res = JSON.parse(response);
        room.history.push({
            "role": "assistant",
            "content": JSON.stringify(res)
        });
        return res;
    } catch(err) {
        console.log(err);
        return await fetchStory({room, message})
    }
}
