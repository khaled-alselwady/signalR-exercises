using MongoDB.Driver;
using SignalR.Server.Entities;
using SignalR.Server.MongoDB.Data;

namespace SignalR.Server.MongoDB;

public class VotingService
{
    private readonly IMongoCollection<Voting>? _votingCollection;

    public VotingService(MongoDbService mongoDbService)
    {
        _votingCollection = mongoDbService.Database?.GetCollection<Voting>("voting");
    }

    public async Task<bool> UpdateVotingCountAsync(Voting voting)
    {
        if (_votingCollection == null)
            return false;
        
        var result = await _votingCollection.ReplaceOneAsync(FilterDefinition<Voting>.Empty, voting);

        return result.ModifiedCount > 0;
    }

    public async Task<Voting> GetVotingCountAsync()
    {
        if (_votingCollection == null)
            return new Voting();
        return await _votingCollection.Find(FilterDefinition<Voting>.Empty).FirstOrDefaultAsync();
    }

    public async Task AddVotingCountAsync(Voting voting)
    {
        if (_votingCollection == null)
            return;
        
        await _votingCollection.InsertOneAsync(voting);
    }
}