import { marked } from "marked";
import hljs from "highlight.js";

type ThreadItemType = {
  created: number;
  id: string;
  metadata: string;
};

import { OpenAIAssistantsStreamingClass } from "./OpenAIAssistantsStreamingClass";
let assistant: OpenAIAssistantsStreamingClass;
let chatPanel: HTMLDivElement | null;

// NOTE: Never deploy your API Key in client-side environments like browsers or mobile apps
// SEE: https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety

// Which Assistant?
const openAIAssistantId = import.meta.env.ASSISTANT_ID || "<insert your OpenAI assistant ID here>";

// Connection info
const azureOpenAIAPIKey = import.meta.env.AZURE_OPENAI_API_KEY || "<insert your Azure OpenAI API key here>";
const azureOpenAIAPIVersion = import.meta.env.AZURE_OPENAI_API_VERSION || "<insert your Azure OpenAI API version here>";
const azureOpenAIEndpoint = import.meta.env.AZURE_OPENAI_ENDPOINT || "<insert your Azure OpenAI endpoint here>";
const azureOpenAIDeploymentName = import.meta.env.AZURE_OPENAI_CHAT_DEPLOYMENT || "<insert your Azure OpenAI chat deployment name here>";
const openAIAPIKey = import.meta.env.OPENAI_API_KEY || "<insert your OpenAI API key here>";
const openAIOrganization = import.meta.env.OPENAI_ORG_ID || null;
const openAIModelName = import.meta.env.OPENAI_MODEL_NAME || "<insert your OpenAI model name here>";

async function assistantInit(threadId = null) {

  // Check the connection info
  const azureOk = !azureOpenAIAPIKey?.startsWith('<insert') && !azureOpenAIAPIVersion?.startsWith('<insert') && !azureOpenAIEndpoint?.startsWith('<insert') && !azureOpenAIDeploymentName?.startsWith('<insert');
  const openaiOk = !openAIAPIKey?.startsWith('<insert') && !openAIModelName.startsWith('<insert');
  if (!azureOk && !openaiOk) {
    chatPanelAppendMessage('computer', markdownToHtml('To use **OpenAI**, set `OPENAI_API_KEY` and `OPENAI_MODEL_NAME` in `.env`'));
    chatPanelAppendMessage('computer', markdownToHtml('To use **Azure OpenAI**, set `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_API_VERSION`, `AZURE_OPENAI_ENDPOINT`, and `AZURE_OPENAI_CHAT_DEPLOYMENT` in `.env`'));
  }

  // Create the right one based on what is available
  const useAzure = azureOpenAIEndpoint?.startsWith("https://");
  assistant = useAzure
    ? OpenAIAssistantsStreamingClass.createUsingAzure({
        azureOpenAIAPIKey,
        azureOpenAIAPIVersion,
        azureOpenAIEndpoint,
        azureOpenAIDeploymentName,
        openAIAssistantId,
      })
    : OpenAIAssistantsStreamingClass.createUsingOpenAI({
        openAIAPIKey,
        openAIOrganization,
        openAIModelName,
        openAIAssistantId,
      });

  await assistantCreateOrRetrieveThread(threadId);
}

async function assistantProcessInput(userInput: string) {
  const blackVerticalRectangle = "\u25AE"; // Black vertical rectangle ('▮') to simulate an insertion point

  let newMessagePanel = chatPanelAppendMessage("computer", blackVerticalRectangle);
  let completeResponse = "";

  let computerResponse = await assistant.getResponse(
    userInput,
    (response: string) => {
      let atBottomBeforeUpdate = chatPanelIsScrollAtBottom();

      completeResponse += response;
      let withEnding = `${completeResponse}${blackVerticalRectangle}`;
      let asHtml = markdownToHtml(withEnding);

      if (asHtml !== undefined) {
        newMessagePanel.innerHTML = asHtml;

        if (atBottomBeforeUpdate) {
          chatPanelScrollToBottom();
        }
      }
    }
  );

  const chatPanel = chatPanelGetElement();
  newMessagePanel.innerHTML =
    markdownToHtml(computerResponse) ||
    computerResponse.replace(/\n/g, "<br/>");
  chatPanel!.scrollTop = chatPanel!.scrollHeight;

  await threadItemsCheckIfUpdatesNeeded(userInput, computerResponse);
}

