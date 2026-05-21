using Microsoft.AspNetCore.SignalR;

public class SimulationWorker : BackgroundService
{
    private readonly IHubContext<BathtubHub> _hubContext;
    private readonly BathtubSimulationState _state;
    private readonly BathtubService _service;
    private readonly ILogger _logger;
    public SimulationWorker(IHubContext<BathtubHub> hubContext,
        BathtubSimulationState state,
        BathtubService service)
    {
        _hubContext = hubContext;
        _state = state;
        _service = service;
    }

    protected override async Task ExecuteAsync(
        CancellationToken stoppingToken)
    {
        double dt = 0.1; // 100ms updates
        using var timer = new PeriodicTimer(TimeSpan.FromMilliseconds(100));

        // track the physical property to detect adjustments
        double lastTimeConstant = 0;

        try
        {
            while (await timer.WaitForNextTickAsync(stoppingToken))
            {
                _state.Time = Math.Round(_state.Time + dt, 1);
                // calculate input and output flow rates
                _service.UpdateSimulation(_state, dt);
                var (steadyStateHeight, timeConstant) = _service.CalculateSystemMetrics(_state);

                // detect when the time constant shifts due to user interaction
                if (Math.Abs(timeConstant - lastTimeConstant) > 0.001)
                {
                    _state.SteadyStateTimeConstant = Math.Round(_state.Time + timeConstant * 4, 1);
                    lastTimeConstant = timeConstant;
                }

                await _hubContext.Clients.All.SendAsync("RecieveSimulationTick",
                new
                {
                    time = _state.Time,
                    inputFlowRate = _state.CurrentInputFlowRate,
                    outputFlowRate = _state.CurrentOutputFlowRate,
                    steadyStateTimeConstant = _state.SteadyStateTimeConstant,
                    currentHeight = _state.CurrentHeight,
                }, stoppingToken);
            }
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("Simulation background worker is stopping gracefully");
            //_logger.LogInformation("Simulation background worker is stopping gracefully");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An unhandled error occured during the simulation loop: {ex}");
            // _logger.LogError(ex, "An unhandled error occured during the simulation loop");
        }
    }
}