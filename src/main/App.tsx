import classes from "./App.module.css";
import {Search} from "@carbon/react";
import CabotSymbol from "../components/CabotSymbol/CabotSymbol.tsx";
import CabotUserList, {CabotFilterMode} from "../components/CabotUserList";
import {useState} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IconSwitch, ContentSwitcher} from '@carbon/react';
import {Badge} from "@carbon/icons-react";


function App() {
    const [search, setSearch] = useState("");
    function handleChange(e: {target: HTMLInputElement}) {
        const value = e.target.value.toLowerCase();
        setTimeout(() => {
            if (value == e.target.value.toLowerCase()) {
                setSearch(value);
            }
        }, 500);
    }

    const [filterMode, setFilterMode] = useState("default" as CabotFilterMode);

    function handleModeChange(a: {index: number}) {
        const modes: CabotFilterMode[] = ["default", "w", "l"];
        setFilterMode(modes[a.index]);
    }

    return (
    <main className={classes.main}>
        <div className={classes["title-container"]}>
          <h1 className={classes.title}>
              <span style={{marginRight: "22px"}}>
                  <CabotSymbol kind={"W"} />
              </span>
              Counter
          </h1>
          <div className={classes.search}>
              <Search labelText={"Search"} placeholder={"Filter Users"}  onChange={handleChange} />
              <ContentSwitcher size={"md"} className={classes.sortSwitch} onChange={handleModeChange}>
                  <IconSwitch text={"Sort by Net W's"}>
                    <Badge />
                  </IconSwitch>
                  <IconSwitch text={"Sort by W Count"}>
                      <CabotSymbol kind={"W"} size={12} />
                  </IconSwitch>
                  <IconSwitch text={"Sort by L Count"}>
                      <CabotSymbol kind={"L"} size={12} />
                  </IconSwitch>
              </ContentSwitcher>
          </div>
        </div>
        <div className={classes.userList}>
            <CabotUserList search={search} filterMode={filterMode}></CabotUserList>
        </div>
    </main>
    )
}

export default App
