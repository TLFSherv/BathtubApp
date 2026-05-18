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
        _state.InputFlowRate = inflowRate;
        _state.FinalInputFlowRate = inflowRateFinal;
    }

    public void UpdateBathtubModel(double drainArea, double surfaceArea)
    {
        _state.DrainArea = drainArea;
        _state.SurfaceArea = surfaceArea;
    }
}