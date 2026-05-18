
using System.ComponentModel.DataAnnotations;

public class BathtubSimulationState
{
    [Required]
    public double SurfaceArea { get; set; } = 1.2;
    [Required]
    public double DrainArea { get; set; } = 0.001140;
    [Required]
    public double Time { get; set; }
    [Required]
    public double FinalInputFlowRate { get; set; } = 0.417;
    [Required]
    public double InputFlowRate { get; set; }
    [Required]
    public double OutputFlowRate { get; set; }

}