async function assistantCreateOrRetrieveThread(threadId: string | null = null) {
  if (threadId === null) {
    await assistant.getOrCreateThread();
  } else {
    await assistant.retrieveThread(threadId);
    await assistant.getThreadMessages((role, content) => {
      let html = markdownToHtml(content) || content.replace(/\n/g, "<br/>");
      role = role === "user" ? "user" : "computer";
      console.log(`role: ${role}, content: ${content}`);
      chatPanelAppendMessage(role, html);
    });
  }
}

function chatPanelGetElement() {
  return document.querySelector("#chatPanel");
}

function chatPanelAppendMessage(sender, message) {
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

function chatPanelIsScrollAtBottom() {
  let chatPanel = chatPanelGetElement();
  if (chatPanel) {
    let atBottom =
      Math.abs(
        chatPanel.scrollHeight - chatPanel.clientHeight - chatPanel.scrollTop
      ) < 1;
    return atBottom;
  }
  return 0;
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
    chatPanel.innerHTML = "";
  }
}

function logoGetElement() {
  return document.querySelector<HTMLImageElement>("#logo");
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
      let hl =
        lang === undefined || lang === ""
          ? hljs.highlightAuto(code).value
          : hljs.highlight(lang, code).value;
      return `<div class="hljs">${hl}</div>`;
    },
  });
}

function markdownToHtml(markdownText) {
  try {
    return marked.parse(markdownText);
  } catch (error) {
    return undefined;
  }
}

function themeInit() {
  let currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    themeSetDark();
  } else if (currentTheme === "light") {
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
    localStorage.setItem("theme", "light");

    let iconElement = toggleThemeButtonGetElement()?.children[0];
    iconElement?.classList.remove("fa-toggle-on");
    iconElement?.classList.add("fa-toggle-off");
  }
}

function themeSetDark() {
  if (!themeIsDark()) {
    document.body.classList.remove("light-theme");
    localStorage.setItem("theme", "dark");

    let iconElement = toggleThemeButtonGetElement()?.children[0];
    iconElement?.classList.remove("fa-toggle-off");
    iconElement?.classList.add("fa-toggle-on");
  }
}

function toggleThemeButtonGetElement() {
  return document.querySelector("#toggleThemeButton");
}

function toggleThemeButtonInit() {
  let buttonElement = toggleThemeButtonGetElement();
  buttonElement?.addEventListener("click", toggleTheme);
  buttonElement?.addEventListener("keydown", ((event: KeyboardEvent) => {
    if (event.code === "Enter" || event.code === "Space") {
      toggleTheme();
    }
  }) as EventListener);
}

const titleUntitled = "Untitled";

function ThreadItem(id: string, created: number, metadata: string) {
  this.id = id;
  this.created = created;
  this.metadata = metadata;
}

function threadItemIsUntitled(item: ThreadItemType) {
  return item.metadata === titleUntitled;
}

async function threadItemsCheckIfUpdatesNeeded(
  userInput: string,
  computerResponse: string
) {
  const items = threadPanelInit();
  await threadItemsTitleIfUntitled(items, userInput, computerResponse);
}

function threadPanelInit() {
  let items = threadItemsGet();
  threadItemsCheckMoveOrAdd(items);
  return items;
}

function threadItemsCheckMoveOrAdd(items) {
  if (assistant?.thread) {
    threadItemsCheckMoveTop(items, assistant.thread.id);
    threadItemsCheckAddNew(items, assistant.thread.id);
  }
}

function threadItemsCheckMoveTop(items, threadId) {
  let item = items.find((item) => item.id === threadId);
  if (item) {
    threadItemsMoveTop(items, item);
  }
}

