export type TBathtubSimulationState = {
    length: number;
    width: number;
    drainDiameter: number;
    surfaceArea: number;
    drainArea: number
    time: number;
    inputFlowRate: number;
    outputFlowRate: number;
};

export type TBathtubDataRequest = {
    drainDiameter: number;
    surfaceArea: number;
    drainArea: number
    time: number;
    inputFlowRate: number;
}

export type TBathtubDataResponse = {
    time: number;
    inputFlowRate: number;
    outputFlowRate: number;
}
