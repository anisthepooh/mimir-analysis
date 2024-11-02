'use client'
import { useState, useCallback } from "react";
import Dashboard from "./General/Dashboard";
import { useLocalStorage } from "@uidotdev/usehooks";


export default function Home() {
  const [datapoints, setDatapoints] = useState([]);
  const [, updateState] = useState();
  //const forceUpdate = useCallback(() => updateState({}), []);
  const [model, setModel] = useLocalStorage("model", 'cronical');


  const [unit, setUnit] = useState("mg/mol")

  return (
    <div className=" container mx-auto">
      <Dashboard
        model={model}
        setModel={setModel}
        //setDatapoints={setDatapoints}
      />
      
    </div>
  );
}
