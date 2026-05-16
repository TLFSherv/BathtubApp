
using System.ComponentModel.DataAnnotations;

public record BathtubDataRequest
{
    [Required]
    [Range(0, 10)]
    public decimal SurfaceArea { get; set; }
    [Required]
    [Range(0, 10)]
    public decimal DrainArea { get; set; }
    [Required]
    [MaxLength(100)]
    public string? ConnectionId { get; set; }
}