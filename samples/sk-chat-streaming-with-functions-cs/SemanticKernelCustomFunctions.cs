//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//

using System;
using System.ComponentModel;
using Microsoft.SemanticKernel;

public class SemanticKernelCustomFunctions
{
    [KernelFunction, Description("Gets the current weather for a location.")]
    public string GetCurrentWeather(string location)
    {
        return $"The weather in {location} is 72 degrees and sunny.";
    }

    [KernelFunction, Description("Gets the current date.")]
    public string GetCurrentDate()
    {
        var date = DateTime.Now;
        return $"{date.Year}-{date.Month}-{date.Day}";
    }

    [KernelFunction, Description("Gets the current time.")]
    public string GetCurrentTime()
    {
        var date = DateTime.Now;
        return $"{date.Hour}:{date.Minute}:{date.Second}";
    }
}