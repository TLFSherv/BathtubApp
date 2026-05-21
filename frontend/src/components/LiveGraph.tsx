import { useContext } from 'react';
import { BathtubContext } from '../store/BathtubProvider';
import type { SimulationRequest } from '../types/types';
import useRealtimeData from '../hooks/useRealtimeData';
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

export default function LiveGraph() {
    let { bathtub } = useContext(BathtubContext);
    const req: SimulationRequest = {
        drainDiameter: bathtub.drainDiameter,
        surfaceArea: bathtub.surfaceArea,
        drainArea: bathtub.drainArea,
        time: bathtub.time,
        targetInputFlowRate: bathtub.inputFlowRateFinal,
        currentInputFlowRate: bathtub.inputFlowRateInit,
    };

    const liveData = useRealtimeData(req);
    let steadyStateTimeConstant = Math.round(liveData.at(-1)?.steadyStateTimeConstant ?? 0);

    return (
        <div className='space-y-8'>
            <div className='text-xl space-x-4 mx-auto w-fit'>
                <label>Steady State Time Constant (s)</label>
                <input type='text' className='text-2xl border rounded-md text-center p-4 w-[100px] mx-auto'
                    value={steadyStateTimeConstant} disabled />
            </div>
            <div>
                <h1 className='text-center text-2xl underline'>
                    Input and Output Water flow Steady State Response
                </h1>
                <LineChart
                    style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600, height: 400 }}
                    responsive
                    data={liveData}
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