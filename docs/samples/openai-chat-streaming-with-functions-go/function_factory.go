package main

import (
    "github.com/Azure/azure-sdk-for-go/sdk/ai/azopenai"
)

type FunctionInfo struct {
    Schema   azopenai.FunctionDefinition
    Function func(string) string
}

type FunctionFactory struct {
    functions map[string]FunctionInfo
}

func NewFunctionFactory() *FunctionFactory {
    return &FunctionFactory{
        functions: make(map[string]FunctionInfo),
    }
}

func (ff *FunctionFactory) AddFunction(schema azopenai.FunctionDefinition, fun func(string) string) {
    ff.functions[*schema.Name] = FunctionInfo{Schema: schema, Function: fun}
}

func (ff *FunctionFactory) GetFunctionSchemas() []azopenai.FunctionDefinition {
    schemas := []azopenai.FunctionDefinition{}
    for _, functionInfo := range ff.functions {
        schemas = append(schemas, functionInfo.Schema)
    }
    return schemas
}

func (ff *FunctionFactory) TryCallFunction(functionName string, functionArguments string) string {
    functionInfo, exists := ff.functions[functionName]
    if !exists {
        return ""
    }

    return functionInfo.Function(functionArguments)
}