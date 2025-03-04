using Microsoft.AspNetCore.SignalR;
using SignalR.Server.Entities;
using SignalR.Server.MongoDB;

namespace SignalR.Server.Hubs;

public class UserHub : Hub
{
    private readonly UserCountService _userCountService;
    private static int TotalViews { get; set; } = 0;
    private static int TotalUsers { get; set; } = 0;

    public UserHub(UserCountService userCountService)
    {
        _userCountService = userCountService;
        var userCount = _userCountService.GetUserCountAsync().GetAwaiter().GetResult();
        if (userCount == null)
        {
            userCount = new UserCount() { TotalViews = TotalViews }; 
            _userCountService.AddUserCountAsync(userCount).GetAwaiter().GetResult();
        }
        TotalViews = userCount.TotalViews;
    }

    public override Task OnConnectedAsync()
    {
        TotalUsers++;
        Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        TotalUsers--;
        Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
        return base.OnDisconnectedAsync(exception);
    }

    public async Task NewWindowLoaded()
    {
        TotalViews++;
        await _userCountService.UpdateTotalViewsAsync(TotalViews);
        await Clients.All.SendAsync("updateTotalViews", TotalViews);
    }
}