function threadItemsMoveTop(items, item) {
  var index = items.indexOf(item);
  if (index !== -1) {
    items.splice(index, 1);
  }
  item.created = Math.floor(Date.now() / 1000);
  items.unshift(item);
  localStorage.setItem("threadItems", JSON.stringify(items));
  threadPanelPopulate(items);
}

function threadItemsCheckAddNew(items: ThreadItemType[], threadId: string) {
  if (items.length === 0 || items[0].id !== threadId) {
    threadItemsAddNew(
      items,
      new ThreadItem(threadId, Math.floor(Date.now() / 1000), titleUntitled)
    );
  }
}

function threadItemsAddNew(items, newItem) {
  items.unshift(newItem);
  localStorage.setItem("threadItems", JSON.stringify(items));
  threadPanelPopulate(items);
}

function threadItemsGet(): ThreadItemType[] {
  const threadItemsString = localStorage.getItem("threadItems");
  if (threadItemsString) {
    return JSON.parse(threadItemsString);
  } else {
    return [];
  }
}

function threadItemsLoadFakeData() {
  const today = new Date();
  const yesterday = today.setDate(today.getDate() - 1);
  const thirtyDaysAgo = today.setDate(today.getDate() - 30);

  const fakeThreadItems = [
    new ThreadItem(
      "thread_XTqDWuGXPjsddI1xctQ2ZD4B",
      Math.floor(+today / 1000),
      "Skeleton joke"
    ),
    new ThreadItem(
      "thread_wzmGKFC22PKKcvoDs2zrYLD7",
      Math.floor(yesterday / 1000),
      "Why is the sky blue?"
    ),
    new ThreadItem(
      "thread_IAxIrq4YJmFflA1fraw7iEcI",
      Math.floor(yesterday / 1000),
      "Hello world in C#"
    ),
    new ThreadItem(
      "thread_RAgQWZFf3B3MWjVIpSO6JiRi",
      Math.floor(thirtyDaysAgo / 1000),
      "Thread stuff"
    ),
  ];
  return fakeThreadItems;
}

function threadItemsGetGroupName(timestamp) {
  const now = new Date();
  const itemDate = new Date(timestamp * 1000);
  const isToday = itemDate.toDateString() === now.toDateString();
  const isYesterday =
    itemDate.toDateString() ===
    new Date(new Date().setDate(now.getDate() - 1)).toDateString();
  const isThisWeek = itemDate > new Date(new Date().setDate(now.getDate() - 7));
  const isThisYear = itemDate.getFullYear() === now.getFullYear();

  return isToday
    ? "Today"
    : isYesterday
    ? "Yesterday"
    : isThisWeek
    ? "Previous 7 days"
    : isThisYear
    ? itemDate.toLocaleDateString("en-US", { month: "long" }) // month name
    : itemDate.toLocaleDateString("en-US", { year: "numeric" }); // the year
}

function threadItemsGroupByDate(threadItems) {
  const groupedItems = new Map();

  threadItems.forEach((item) => {
    const group = threadItemsGetGroupName(item.created);
    if (!groupedItems.has(group)) {
      groupedItems.set(group, []);
    }
    groupedItems.get(group).push(item);
  });

  return groupedItems;
}

async function threadItemsTitleIfUntitled(items, userInput, computerResponse) {
  if (threadItemIsUntitled(items[0])) {
    items[0].metadata = await assistant.suggestTitle({
      userInput,
      computerResponse,
    });
    localStorage.setItem("threadItems", JSON.stringify(items));
    threadPanelPopulate(items);
  }
}

