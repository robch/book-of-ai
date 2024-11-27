import { marked } from "marked"
import hljs from "highlight.js";

import { OpenAIChatCompletionsStreamingClass } from './OpenAIChatCompletionsStreamingClass';
let streamingChatCompletions: OpenAIChatCompletionsStreamingClass | undefined;

function streamingChatCompletionsInit(): void {

  const openAIAPIKey = process.env.AZURE_OPENAI_API_KEY || "<insert your OpenAI API key here>";
  const openAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT || "<insert your OpenAI endpoint here>";
  const openAIChatDeploymentName = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT || "<insert your OpenAI deployment name here>" ;
  const openAISystemPrompt = process.env.AZURE_OPENAI_SYSTEM_PROMPT || "You are a helpful AI assistant.";

  if (!openAIAPIKey || openAIAPIKey.startsWith('<insert')) {
    chatPanelAppendMessage('computer', 'Please set AZURE_OPENAI_API_KEY in .env');
  }
  if (!openAIEndpoint || openAIEndpoint.startsWith('<insert')) {
    chatPanelAppendMessage('computer', 'Please set AZURE_OPENAI_ENDPOINT in .env');
  }
  if (!openAIChatDeploymentName || openAIChatDeploymentName.startsWith('<insert')) {
    chatPanelAppendMessage('computer', 'Please set AZURE_OPENAI_CHAT_DEPLOYMENT in .env');
  }

  streamingChatCompletions = new OpenAIChatCompletionsStreamingClass(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt);
}

function streamingChatCompletionsClear(): void {
  streamingChatCompletions!.clearConversation();
}

async function streamingChatCompletionsProcessInput(userInput: string): Promise<void> {
  const blackVerticalRectangle = '\u25AE'; // Black vertical rectangle ('▮') to simulate an insertion point

  let newMessage = chatPanelAppendMessage('computer', blackVerticalRectangle);
  let completeResponse = "";

  let computerResponse = await streamingChatCompletions!.getChatCompletions(userInput, function (response: string) {
    let atBottomBeforeUpdate = chatPanelIsScrollAtBottom();

    completeResponse += response;
    let withEnding = `${completeResponse}${blackVerticalRectangle}`;
    let asHtml = markdownToHtml(withEnding);

    if (asHtml !== undefined) {
      newMessage.innerHTML = asHtml;

      if (atBottomBeforeUpdate) {
        chatPanelScrollToBottom();
      }
    }
  });

  newMessage.innerHTML = markdownToHtml(computerResponse) || computerResponse.replace(/\n/g, '<br/>');
  chatPanelScrollToBottom();
}

function chatPanelGetElement(): HTMLElement | null {
  return document.getElementById("chatPanel");
}

function chatPanelAppendMessage(sender: any, message: string) {
  logoHide();

  let messageContent = document.createElement("p");
  messageContent.className = "message-content";
  messageContent.innerHTML = message;

  let messageAuthor = document.createElement("p");
  messageAuthor.className = "message-author";
  messageAuthor.innerHTML = sender == "user" ? "You" : "Assistant";

  let divContainingBoth = document.createElement("div");
  divContainingBoth.className = sender === "user" ? "user" : "computer";
  divContainingBoth.appendChild(messageAuthor);
  divContainingBoth.appendChild(messageContent);

  let chatPanel = chatPanelGetElement();
  chatPanel?.appendChild(divContainingBoth);
  chatPanelScrollToBottom();

  return messageContent;
}

function chatPanelIsScrollAtBottom(): boolean {
  let chatPanel = chatPanelGetElement();
  let atBottom = chatPanel
    ? Math.abs(chatPanel.scrollHeight - chatPanel.clientHeight - chatPanel.scrollTop) < 1
    : true;
  return atBottom;
}

function chatPanelScrollToBottom() {
  let chatPanel = chatPanelGetElement();
  if (chatPanel) {
    chatPanel.scrollTop = chatPanel.scrollHeight;
  }
}

function chatPanelClear() {
  let chatPanel = chatPanelGetElement();
  if (chatPanel) {
    chatPanel.innerHTML = '';
  }
}

function logoGetElement() {
  return document.getElementById("logo");
}

function logoShow() {
  let logo = logoGetElement();
  if (logo) {
    logo.style.display = "block";
  }
}

function logoHide() {
  let logo = logoGetElement();
  if (logo) {
    logo.style.display = "none";
  }
}

