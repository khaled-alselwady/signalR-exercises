using MongoDB.Driver;
using SignalR.Server.Hubs;
using SignalR.Server.MongoDB;
using SignalR.Server.MongoDB.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSignalR();
builder.Services.AddSingleton<MongoDbService>();
builder.Services.AddSingleton<UserCountService>();
builder.Services.AddSingleton<VotingService>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://localhost:8100")  // Allow specific origin
            .AllowAnyMethod()                       // Allow any HTTP method
            .AllowAnyHeader()                       // Allow any headers
            .AllowCredentials();                    // Allow credentials (cookies, authorization headers, etc.)
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAll");  // Enable CORS before other middleware
app.UseHttpsRedirection(); // HTTPS redirection middleware
app.MapControllers();
app.MapHub<UserHub>("/UserCount");
app.MapHub<VotingHub>("/Voting");
app.MapHub<HouseGroupHub>("/HouseGroup");

app.Run();