function threadPanelPopulate(items) {
  // Clear existing content
  const threadPanel = document.querySelector("#threadPanel");

  if (threadPanel === null) {
    console.error("Element #threadPanel was not found");
    return;
  }

  threadPanel.innerHTML = "";

  // Group thread items by date
  const groupedThreadItems = threadItemsGroupByDate(items);

  // Iterate over grouped items and populate thread panel
  for (const [date, items] of groupedThreadItems) {
    const dateHeader = document.createElement("div");
    dateHeader.classList.add("threadOnDate");
    dateHeader.textContent = date;
    threadPanel.appendChild(dateHeader);

    const threadsContainer = document.createElement("div");
    threadsContainer.id = "threads";
    threadPanel.appendChild(threadsContainer);

    items.forEach((item) => {
      const button = document.createElement("button");
      button.id = item.id;
      button.classList.add("thread", "w3-button");
      button.addEventListener("click", () => loadThread(button.id));

      const div = document.createElement("div");
      const icon = document.createElement("i");
      icon.classList.add("threadIcon", "fa", "fa-comment");

      div.appendChild(icon);
      div.appendChild(document.createTextNode(item.metadata));
      button.appendChild(div);
      threadsContainer.appendChild(button);
    });
  }
}

function userInputTextAreaGetElement() {
  return document.querySelector<HTMLTextAreaElement>("#userInput");
}

function userInputTextAreaInit() {
  let inputElement = userInputTextAreaGetElement();
  inputElement?.addEventListener("keydown", ((event: KeyboardEvent) => {
    if (event.key === "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    }
  }) as EventListener);
  inputElement?.addEventListener("input", userInputTextAreaUpdateHeight);
}

function userInputTextAreaFocus() {
  let inputElement = userInputTextAreaGetElement();
  inputElement?.focus();
}

function userInputTextAreaClear() {
  const inputElement = userInputTextAreaGetElement();
  if (inputElement) {
    inputElement.value = "";
  }
  userInputTextAreaUpdateHeight();
}

function userInputTextAreaUpdateHeight() {
  const inputElement = userInputTextAreaGetElement();
  if (inputElement !== null) {
    inputElement.style.height = "auto";
    inputElement.style.height = inputElement.scrollHeight + "px";
  }
}

function varsInit() {
  document.addEventListener("DOMContentLoaded", varsUpdateHeightsAndWidths);
  window.addEventListener("resize", varsUpdateHeightsAndWidths);
}

function varsUpdateHeightsAndWidths() {
  let headerHeight =
    document.querySelector<HTMLDivElement>("#header")?.offsetHeight;
  let userInputHeight =
    document.querySelector<HTMLDivElement>("#userInputPanel")?.offsetHeight;
  document.documentElement.style.setProperty(
    "--header-height",
    headerHeight + "px"
  );
  document.documentElement.style.setProperty(
    "--input-height",
    userInputHeight + "px"
  );
}

async function newChat() {
  chatPanelClear();
  logoShow();
  userInputTextAreaFocus();
  await assistantCreateOrRetrieveThread();
}

async function loadThread(threadId) {
  chatPanelClear();
  await assistantCreateOrRetrieveThread(threadId);
  userInputTextAreaFocus();
}

function sendMessage() {
  let inputElement = userInputTextAreaGetElement();
  if (inputElement === null) {
    console.error("Element #userInput was not found");
    return;
  }

  let inputValue = inputElement.value;
  let notEmpty = inputValue.trim() !== "";
  if (notEmpty) {
    let html = markdownToHtml(inputValue) || inputValue.replace(/\n/g, "<br/>");
    chatPanelAppendMessage("user", html);
    userInputTextAreaClear();
    varsUpdateHeightsAndWidths();
    assistantProcessInput(inputValue);
  }
}

async function init() {
  const urlParams = new URLSearchParams(window.location.search);

  themeInit();
  markdownInit();
  userInputTextAreaInit();
  varsInit();
  
  await assistantInit();
  let items: ThreadItemType[] | null = null;

  const fake = urlParams.get("fake") === "true";
  if (fake) {
    items = threadItemsLoadFakeData();
    localStorage.setItem("threadItems", JSON.stringify(items));
  }

  const clear = urlParams.get("clear") === "true";
  if (clear) {
    localStorage.removeItem("threadItems");
    items = [];
  }

  items = items || threadItemsGet();
  threadPanelPopulate(items);

  userInputTextAreaFocus();

  document.querySelector("#newChatButton")?.addEventListener("click", newChat);
  document.querySelector("#sendButton")?.addEventListener("click", sendMessage);
}

window.addEventListener("DOMContentLoaded", init);