
using System.ComponentModel.DataAnnotations;

public class BathtubSimulationState
{
    [Required]
    [Range(0, 10)]
    public double SurfaceArea { get; set; }
    [Required]
    [Range(0, 10)]
    public double DrainArea { get; set; }
    [Required]
    public double Time { get; set; }
    [Required]
    public double InputFlowRate { get; set; }
    [Required]
    public double OutputFlowRate { get; set; }

}