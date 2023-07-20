import {PropsWithoutRef, useState} from "react";
import classes from "./CabotPfp.module.css";
interface PfpProps extends PropsWithoutRef<object> {
    url: string,
    width?: number
}

export default function CabotPfp(props: PfpProps) {
    const actualWidth = props.width ? props.width: 32;
    const [errored, setErrored] = useState(false);
    function handleLoaded(el: HTMLImageElement) {
            if (el.src != "https://cdn.discordapp.com/embed/avatars/5.png") {
                setErrored(false)
            }
    }
    const isOk = !errored && props.url != null;
    return (
        <span className={classes["pfp-stack"]}>
            <img src={isOk ? props.url : "https://cdn.discordapp.com/embed/avatars/5.png" } alt={""} width={actualWidth} onError={() => setErrored(true)} />
            <img src={isOk ? props.url : "https://cdn.discordapp.com/embed/avatars/5.png" } alt={""} width={actualWidth} onLoad={(a) => handleLoaded(a.currentTarget)}/>
        </span>
    )
}