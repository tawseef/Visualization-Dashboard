import React, { useEffect, useState } from "react";
import BarChart from "../Graph/Bargraph";
import axios from "axios";
import "./Dashboard.css";
import ipConfig from "../../ipConfig.json";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/v1`,
};

function Dashboard() {
  const [data, setData] = useState();

useEffect(()=>{
    const getDataInDB = async ()=>{
        try{
            const data = await axios.get(`${config.endpoint}`);
            setData(data.data);
        }catch(e){
            console.log("Failed",e.message)
        }
    }
    getDataInDB();
},[])


  return (<>
  <div className="Text">
    A simple visualization with d3 library of the provided data using bargraph
  </div>
    <div>  
      <BarChart data={data}/>
    </div>
  </>
  );
}

export default Dashboard;