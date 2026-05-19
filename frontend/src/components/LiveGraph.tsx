import { useContext, useEffect, useState } from 'react';
import { BathtubContext } from '../store/BathtubProvider';
import type { SimulationRequest, SimulationResponse } from '../types/types';
import useRealtimeData from '../hooks/useRealtimeData';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

export default function LiveGraph() {
    const [dataWindow, setDataWindow] = useState<SimulationResponse[]>([]);
    let { bathtub } = useContext(BathtubContext);
    const req: SimulationRequest = {
        drainDiameter: bathtub.drainDiameter,
        surfaceArea: bathtub.surfaceArea,
        drainArea: bathtub.drainArea,
        time: bathtub.time,
        inputFlowRateFinal: bathtub.inputFlowRateFinal,
        inputFlowRateInit: bathtub.inputFlowRateInit,
    };
    const newData = useRealtimeData(req);

    useEffect(() => {
        const newDataWindow = [...dataWindow, newData];
        if (newDataWindow.length > 60) newDataWindow.shift();
        console.log(newData);
        setDataWindow(newDataWindow);
    }, [newData.outputFlowRate])

    // const data: SimulationResponse[] = [
    //     { time: 0, inputFlowRate: 0, outputFlowRate: 0 },
    //     { time: 1, inputFlowRate: 1, outputFlowRate: 2 },
    //     { time: 2, inputFlowRate: 2, outputFlowRate: 4 },
    //     { time: 3, inputFlowRate: 3, outputFlowRate: 6 },
    //     { time: 4, inputFlowRate: 4, outputFlowRate: 8 },
    //     { time: 5, inputFlowRate: 5, outputFlowRate: 10 },
    //     { time: 6, inputFlowRate: 6, outputFlowRate: 12 },
    //     { time: 7, inputFlowRate: 7, outputFlowRate: 14 }
    // ];

    return (
        <div>
            <h1 className='text-center text-2xl'>
                Input and Output Water flow Steady State Response
            </h1>
            <LineChart
                style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600, height: 400 }}
                responsive
                data={dataWindow}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 0,
                }}
            >
                <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="inputFlowRate" stroke="red" strokeWidth={2} name="Input flow rate" />
                <Line type="monotone" dataKey="outputFlowRate" stroke="blue" strokeWidth={2} name="Output flow rate " />
                <XAxis dataKey="time" label={{ value: 'Time (s)', position: "bottom" }} tickCount={2} />
                <YAxis width="auto" label={{ value: 'Flow rate', position: 'insideLeft', angle: -90 }} />
                <Legend align="center" verticalAlign='top' />
                <RechartsDevtools />
            </LineChart>
        </div>
    );
}