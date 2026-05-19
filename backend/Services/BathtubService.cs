public class BathtubService
{
    public (double OutputFlowRate, double TimeConstant)
    CalculateOutputFlowRate(BathtubSimulationState state)
    {
        // Discharge coefficient (C)
        double C = 0.62 * state.DrainArea;
        // Steady state height (h_steady)
        double h_steady = Math.Pow(state.FinalInputFlowRate, 2) / (2 * 9.81 * Math.Pow(C, 2));
        // Time constant (T)
        double T = (2 * state.SurfaceArea * h_steady) / state.FinalInputFlowRate;
        double h = h_steady * (1 - Math.Exp(-state.Time / T));
        return (OutputFlowRate: C * Math.Sqrt(2 * 9.81 * h), TimeConstant: T);
    }

    public double CalculateInputFlowRate(BathtubSimulationState state)
    {
        int delay = 20;
        double dQ = (state.FinalInputFlowRate - state.InputFlowRate);
        // Inflow rate (Qin)
        double Qin = state.InputFlowRate + dQ / delay;
        return Math.Min(state.FinalInputFlowRate, Qin);
    }
}