import { useEffect, useState } from "react";
import type { SimulationRequest, SimulationResponse } from "../types/types";
import * as signalR from '@microsoft/signalr';

export default function useRealtimeData(data: SimulationRequest): SimulationResponse[] {
    const connectionUrl = "http://localhost:5122/bathtubHub";
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [dataWindow, setDataWindow] = useState<SimulationResponse[]>([{
        time: 0,
        inputFlowRate: 0,
        outputFlowRate: 0,
        currentHeight: 0,
        steadyStateTimeConstant: 0
    }]);
    let surfaceArea = data.length * data.width;
    let drainArea = Math.PI * Math.pow(data.drainDiameter / 2, 2);

    // setup connection and event listeners
    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(connectionUrl, {})
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        newConnection.on("RecieveSimulationTick", (newData: SimulationResponse) => {
            setDataWindow((prevWindow) => {
                const nextWindow = [...prevWindow, newData];
                if (nextWindow.length > 60) {
                    nextWindow.shift();
                }
                return nextWindow;
            });
        });

        return () => {
            newConnection.off("RecieveSimulationTick");
            newConnection.stop();
        }
    }, []);

    // start connection and send initial configuration state
    useEffect(() => {
        if (!connection) return;

        async function start() {
            try {
                if (connection) await connection.start();

                //connection is live, send initial configuration immediately
                await connection?.invoke("UpdateWaterInflowRate", data.currentInputFlowRate, data.targetInputFlowRate);
                await connection?.invoke("UpdateBathtubModel", drainArea, surfaceArea);
            }
            catch (err) {
                console.log("SignalR connection error: ", err);
            }
        }

        start();
    }, [connection]);

    // handle subsequent runtime updates from user input
    useEffect(() => {
        if (connection && connection.state === signalR.HubConnectionState.Connected) {
            connection
                ?.invoke("UpdateWaterInflowRate", data.currentInputFlowRate, data.targetInputFlowRate)
                .catch(err => console.error(err));
        }
    }, [data.currentInputFlowRate, data.targetInputFlowRate]);

    useEffect(() => {
        if (connection && connection.state === signalR.HubConnectionState.Connected) {
            connection
                ?.invoke("UpdateBathtubModel", drainArea, surfaceArea)
                .catch(err => console.log(err));
        }
    }, [data.drainDiameter, data.length, data.width])

    return dataWindow;
}