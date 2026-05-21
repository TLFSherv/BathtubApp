
using System.ComponentModel.DataAnnotations;

public class BathtubSimulationState
{
    public double Time { get; set; }
    public double SteadyStateTimeConstant { get; set; }
    [Required]
    public double SurfaceArea { get; set; } = 1.2;
    [Required]
    public double DrainArea { get; set; } = 0.00114;
    [Required]
    public double TargetInputFlowRate { get; set; } = 0.000417;
    [Required]
    public double CurrentInputFlowRate { get; set; }
    [Required]
    public double CurrentOutputFlowRate { get; set; }
    public double CurrentHeight { get; set; }

}