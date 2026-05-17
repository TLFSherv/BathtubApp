import { useEffect, useState } from "react";
import type { TBathtubDataRequest } from "../types/types";
import * as signalR from '@microsoft/signalr';

export default function useDataSend(url: string, data: TBathtubDataRequest) {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(url, {})
            .withAutomaticReconnect()
            .build();
        if (newConnection) setConnection(newConnection);
    }, [url]);

    useEffect(() => {
        start();
    }, [connection]);

    useEffect(() => {
        setWaterInflowRate()
    }, [data.inputFlowRate]);

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
            await connection?.invoke("UpdateWaterInflowRate", data.inputFlowRate);
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
}