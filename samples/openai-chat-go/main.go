package main

import (
    "bufio"
    "fmt"
    "log"
    "os"
    "strings"
)

func main() {
    openAIAPIKey := os.Getenv("AZURE_OPENAI_API_KEY")
    if openAIAPIKey == "" {
        openAIAPIKey = "<insert your OpenAI API key here>"
    }
    openAIEndpoint := os.Getenv("AZURE_OPENAI_ENDPOINT")
    if openAIEndpoint == "" {
        openAIEndpoint = "<insert your OpenAI endpoint here>"
    }
    openAIChatDeploymentName := os.Getenv("AZURE_OPENAI_CHAT_DEPLOYMENT")
    if openAIChatDeploymentName == "" {
        openAIChatDeploymentName = "<insert your OpenAI chat deployment name here>"
    }
    openAISystemPrompt := os.Getenv("AZURE_OPENAI_SYSTEM_PROMPT")
    if openAISystemPrompt == "" {
        openAISystemPrompt = "You are a helpful AI assistant."
    }

    if openAIEndpoint == "" || openAIAPIKey == "" || openAIChatDeploymentName == "" || openAISystemPrompt == "" {
        fmt.Println("Please set the environment variables.")
        os.Exit(1)
    }

    chat, err := NewOpenAIChatCompletionsExample(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt)
    if err != nil {
        log.Fatalf("ERROR: %s", err)
    }

    for {
        fmt.Print("User: ")
        input, _ := getUserInput()
        if input == "exit" || input == "" {
            break
        }

        response, err := chat.GetChatCompletions(input)
        if err != nil {
            log.Fatalf("ERROR: %s", err)
        }

        fmt.Printf("Assistant: %s\n\n", response)
    }
}

func getUserInput() (string, error) {
    reader := bufio.NewReader(os.Stdin)
    userInput, err := reader.ReadString('\n')
    if err != nil {
        return "", err
    }
    userInput = strings.TrimSuffix(userInput, "\n")
    userInput = strings.TrimSuffix(userInput, "\r")
    return userInput, nil
}