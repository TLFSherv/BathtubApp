using Microsoft.AspNetCore.SignalR;

public class SimulationWorker : BackgroundService
{
    private readonly IHubContext<BathtubHub> _hubContext;
    private readonly BathtubSimulationState _state;
    private readonly BathtubService _service;
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
        while (!stoppingToken.IsCancellationRequested)
        {
            _state.Time += dt;
            // calculate input and output flow rates
            _state.InputFlowRate = _service.CalculateInputFlowRate(_state);
            _state.OutputFlowRate = _service.CalculateOutputFlowRate(_state);
            await Task.Delay(TimeSpan.FromMilliseconds(100), stoppingToken);
        }
    }
}