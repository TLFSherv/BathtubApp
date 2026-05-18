var builder = WebApplication.CreateBuilder(args);

var AllowFrontendOrigin = "_reactFrontend";
// specify allowed origins for CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowFrontendOrigin, policy =>
    {
        policy.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.AddSignalR();
builder.Services.AddSingleton<BathtubService>();
// register model state to share between hub and background service
builder.Services.AddSingleton<BathtubSimulationState>();
// register background service
builder.Services.AddHostedService<SimulationWorker>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler();
}

// add CORS middleware
app.UseCors(AllowFrontendOrigin);
app.UseHttpsRedirection();
// convert endpoint handler responses to Problem Details
app.UseStatusCodePages();

app.MapControllers();
app.MapHub<BathtubHub>("/bathtubHub");
app.Run();
