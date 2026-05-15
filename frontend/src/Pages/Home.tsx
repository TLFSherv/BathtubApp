import { useState } from "react";

export default function Home() {
    const labels = new Array(11).fill(0).map((_, i) => i);
    const [rangeValue, setRangeValue] = useState(0);
    return (
        <div className="space-y-8">
            <h1 className="text-5xl text-center">Welcome Home !!</h1>
            <div className="mx-auto w-[400px]">
                <p className="text-xl text-center">
                    {rangeValue}
                </p>
                <input className="w-full"
                    value={rangeValue}
                    onChange={(e) => setRangeValue(parseFloat(e.target.value))}
                    type="range" min={0} max={10} step={0.1} list="markers" />
                <datalist id="markers" className="flex justify-between">
                    {labels.map(label =>
                        <option key={label} value={label} label={label.toString()}></option>
                    )}
                </datalist>
            </div>
        </div>
    )
}