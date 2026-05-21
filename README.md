# Project: Steady State Analysis of a Bathtub
This application models the process of a bathtub with water flowing in at a rate Q_in and water flowing out from a drain at a rate Q_out
reaching steady state where Q_in = Q_out.

I wanted to show how Q_in and Q_out evolve over time untill eventually becoming equal. The app allows users to change Q_in, as well as
the bathtub model parameters like length, width and drain diameter, to affect the time to reach steady state. 

My motivation for creating this app was to model a straightfoward physical process in preparation for modeling more complex systems in the future. 
This was my first time using SignalR/websockets and background services. 
My react frontend and c# asp.net backend continuously transmit flow rates for displaying this data in a dynamic graph built using Recharts. 
I learned a lot and I'm looking forward to my next challenge.

## Tech Stack
[![My Skills](https://skillicons.dev/icons?i=ts,html,tailwind,cs,dotnet,react)](https://skillicons.dev)

## Screenshots
<img width="2950" height="1274" alt="image" src="https://github.com/user-attachments/assets/ee993d63-7bcb-4590-8973-7e0215e9ae4e" />

## Mathematics

$C_d$ is the standard discharge coefficient for sharp edged geometry ($C_d=0.62$)\
$C = C_d * A_{drain}$ 

Formula for calculating steady state height ($g=gravity$):\
$h_{steady} = \frac{Q_{in}^2}{2gC^2}$

The output flow rate $Q_{out}$ is:\
$Q_{out} = C\sqrt{2gh}$

The formula for the height of the water is:
```math
h = \frac{(Q_{in} - Q_{out})*\Delta t}{A}
```

Steady state time
```math
T = \frac{2*A*h_{steady}}{Q_{in,final}}
```

