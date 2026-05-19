import { useContext, useEffect, useState } from 'react';
import { BathtubContext } from '../store/BathtubProvider';
import type { SimulationRequest, SimulationResponse } from '../types/types';
import useRealtimeData from '../hooks/useRealtimeData';
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, XAxis, YAxis } from 'recharts';
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
    let steadyStateTimeConstant;

    useEffect(() => {
        const newDataWindow = [...dataWindow, newData];
        if (newDataWindow.length > 60) newDataWindow.shift();
        steadyStateTimeConstant = Math.round(dataWindow.at(-1)?.steadyStateTimeConstant ?? 0);
        // console.log(newDataWindow.at(-1)?.steadyStateTimeConstant);
        setDataWindow(newDataWindow);
    }, [newData.outputFlowRate])

    // const testData: SimulationResponse[] = [
    //     { time: 0, inputFlowRate: 0, outputFlowRate: 0, steadyStateTimeConstant: 2 },
    //     { time: 1, inputFlowRate: 1, outputFlowRate: 2, steadyStateTimeConstant: 2 },
    //     { time: 2, inputFlowRate: 2, outputFlowRate: 4, steadyStateTimeConstant: 2 },
    //     { time: 3, inputFlowRate: 3, outputFlowRate: 6, steadyStateTimeConstant: 2 },
    //     { time: 4, inputFlowRate: 4, outputFlowRate: 8, steadyStateTimeConstant: 2 },
    //     { time: 5, inputFlowRate: 5, outputFlowRate: 10, steadyStateTimeConstant: 2 },
    //     { time: 6, inputFlowRate: 6, outputFlowRate: 12, steadyStateTimeConstant: 2 },
    //     { time: 7, inputFlowRate: 7, outputFlowRate: 14, steadyStateTimeConstant: 2 }
    // ];

    return (
        <div className='space-y-8'>
            <div className='text-xl space-x-4 mx-auto w-fit'>
                <label>Steady State Time Constant (s)</label>
                <input className='text-2xl border rounded-md text-center p-4 w-[100px] mx-auto'
                    value={steadyStateTimeConstant} disabled />
            </div>
            <div>
                <h1 className='text-center text-2xl underline'>
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
                    <Line type="monotone" dataKey="outputFlowRate" stroke="blue" strokeWidth={2} name="Output flow rate" />
                    <ReferenceLine x={steadyStateTimeConstant} stroke='green' label={{ value: 'steady state time constant', fill: 'green', position: 'insideTop' }} />
                    <XAxis dataKey="time" label={{ value: 'Time (s)', position: "bottom" }} tickCount={2} />
                    <YAxis width="auto" label={{ value: 'Flow rate', position: 'insideLeft', angle: -90 }} />
                    <Legend align="center" verticalAlign='top' />
                    <RechartsDevtools />
                </LineChart>
            </div>
        </div>
    );
}