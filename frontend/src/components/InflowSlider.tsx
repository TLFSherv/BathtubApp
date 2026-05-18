import { useContext } from "react";
import { BathtubContext } from "../store/BathtubProvider";

export default function InflowSlider() {
    const { bathtub, setBathtub } = useContext(BathtubContext);
    const labels = new Array(5).fill(0).map((_, i) => i);
    return (
        <div className="mx-auto w-[400px] space-y-4">
            <h1 className="text-2xl">Input water flow rate (ltr/s)</h1>
            <div className="flex justify-evenly">
                <div>
                    <label className="block">Init flow rate</label>
                    <input
                        type="number"
                        step={0.01}
                        value={bathtub.inputFlowRateInit}
                        onChange={(e) => setBathtub({ ...bathtub, inputFlowRateInit: parseFloat(e.target.value) })}
                        className="text-3xl text-center border rounded-md w-[100px] p-2" />

                </div>
                <input
                    type="number"
                    step={0.01}
                    value={bathtub.inputFlowRate}
                    onChange={(e) => setBathtub({ ...bathtub, inputFlowRate: parseFloat(e.target.value) })}
                    className="text-3xl text-center border rounded-md w-[100px] p-2" />
                <div>
                    <label className="block">Final flow rate</label>
                    <input
                        type="number"
                        step={0.01}
                        value={bathtub.inputFlowRateFinal}
                        onChange={(e) => setBathtub({ ...bathtub, inputFlowRateFinal: parseFloat(e.target.value) })}
                        className="text-3xl text-center border rounded-md w-[100px] p-2" />
                </div>
            </div>
            <input className="w-full"
                value={bathtub.inputFlowRate}
                onMouseDown={() => setBathtub({ ...bathtub, inputFlowRateInit: bathtub.inputFlowRate })}
                onMouseUp={() => setBathtub({ ...bathtub, inputFlowRateFinal: bathtub.inputFlowRate })}
                onChange={(e) => setBathtub({ ...bathtub, inputFlowRate: parseFloat(e.target.value) })}
                type="range" min={labels[0]} max={labels.at(-1)} step={0.01} list="markers" />
            <datalist id="markers" className="flex justify-between">
                {labels.map(label =>
                    <option key={label} value={label} label={label.toString()}></option>
                )}
            </datalist>
        </div>
    )
}