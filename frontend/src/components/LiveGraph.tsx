import { useContext, useEffect, useState } from 'react';
import { BathtubContext } from '../store/BathtubProvider';
import type { SimulationRequest, SimulationResponse } from '../types/types';
import useRealtimeData from '../hooks/useRealtimeData';

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
        console.log(newDataWindow);
        setDataWindow(newDataWindow);
    }, [newData.outputFlowRate])

    return (
        <div className="bg-[#D9D9D9]">
        </div>
    );
}