import {CabotSymbolType} from "./SymbolType.ts";
import {PropsWithChildren} from "react";
import wUrl from "../../assets/w_4x.png";
import lUrl from "../../assets/l_4x.png";
import classes from "./CabotSymbol.module.css";

interface SymbolProps extends PropsWithChildren<object> {
    size?: number,
    kind: CabotSymbolType
}

export default function CabotSymbol(props: SymbolProps) {
    let source: string;
    if (props.kind === 'W') {
        source = wUrl
    } else {
        source = lUrl;
    }
    return (
        <span className={classes.symbolContainer}>
            <img src={source} style={{width: props.size ? `${props.size}px` : "1em"}} className={classes.symbol} alt={""} />
        </span>
    )
}