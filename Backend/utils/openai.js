import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "meta-llama/llama-3-8b-instruct",
            messages: [{
                role: "user",
                content: String(message),
            }]
        })
    }


    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
        const data = await response.json();
        // console.log(data.choices[0].message.content);
        return (data.choices[0].message.content);
    }
    catch (err) {
        console.log(err);
    }
}

export default getOpenAIAPIResponse;