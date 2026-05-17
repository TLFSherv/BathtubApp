
using System.ComponentModel.DataAnnotations;

public class BathtubSimulationState
{
    [Required]
    public double SurfaceArea { get; set; }
    [Required]
    public double DrainArea { get; set; }
    [Required]
    public double Time { get; set; }
    [Required]
    public double FinalInputFlowRate { get; set; }
    [Required]
    public double InputFlowRate { get; set; }
    [Required]
    public double OutputFlowRate { get; set; }

}