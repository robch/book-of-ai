//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//

using System;

public class OnnxGenAIChatCompletionsCustomFunctions
{
    [HelperFunctionDescription("Gets the current weather for a location.")]
    public static string GetCurrentWeather(string location)
    {
        return $"The weather in {location} is 72 degrees and sunny.";
    }

    [HelperFunctionDescription("Gets the current date.")]
    public static string GetCurrentDate()
    {
        var date = DateTime.Now;
        return $"{date.Year}-{date.Month}-{date.Day}";
    }

    [HelperFunctionDescription("Gets the current time.")]
    public static string GetCurrentTime()
    {
        var date = DateTime.Now;
        return $"{date.Hour}:{date.Minute}:{date.Second}";
    }

    [HelperFunctionDescription("Sends a text message to a contact or a valid phone number.")]
    public static bool SendTextMessage(string nameOrPhone, string message)
    {
        return true;
    }
}