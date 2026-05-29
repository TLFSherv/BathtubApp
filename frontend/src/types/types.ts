export type BathtubSimulationState = {
    length: number;
    width: number;
    drainDiameter: number;
    time: number;
    inputFlowRate: number;
    inputFlowRateFinal: number;
    inputFlowRateInit: number;
    outputFlowRate: number;
};

export type SimulationRequest = {
    length: number;
    width: number;
    drainDiameter: number;
    time: number;
    targetInputFlowRate: number;
    currentInputFlowRate: number;
}

export type SimulationResponse = {
    time: number;
    inputFlowRate: number;
    outputFlowRate: number;
    currentHeight: number;
    steadyStateTimeConstant: number;
}
