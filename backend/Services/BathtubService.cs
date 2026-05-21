public class BathtubService
{
    private const double G = 9.81; // Gravity
    private const double C_d = 0.62; // Standard discharge coefficient
    public void UpdateSimulation(BathtubSimulationState state, double deltaTime)
    {
        // Smooth update input flow rate
        double faucetTimeConstant = 5.0;
        state.CurrentInputFlowRate += (state.TargetInputFlowRate - state.CurrentInputFlowRate)
        * (1 - Math.Exp(-deltaTime / faucetTimeConstant));

        // Calculate output flow rate
        double effectiveDrainArea = C_d * state.DrainArea;
        state.CurrentOutputFlowRate = effectiveDrainArea * Math.Sqrt(2 * G * state.CurrentHeight);

        // Calculate the current height
        double netFlowRate = state.CurrentInputFlowRate - state.CurrentOutputFlowRate;
        double deltaVolume = netFlowRate * deltaTime;
        state.CurrentHeight += deltaVolume / state.SurfaceArea;

        // prevent negative height
        if (state.CurrentHeight < 0)
        {
            state.CurrentHeight = 0;
        }

    }

    public (double SteadyStateHeight, double TimeConstant)
    CalculateSystemMetrics(BathtubSimulationState state)
    {
        double effectiveDrainArea = C_d * state.DrainArea;

        // h_steady = Q^2 / (2 * g * C^2)
        double steadyStateHeight = Math.Pow(state.TargetInputFlowRate, 2)
        / (2 * G * Math.Pow(effectiveDrainArea, 2));

        // Time constant T
        double timeConstant = (2 * state.SurfaceArea * steadyStateHeight) / state.TargetInputFlowRate;

        return (steadyStateHeight, timeConstant);
    }
}