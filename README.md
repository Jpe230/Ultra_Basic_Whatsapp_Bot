# Ultra Basic Whatsapp Boy

This is a light version of a script I made for a TikTok, expect to be errors in the code, I'm too lazy to debug/fix them, PRs are
welcome.

This project uses [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) thus it needs Node.


## Setting up the bot

Clone the repo

```bash
git clone https://github.com/Jpe230/Ultra_Basic_Whatsapp_Bot.git
cd Ultra_Basic_Whatsapp_Bot
```

Install NodeJS using your favorite way

(Example instructions for debian users)
```bash
(sudo) apt(-get) install node
```

Create a .env file inside the repo folder and edit the recipient's number and your schedule time

```bash
touch example.env
echo "RECIPIENT=XXXXXXXXX" > example.env
echo "TIME="* * * * *"" > example.env
```

Install dependecies and start the script using

```bash
npm install && node index.js
```

## Contributing to the project

I made this just for fun, I don't expect to update this code, but PR's are welcome.
