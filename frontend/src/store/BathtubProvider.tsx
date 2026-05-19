import { createContext, useState } from "react";
import type { BathtubSimulationState } from "../types/types"

const initBathtub: BathtubSimulationState = {
    length: 1.6,
    width: 0.75,
    drainDiameter: 0.0381,
    surfaceArea: 1.2,
    drainArea: 0.001140,
    time: 0,
    inputFlowRate: 0.417,
    inputFlowRateFinal: 0.417,
    inputFlowRateInit: 0.417,
    outputFlowRate: 0
};

type LayoutContextType = {
    bathtub: BathtubSimulationState;
    setBathtub: React.Dispatch<React.SetStateAction<BathtubSimulationState>>
}

export const BathtubContext = createContext<LayoutContextType>({
    bathtub: initBathtub,
    setBathtub: () => { },
});

export const BathtubProvider = ({ children }: React.PropsWithChildren) => {

    const [bathtub, setBathtub] = useState<BathtubSimulationState>(initBathtub);
    return (
        <BathtubContext value={{ bathtub, setBathtub }}>
            {children}
        </BathtubContext>
    )
}