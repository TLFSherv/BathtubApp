using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

// recieve data in controller and send data in hub
public class AppController : BaseController
{
    private IHubContext<NotificationHub> _hubContext;
    public AppController(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    [HttpPost]
    public async Task<IActionResult> Post(BathtubDataRequest request)
    {
        // call BathtubService
        await _hubContext.Clients.Client(request.ConnectionId).SendAsync("Hello");
        return Ok();
    }
}