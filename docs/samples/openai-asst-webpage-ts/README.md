# OpenAI Assistant chat website

This is a simple webapp chat interface that uses OpenAI's API to generate text responses to user input.

User input is typed into a text box and added to the conversation as a message inside a chat panel. The panel scrolls up and the computer responds with streaming text output into another message in the chat panel. There is a left nav that has a "new chat" button and has a spot for future expansion w/ a list of historical chats.

## Setup

To build the website, run the following commands:

```bash
npm install
npm start
```

To run the website, launch `index.html` in your browser.

These setup steps are also represented in tasks.json and launch.json, so that you can build and run the website from within VS Code.

## Project structure

| Category | File | Description
| --- | --- | ---
| **SOURCE CODE** | favicon.png | Logo/icon for the website.
| | index.html | HTML file with controls and layout.
| | style.css | CSS file with layout and styling.
| | src/index.ts | Main TS file with DOM interactions.
| | src/OpenAIAssistantsFunctionsStreamingClass.ts | Main TS file with OpenAI interactions.
| | |
| **BUILD + PACKAGING** | .env | Contains the API keys, endpoints, etc.
| | package.json | Contains the dependencies.
| | vite.config.js | The Vite config file.