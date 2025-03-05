namespace SignalR.Server;

public static class SD
{
    static SD()
    {
        VotingKeyValue = new();
        VotingKeyValue.Add(Cloak, 0);
        VotingKeyValue.Add(Stone, 0);
        VotingKeyValue.Add(Wand, 0);
    }
    
    public const string Cloak = "cloak";
    public const string Stone = "stone";
    public const string Wand = "wand";

    public static Dictionary<string, int> VotingKeyValue;

}