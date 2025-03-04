using MongoDB.Driver;
using SignalR.Server.Entities;
using SignalR.Server.MongoDB.Data;

namespace SignalR.Server.MongoDB;

public class UserCountService
{
    private readonly IMongoCollection<UserCount>? _userCountCollection;

    public UserCountService(MongoDbService mongoDbService)
    {
        _userCountCollection = mongoDbService.Database?.GetCollection<UserCount>("userCount");
    }

    public async Task<bool> UpdateTotalViewsAsync(int count)
    {
        if (_userCountCollection == null)
            return false;
        var update = Builders<UserCount>.Update.Set(x => x.TotalViews, count);
        var result = await _userCountCollection.UpdateOneAsync(FilterDefinition<UserCount>.Empty, update);

        return result.ModifiedCount > 0;
    }

    public async Task<UserCount> GetUserCountAsync()
    {
        if (_userCountCollection == null)
            return new UserCount();
        return await _userCountCollection.Find(FilterDefinition<UserCount>.Empty).FirstOrDefaultAsync();
    }

    public async Task AddUserCountAsync(UserCount userCount)
    {
        if (_userCountCollection == null)
            return;
        
        await _userCountCollection.InsertOneAsync(userCount);
    }
}