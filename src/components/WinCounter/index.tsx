import {JSX} from "react/jsx-runtime";
import crown from "./crown.svg";
import classes from "./WinCounter.module.css";
export type WinCounterProps = {
    season: number
}

export default function WinCounter({ season }: WinCounterProps): JSX.Element {
    return (
        <span className={classes.winTag}>
            <img src={crown} alt={"crown"} />
            <span>
                Season {season}
            </span>
        </span>
    )
}