using Microsoft.AspNetCore.Mvc;

public class BathtubController : BaseController
{
    [HttpGet("{input}")]
    public IActionResult GetData(decimal input)
    {
        return Ok(input);
    }
}