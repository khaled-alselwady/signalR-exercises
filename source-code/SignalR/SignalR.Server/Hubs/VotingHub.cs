using Microsoft.AspNetCore.SignalR;
using SignalR.Server.Entities;
using SignalR.Server.MongoDB;

namespace SignalR.Server.Hubs;

public class VotingHub : Hub
{
    private readonly VotingService _votingService;

    public VotingHub(VotingService votingService)
    {
        _votingService = votingService;
    }
    
    public async Task<Voting> GetVotingStatus()
    {
        return await _votingService.GetVotingCountAsync();
    }
}