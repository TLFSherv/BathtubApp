import { createContext, useState } from "react";
import type { TBathtubSimulationState } from "../types/types"

const initBathtub: TBathtubSimulationState = {
    length: 0,
    width: 0,
    drainDiameter: 0,
    surfaceArea: 0,
    drainArea: 0,
    time: 0,
    inputFlowRate: 0,
    outputFlowRate: 0
};

type LayoutContextType = {
    bathtub: TBathtubSimulationState;
    setBathtub: React.Dispatch<React.SetStateAction<TBathtubSimulationState>>
}

export const BathtubContext = createContext<LayoutContextType>({
    bathtub: initBathtub,
    setBathtub: () => { },
});

export const BathtubProvider = ({ children }: React.PropsWithChildren) => {

    const [bathtub, setBathtub] = useState<TBathtubSimulationState>(initBathtub);
    return (
        <BathtubContext value={{ bathtub, setBathtub }}>
            {children}
        </BathtubContext>
    )
}