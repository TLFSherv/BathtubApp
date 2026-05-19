import InflowSlider from "../components/InflowSlider"
import BathtubControl from "../components/BathtubControl"
import { BathtubProvider } from "../store/BathtubProvider"
import LiveGraph from "../components/LiveGraph"

export default function Home() {
    return (
        <BathtubProvider>
            <div className="flex-1 flex space-y-8 gap-x-16 text-white mx-auto">
                <div className="flex-1 space-y-10 m-4">
                    <BathtubControl />
                    <InflowSlider />
                </div>
                <div className="flex-1 my-auto">
                    <LiveGraph />
                </div>
            </div>
        </BathtubProvider>
    )
}