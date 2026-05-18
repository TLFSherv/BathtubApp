import InflowSlider from "../components/InflowSlider"
import BathtubControl from "../components/BathtubControl"
import { BathtubProvider } from "../store/BathtubProvider"
import LiveGraph from "../components/LiveGraph"

export default function Home() {
    return (
        <BathtubProvider>
            <div className="flex-1 flex space-y-8 text-white mx-auto">
                <div className="flex-1 space-y-8 m-4">
                    <BathtubControl />
                    <InflowSlider />
                </div>
                <div className="flex-3">
                    <LiveGraph />
                </div>
            </div>
        </BathtubProvider>
    )
}