var builder = WebApplication.CreateBuilder(args);

var AllowFrontendOrigin = "ReactFrontend";
// specify allowed origins for CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(AllowFrontendOrigin, policy =>
    {
        policy.WithOrigins("http://localhost:5173/*")
        .SetIsOriginAllowedToAllowWildcardSubdomains()
        .AllowAnyHeader()
        .WithMethods("GET", "POST")
        .AllowCredentials();
    });
});

builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.AddSignalR();
builder.Services.AddScoped<BathtubSimulationState>();

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
