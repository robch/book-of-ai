# Program Overview

## Introduction
The `Program.cs` file is a C# application that uses the Microsoft Semantic Kernel to facilitate a conversation between two agents—a CopyWriter and an ArtDirector. The goal of this conversation is to refine and approve a piece of copywriting based on user input. The program uses Azure OpenAI for its chat completions, leveraging environment variables for configuration settings.

## How It Works

### Agents
1. **CopyWriter**: This agent is tasked with refining copy based on user input and its own expertise. It operates under specific instructions that emphasize brevity, focus, and a dry sense of humor.
2. **ArtDirector**: This agent reviews the copy provided by the CopyWriter and gives approval or feedback for further refinement. It operates under instructions inspired by David Ogilvy's principles of copywriting.

### Environment Variables
- `AZURE_OPENAI_SYSTEM_PROMPT`: The system prompt for the Azure OpenAI service.
- `AZURE_OPENAI_API_KEY`: The API key for Azure OpenAI.
- `AZURE_OPENAI_ENDPOINT`: The endpoint URL for Azure OpenAI.
- `AZURE_OPENAI_CHAT_DEPLOYMENT`: The deployment name for Azure OpenAI chat.

These environment variables must be set for the program to function correctly. If they are not set, the program will prompt the user to do so and will not proceed.

### Chat Completion
The chat completion is managed by the `GetChatMessageContentsAsync` method, which sets up the agents, selection strategy, and termination strategy. It utilizes the following components:

- **Kernel Functions**: Custom functions to decide the next agent to take a turn (`PickNextAgentPromptTemplate`) and to determine if the chat is complete (`IsChatDonePromptTemplate`).
- **Selection Strategy**: Determines the next agent to take a turn based on the conversation history.
- **Termination Strategy**: Determines when the chat is complete.

### Execution Flow
1. The user provides input through the console.
2. The `GetChatMessageContentsAsync` method processes the input and manages the conversation between the CopyWriter and ArtDirector agents.
3. The conversation continues until either the ArtDirector approves the copy or a maximum number of iterations is reached.

### Console Output
The program provides real-time console feedback, displaying the conversation between the user, CopyWriter, and ArtDirector.

## Adding a Third Agent
If a third agent, such as an HTML coder, JavaScript coder, or a single code reviewer, needs to be introduced, the following changes would be required:
1. **Define New Agent**: Create new agent instructions and names for the additional agents.
2. **Update Selection Strategy**: Modify the selection strategy to include the new agent and define the rules for their turn-taking.
3. **Update Termination Strategy**: If the new agent's role affects the termination condition, update the termination strategy accordingly.
4. **Instantiate New Agent**: Add the new agent to the `AgentGroupChat` initialization.

For example, if adding an HTML coder and JavaScript coder, you would need to define their respective roles and instructions, update the conversation flow rules, and ensure the termination strategy accounts for these new roles.