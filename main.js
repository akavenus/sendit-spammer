//module imports
const got = require('got')
const prompt = require('prompt-sync')();

//global functions
function rand(min, max) {return Math.floor(Math.random() * (max - min) + min);}

//global variables
const stickerID = ""
const authorShadowToken = ""
const recipientID = ""
const userAgents = require('./bot-data/user-agents.json')

//main function
async function main(){
    console.clear()
    let message = prompt('Enter the message that you want to spam: ')
    let threads = prompt('Enter the number times you want to send this message: ')
    for (let i = 0; i < threads; i++) {
        sendRequest(message, i)
    }
}

//send request function
async function sendRequest(message, i){
    let formData = JSON.stringify({
        recipient_identity:{
            type: "id",
            value: recipientID
        },
        type:"sendit.post-type:question-and-answer-v1",
        data:{question: message},
        ext_data:{
            sticker_id: stickerID,
            author_shadow_token:authorShadowToken
        },
        timer:"0"
    })
    let postMessage = await got.post('https://api.getsendit.com/v1/posts', {
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'App-ID': 'c2ad997f-1bf2-4f2c-b5fd-83926e8f3c65',
            'App-Version': '1.0',
            'Content-Length': formData.length,
            'Content-Type': 'application/json',
            'Origin': 'https://web.getsendit.com',
            'Referer': 'https://web.getsendit.com/',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'User-Agent': userAgents.windowsChrome[rand(0, userAgents.windowsChrome.length)]
        },
        body: formData
    })
    console.log(`Thread ${i} | ${postMessage.body}`)
}
main()
