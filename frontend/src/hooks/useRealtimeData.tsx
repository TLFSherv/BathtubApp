import { useEffect, useState } from "react";
import type { SimulationRequest, SimulationResponse } from "../types/types";
import * as signalR from '@microsoft/signalr';

export default function useRealtimeData(data: SimulationRequest): SimulationResponse {
    const connectionUrl = "http://localhost:5122/bathtubHub";
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [result, setResult] = useState<SimulationResponse>({ time: 0, inputFlowRate: 0, outputFlowRate: 0 });

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(connectionUrl, {})
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);

        newConnection.on("RecieveSimulationTick", (newData: SimulationResponse) => {
            setResult(newData);
        })

        return () => { newConnection.off("RecieveSimulationTick"); }
    }, []);

    useEffect(() => {
        start();
    }, [connection]);

    useEffect(() => {
        setWaterInflowRate()
    }, [data.inputFlowRateFinal]);

    useEffect(() => {
        setBathtubModel();
    }, [data.drainArea, data.surfaceArea])

    async function start() {
        try {
            if (connection) await connection.start();
        }
        catch (err) {
            console.log(err);
        }
    }

    async function setWaterInflowRate() {
        try {
            await connection?.invoke("UpdateWaterInflowRate", data.inputFlowRateInit, data.inputFlowRateFinal);
        } catch (error) {
            console.error(error);
        }
    }

    async function setBathtubModel() {
        try {
            await connection?.invoke("UpdateBathtubModel", data.drainArea, data.surfaceArea);
        } catch (error) {
            console.error(error);
        }
    }

    return result;
}