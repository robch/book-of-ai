public class OnnxGenAIChatContentMessage
{
    public OnnxGenAIChatContentMessage()
    {
        Role = string.Empty;
        Content = string.Empty;
    }

    public string Role { get; set; }
    public string Content { get; set; }
}