using Microsoft.AspNetCore.SignalR;

public sealed class BathtubHub : Hub
{
    private readonly BathtubSimulationState _state;
    public BathtubHub(BathtubSimulationState state)
    {
        _state = state;
    }
    public void UpdateWaterInflowRate(double inflowRate, double inflowRateFinal)
    {
        // convert from ltr/sec to m3/sec
        _state.InputFlowRate = inflowRate / 1000;
        _state.FinalInputFlowRate = inflowRateFinal / 1000;
    }

    public void UpdateBathtubModel(double drainArea, double surfaceArea)
    {
        _state.DrainArea = drainArea;
        _state.SurfaceArea = surfaceArea;
        _state.SteadyStateTimeConstant = _state.Time;
    }
}