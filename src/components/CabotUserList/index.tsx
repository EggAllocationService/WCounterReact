import {getUsers, WCounterUser} from "../../lib/apiUtil.ts";
import {Component} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SkeletonPlaceholder from '@carbon/react/lib/components/SkeletonPlaceholder/SkeletonPlaceholder.js';
import classes from './index.module.css';
import {SkeletonText} from "@carbon/react";
import CabotPfp from "../CabotPfp";
import CabotSymbol from "../CabotSymbol/CabotSymbol.tsx";
import FlipMove from "react-flip-move";


export type CabotFilterMode = "default" | "l" | "w";

type CabotUserState = {
    users?: WCounterUser[]

}
type CabotUserProps = {
    search: string
    filterMode: CabotFilterMode
}

export default class extends Component<CabotUserProps, CabotUserState> {
    state: CabotUserState = {}
    render() {
        const content = this.state.users ? this.renderContent() : this.renderSkeleton();
        return (
            <table className={classes.displayTable}>
                <tbody style={{overflowAnchor: "none", position:"relative"}}>
                    {content}
                </tbody>
            </table>
        )
    }

    renderSkeleton() {
        const oneRow = (
            <tr>
                <td style={{width: "2em"}}>
                    <SkeletonText heading={true} className={classes.vCenter}></SkeletonText>
                </td>
                <td className={classes.pfp}>
                    <SkeletonPlaceholder className={classes.pfp}></SkeletonPlaceholder>
                </td>
                <td style={{width: "14em"}}>
                    <SkeletonText width={"12em"}></SkeletonText>
                </td>
                <td>
                    <SkeletonText width={"2em"}></SkeletonText>
                </td>
                <td>
                    <SkeletonText width={"2em"}></SkeletonText>
                </td>
            </tr>
        );
        const tableRows: JSX.Element[] = [];
        for (let i = 0; i < 4; i++) {
            tableRows.push(oneRow);
        }
        return tableRows;
    }

    renderContent() {
        const rows: JSX.Element[] = [];
        const sorted = this.sort(this.state.users);
        if (sorted == undefined) return this.renderSkeleton();
        let currentPlace = 1;

        for (let i = 0; i < sorted.length; i++) {
            const user = sorted[i];
            if (user.displayName.toLowerCase().includes(this.props.search.toLowerCase())) {
                rows.push(
                    <tr key={user.id}>
                        <td>
                            #{currentPlace}
                        </td>
                        <td>
                            <CabotPfp url={user.avatarURL} width={40}></CabotPfp>
                        </td>
                        <td className={classes.name}>
                            {user.displayName}
                        </td>
                        <td>
                            {user.wCount} <CabotSymbol kind={"W"} />
                        </td>
                        <td>
                            {user.lCount} <CabotSymbol kind={"L"} />
                        </td>
                    </tr>
                )
            }

            currentPlace += (this.isTied(sorted[i], (i == sorted.length - 1 ? undefined : sorted[i + 1])) ? 0 : 1);
        }
        return rows.length > 0 ? (
            <FlipMove typeName={null} duration={200} staggerDelayBy={20} easing={"ease-out"}>
                {rows}
            </FlipMove>
        ) : (<p>No users found</p>);
    }

    async componentDidMount() {
        // fetch some data
        const d = await this.fetchData();
        this.setState({
            users: this.sort(d)
        });

    }

    async fetchData() {
        return new Promise<WCounterUser[] | undefined>((resolve, reject) => {
            setTimeout(() => {
                getUsers().then(resolve).catch(reject);
            }, 1000);
        });
    }
    isTied(a: WCounterUser, b?: WCounterUser):boolean {
        if (b == undefined) return false;
        switch (this.props.filterMode) {
            case "default":
                return (a.wCount - a.lCount) == (b.wCount - b.lCount);
            case "l":
                return a.lCount == b.lCount;
            case "w":
                return a.wCount == b.wCount;
        }
    }
    sort(list: WCounterUser[] | undefined): WCounterUser[] | undefined {
        if (list == undefined) return;
        switch (this.props.filterMode) {
            case "default":
                list.sort((a, b) => (b.wCount - b.lCount) - (a.wCount - a.lCount))
                break;
            case "l":
                list.sort((a, b) => b.lCount - a.lCount);
                break;
            case "w":
                list.sort((a, b) => b.wCount - a.wCount);
                break;
        }
        return list;
    }
}