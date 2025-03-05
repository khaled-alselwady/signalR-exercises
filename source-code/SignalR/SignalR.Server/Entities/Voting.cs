using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SignalR.Server.Entities;

public class Voting
{
    [BsonId]
    [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    
    [BsonElement("cloak"), BsonRepresentation(BsonType.Int32)]
    public int Cloak { get; set; }
    
    [BsonElement("stone"), BsonRepresentation(BsonType.Int32)]
    public int Stone { get; set; }
    
    [BsonElement("wand"), BsonRepresentation(BsonType.Int32)]
    public int Wand { get; set; }
}