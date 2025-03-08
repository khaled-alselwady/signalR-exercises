using System.Text;
using Microsoft.AspNetCore.SignalR;

namespace SignalR.Server.Hubs;

public class HouseGroupHub : Hub
{
    public static List<string> GroupsJoined { get; set; } = new List<string>();

    public async Task JoinGroup(string groupName)
    {
        string key = $"{Context.ConnectionId}:{groupName}";
        if (!GroupsJoined.Contains(key))
        {
            GroupsJoined.Add(key);

            await Clients.Caller.SendAsync("subscriptionStatus", _GetGroupsName(), groupName, true);

            await Clients.Others.SendAsync("subscriptionStatusForOthers", groupName, true);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }
    }

    public async Task LeaveGroup(string groupName)
    {
        string key = $"{Context.ConnectionId}:{groupName}";
        if (GroupsJoined.Contains(key))
        {
            GroupsJoined.Remove(key);

            await Clients.Caller.SendAsync("subscriptionStatus", _GetGroupsName(), groupName, false);

            await Clients.Others.SendAsync("subscriptionStatusForOthers", groupName, false);

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }
    }

    public async Task TriggerNotification(string groupName)
    {
        await Clients.Group(groupName).SendAsync("triggerNotification", groupName);
    }

    private string _GetGroupsName()
    {
        return string.Join(" ",
                GroupsJoined.Select(group => group.Contains(Context.ConnectionId) ? group.Split(':')[1] : string.Empty))
            .Trim();
    }
}