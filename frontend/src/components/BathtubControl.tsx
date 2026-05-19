import { useContext } from "react"
import { BathtubContext } from "../store/BathtubProvider";

export default function BathtubControl() {
    const { bathtub, setBathtub } = useContext(BathtubContext);
    const handleChange = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const surfaceArea = bathtub.length * bathtub.width;
        const drainArea = Math.PI * Math.pow(bathtub.drainDiameter / 2, 2);
        setBathtub({
            ...bathtub,
            surfaceArea,
            drainArea,
            [target.name]: target.value
        });
    }

    return (
        <div>
            <h2 className="text-2xl">
                Bathtub parameters (m)
            </h2>
            <form className="p-4 border rounded-md">
                <div className="grid grid-cols-2 grid-rows-3 gap-y-4">
                    <div>
                        <label className="block" htmlFor="length">Length:</label>
                        <input className="border-[#BBBABA] border rounded-lg py-1 px-2 w-[160px]"
                            value={bathtub.length} onChange={e => handleChange(e)}
                            type="number" min={0} step={0.01} name="length" />
                    </div>
                    <div>
                        <label className="block" htmlFor="width">Width:</label>
                        <input className="border-[#BBBABA] border rounded-lg py-1 px-2 w-[160px]"
                            value={bathtub.width} onChange={e => handleChange(e)}
                            type="number" min={0} step={0.01} name="width" />
                    </div>
                    <div>
                        <label className="block" htmlFor="drainDiameter"> Drain hole diameter:</label>
                        <input className="border-[#BBBABA] border rounded-lg py-1 px-2 w-[160px]"
                            value={bathtub.drainDiameter} onChange={e => handleChange(e)}
                            type="number" min={0} step={0.01} name="drainDiameter" />
                    </div>
                    <div>
                        <label className="block" htmlFor="surfaceArea">Surface area:</label>
                        <input className="border-[#BBBABA] border rounded-lg py-1 px-2 w-[160px]"
                            value={bathtub.surfaceArea}
                            type="number" min={0} name="surfaceArea" disabled />
                    </div>
                    <div>
                        <label className="block" htmlFor="drainArea">Drain area:</label>
                        <input className="border-[#BBBABA] border rounded-lg py-1 px-2 w-[160px]"
                            value={bathtub.drainArea}
                            type="number" min={0} name="drainArea" disabled />
                    </div>
                </div>
            </form>
        </div>
    )
}