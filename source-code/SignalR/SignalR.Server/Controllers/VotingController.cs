using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR.Server.Entities;
using SignalR.Server.Hubs;
using SignalR.Server.MongoDB;

namespace SignalR.Server.Controllers;

[ApiController]
[Route("api/voting")]
public class VotingController : ControllerBase
{
    private readonly IHubContext<VotingHub> _hubContext;
    private readonly VotingService _votingService;

    public VotingController(IHubContext<VotingHub> hubContext, VotingService votingService)
    {
        _hubContext = hubContext;
        _votingService = votingService;
    }

    [HttpGet]
    public async Task<ActionResult> VotingCount(string type)
    {
        var voting = await _votingService.GetVotingCountAsync();

        if (voting == null)
        {
            voting = new Voting();
            
            _UpdateVotingCount(voting, type);
            await _votingService.AddVotingCountAsync(voting);
        }
        else
        {
            _UpdateVotingCount(voting, type);
            await _votingService.UpdateVotingCountAsync(voting);
        }

        await _hubContext.Clients.All.SendAsync("updateVotingCount", voting.Cloak, voting.Stone, voting.Wand);

        return Ok();
    }

    private void _UpdateVotingCount(Voting voting, string type)
    {
        switch (type.ToLower())
        {
            case "cloak":
                voting.Cloak++;
                break;

            case "stone":
                voting.Stone++;
                break;

            case "wand":
                voting.Wand++;
                break;
        }
    }
}