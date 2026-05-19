export type BathtubSimulationState = {
    length: number;
    width: number;
    drainDiameter: number;
    surfaceArea: number;
    drainArea: number
    time: number;
    inputFlowRate: number;
    inputFlowRateFinal: number;
    inputFlowRateInit: number;
    outputFlowRate: number;
};

export type SimulationRequest = {
    drainDiameter: number;
    surfaceArea: number;
    drainArea: number
    time: number;
    inputFlowRateFinal: number;
    inputFlowRateInit: number;
}

export type SimulationResponse = {
    time: number;
    inputFlowRate: number;
    outputFlowRate: number;
    steadyStateTimeConstant: number;
}
