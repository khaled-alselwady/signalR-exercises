using Microsoft.AspNetCore.SignalR;

namespace SignalR.Server.Hubs;

public class NotificationHub : Hub
{
    public static List<string> messages = [];

    public async Task LoadMessages()
    {
        await Clients.All.SendAsync("loadNotification", messages);
    }

    public async Task TriggerNotification(string message)
    {
        if (!string.IsNullOrWhiteSpace(message))
        {
            messages.Add(message);
            await LoadMessages();
        }
    }
}