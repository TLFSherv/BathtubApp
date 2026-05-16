import Faucet from "../components/Faucet"
import ModelControl from "../components/ModelControl"

export default function Home() {

    return (
        <div className="flex-1 flex space-y-8">
            <div className="flex-1 space-y-8 m-4">
                <ModelControl />
                <Faucet />
            </div>
            <div className="flex-3">

            </div>
        </div>
    )
}