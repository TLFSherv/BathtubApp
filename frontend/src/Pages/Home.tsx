import InflowSlider from "../components/InflowSlider"
import BathtubControl from "../components/BathtubControl"
import { BathtubProvider } from "../store/BathtubProvider"

export default function Home() {
    return (
        <BathtubProvider>
            <div className="flex-1 flex space-y-8">
                <div className="flex-1 space-y-8 m-4">
                    <BathtubControl />
                    <InflowSlider />
                </div>
                <div className="flex-3">

                </div>
            </div>
        </BathtubProvider>
    )
}