import { useContext } from "react";
import { BathtubContext } from "../store/BathtubProvider";

export default function InflowSlider() {
    const { bathtub, setBathtub } = useContext(BathtubContext);
    const labels = new Array(11).fill(0).map((_, i) => i);
    return (
        <div className="mx-auto w-[400px] space-y-4">
            <h1 className="text-2xl">Input water flow rate (ltr/s)</h1>
            <p className="text-3xl text-center border rounded-md w-[100px] mx-auto p-4">
                {bathtub.inputFlowRate}
            </p>
            <input className="w-full"
                value={bathtub.inputFlowRate}
                onChange={(e) => setBathtub({ ...bathtub, inputFlowRate: parseFloat(e.target.value) })}
                type="range" min={0.0} max={10.0} step={0.01} list="markers" />
            <datalist id="markers" className="flex justify-between">
                {labels.map(label =>
                    <option key={label} value={label} label={label.toString()}></option>
                )}
            </datalist>
        </div>
    )
}