function markdownInit() {
  marked.setOptions({
    highlight: (code: string, lang: string) => {
      let hl = lang === undefined || lang === ''
        ? hljs.highlightAuto(code).value
        : hljs.highlight(lang, code).value;
      return `<div class="hljs">${hl}</div>`;
    }
  });
}

function markdownToHtml(markdownText: string) {
  try {
    return marked.parse(markdownText);
  }
  catch (error) {
    return undefined;
  }
}

function themeInit() {
  let currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    themeSetDark();
  }
  else if (currentTheme === 'light') {
    themeSetLight();
  }
  toggleThemeButtonInit();
}

function themeIsLight() {
  return document.body.classList.contains("light-theme");
}

function themeIsDark() {
  return !themeIsLight();
}

function toggleTheme() {
  if (themeIsLight()) {
    themeSetDark();
  } else {
    themeSetLight();
  }
}

function themeSetLight() {
  if (!themeIsLight()) {
    document.body.classList.add("light-theme");
    localStorage.setItem('theme', 'light');

    let iconElement = toggleThemeButtonGetElement()!.children[0];
    iconElement.classList.remove("fa-toggle-on");
    iconElement.classList.add("fa-toggle-off");
  }
}

function themeSetDark() {
  if (!themeIsDark()) {
    document.body.classList.remove("light-theme");
    localStorage.setItem('theme', 'dark');

    let iconElement = toggleThemeButtonGetElement()!.children[0];
    iconElement.classList.remove("fa-toggle-off");
    iconElement.classList.add("fa-toggle-on");
  }
}

function toggleThemeButtonGetElement() {
  return document.getElementById("toggleThemeButton");
}

function toggleThemeButtonInit() {
  let buttonElement = toggleThemeButtonGetElement();
  buttonElement!.addEventListener("click", toggleTheme);
  buttonElement!.addEventListener('keydown', toggleThemeButtonHandleKeyDown());
}

function toggleThemeButtonHandleKeyDown() {
  return function (event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'Space') {
      toggleTheme();
    }
  };
}

function userInputTextAreaGetElement() : HTMLTextAreaElement | null {
  return document.getElementById("userInput") as HTMLTextAreaElement | null;
}

function userInputTextAreaInit() {
  let inputElement = userInputTextAreaGetElement();
  inputElement!.addEventListener("keydown", userInputTextAreaHandleKeyDown());
  inputElement!.addEventListener("input", userInputTextAreaUpdateHeight);
}

function userInputTextAreaFocus() {
  let inputElement = userInputTextAreaGetElement();
  inputElement!.focus();
}

function userInputTextAreaClear() {
  userInputTextAreaGetElement()!.value = '';
  userInputTextAreaUpdateHeight();
}

function userInputTextAreaUpdateHeight() {
  let userInput = userInputTextAreaGetElement()!;
  let inputElement = userInputTextAreaGetElement();
  inputElement!.style.height = 'auto';
  inputElement!.style.height = (userInput.scrollHeight) + 'px';
}

function userInputTextAreaHandleKeyDown() {
  return function (event: KeyboardEvent) {
    if (event.key === "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    }
  };
}

function varsInit() {
  document.addEventListener('DOMContentLoaded', varsUpdateHeightsAndWidths);
  window.addEventListener('resize', varsUpdateHeightsAndWidths);
}

function varsUpdateHeightsAndWidths() {
  let headerHeight = (document.querySelector('#header') as HTMLElement).offsetHeight;
  let userInputHeight = (document.querySelector('#userInputPanel') as HTMLElement).offsetHeight;
  document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
  document.documentElement.style.setProperty('--input-height', userInputHeight + 'px');
}

function newChat() {
  chatPanelClear();
  logoShow();
  userInputTextAreaFocus();
  streamingChatCompletionsClear();
}

function sendMessage() {
  let inputElement = userInputTextAreaGetElement();
  let inputValue = inputElement!.value;

  let notEmpty = inputValue.trim() !== '';
  if (notEmpty) {
    let html = markdownToHtml(inputValue) || inputValue.replace(/\n/g, '<br/>');
    chatPanelAppendMessage('user', html);
    userInputTextAreaClear();
    varsUpdateHeightsAndWidths();
    streamingChatCompletionsProcessInput(inputValue);
  }
}

themeInit();
markdownInit();
userInputTextAreaInit();
varsInit();
streamingChatCompletionsInit();
userInputTextAreaFocus();

(window as any).sendMessage = sendMessage;
(window as any).toggleTheme = toggleTheme;
(window as any).newChat = newChat;