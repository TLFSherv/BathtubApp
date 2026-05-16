import { useState } from "react"
import type { TModelParameters } from "../types/types";

export default function ModelControl() {
    const initParameters: TModelParameters = {
        length: 0,
        width: 0,
        drainDiameter: 0,
        surfaceArea: 0,
        drainArea: 0
    };
    const [modelParameters, setModelParameters] = useState<TModelParameters>(initParameters);
    const handleChange = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const surfaceArea = modelParameters.length * modelParameters.width;
        const drainArea = Math.PI * Math.pow(modelParameters.drainDiameter / 2, 2);
        setModelParameters({
            ...modelParameters,
            surfaceArea,
            drainArea,
            [target.name]: target.value
        });
    }

    return (
        <div>
            <h2 className="text-2xl">
                Model parameters (m)
            </h2>
            <form className="p-4 border rounded-md">
                <div className="space-y-4">
                    <div className="space-x-2">
                        <label htmlFor="length">Length:</label>
                        <input className="border-[#BBBABA] border rounded-lg py-1 px-2 w-[160px]"
                            value={modelParameters.length} onChange={e => handleChange(e)}
                            type="number" min={0} step={0.01} name="length" />
                    </div>
                    <div className="space-x-2">
                        <label htmlFor="width">Width:</label>
                        <input className="border-[#BBBABA] border rounded-lg py-1 px-2 w-[160px]"
                            value={modelParameters.width} onChange={e => handleChange(e)}
                            type="number" min={0} step={0.01} name="width" />
                    </div>
                    <div className="space-x-2">
                        <label htmlFor="drainDiameter"> Drain hole diameter:</label>
                        <input className="border-[#BBBABA] border rounded-lg py-1 px-2 w-[160px]"
                            value={modelParameters.drainDiameter} onChange={e => handleChange(e)}
                            type="number" min={0} step={0.01} name="drainDiameter" />
                    </div>
                    <div className="space-x-2">
                        <label htmlFor="surfaceArea">Surface area:</label>
                        <input className="border-[#BBBABA] border rounded-lg py-1 px-2 w-[160px]"
                            value={modelParameters.surfaceArea}
                            type="number" min={0} name="surfaceArea" disabled />
                    </div>
                    <div className="space-x-2">
                        <label htmlFor="drainArea">Drain area:</label>
                        <input className="border-[#BBBABA] border rounded-lg py-1 px-2 w-[160px]"
                            value={modelParameters.drainArea}
                            type="number" min={0} name="drainArea" disabled />
                    </div>
                </div>
            </form>
        </div>
    )
}