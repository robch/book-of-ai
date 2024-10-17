package main

import (
    "encoding/json"
    "fmt"
    "time"

    "github.com/Azure/azure-sdk-for-go/sdk/ai/azopenai"
    "github.com/Azure/azure-sdk-for-go/sdk/azcore/to"
)

func GetCurrentWeather(functionArguments string) string {
    var args map[string]string
    json.Unmarshal([]byte(functionArguments), &args)
    location, _ := args["location"]
    return fmt.Sprintf("The weather in %s is 72 degrees and sunny.", location)
}

var GetCurrentWeatherSchema = azopenai.FunctionDefinition{
    Name:        to.Ptr("get_current_weather"),
    Description: to.Ptr("Get the current weather in a given location"),
    Parameters: map[string]any{
        "type": "object",
        "properties": map[string]any{
            "location": map[string]any{
                "type":        "string",
                "description": "The city and state, e.g. San Francisco, CA",
            },
        },
        "required": []string{"location"},
    },
}

func GetCurrentDate(_ string) string {
    return time.Now().Format("2006-01-02")
}

var GetCurrentDateSchema = azopenai.FunctionDefinition{
    Name:        to.Ptr("get_current_date"),
    Description: to.Ptr("Get the current date"),
    Parameters: map[string]any{
        "type":       "object",
        "properties": map[string]any{},
    },
}

func GetCurrentTime(_ string) string {
    return time.Now().Format("15:04:05")
}

var GetCurrentTimeSchema = azopenai.FunctionDefinition{
    Name:        to.Ptr("get_current_time"),
    Description: to.Ptr("Get the current time"),
    Parameters: map[string]any{
        "type":       "object",
        "properties": map[string]any{},
    },
}

func NewFunctionFactoryWithCustomFunctions() *FunctionFactory {
    factory := NewFunctionFactory()
    factory.AddFunction(GetCurrentWeatherSchema, GetCurrentWeather)
    factory.AddFunction(GetCurrentDateSchema, GetCurrentDate)
    factory.AddFunction(GetCurrentTimeSchema, GetCurrentTime)
    return factory
}