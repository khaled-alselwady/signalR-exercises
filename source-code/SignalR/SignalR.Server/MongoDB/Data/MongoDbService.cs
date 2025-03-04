using MongoDB.Driver;

namespace SignalR.Server.MongoDB.Data;

public class MongoDbService
{
    private readonly IConfiguration _configuration;
    private readonly IMongoDatabase? _database;

    public MongoDbService(IConfiguration configuration)
    {
        _configuration = configuration;
        var mongoConnectionString = _configuration.GetConnectionString("MongoDb");
        var mongoUrl = MongoUrl.Create(mongoConnectionString);
        var mongoDbClient = new MongoClient(mongoUrl);
        _database = mongoDbClient.GetDatabase(mongoUrl.DatabaseName);
    }
    
    public IMongoDatabase? Database => _database;
}