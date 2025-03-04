using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SignalR.Server.Entities;

public class UserCount
{
    [BsonId]
    [BsonElement("_d"), BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    
    [BsonElement("total_views"), BsonRepresentation(BsonType.Int32)]
    public int TotalViews  { get; set; }
}