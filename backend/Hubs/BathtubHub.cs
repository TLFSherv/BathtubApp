using Microsoft.AspNetCore.SignalR;

public sealed class BathtubHub : Hub
{
    private readonly BathtubSimulationState _state;
    public BathtubHub(BathtubSimulationState state)
    {
        _state = state;
    }
    public void UpdateWaterInflowRate(double inflowRate)
    {
        _state.InputFlowRate = inflowRate;
    }

    public void UpdateBathtubModel(double drainArea, double surfaceArea)
    {
        _state.DrainArea = drainArea;
        _state.SurfaceArea = surfaceArea;
    }
}