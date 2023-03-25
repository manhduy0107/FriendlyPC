import { Card } from "@mui/material";

import React, {useEffect, useState} from "react";
import "../../../assets/scss/mapbox.scss";
import { Intermediary } from "../Location/Intermediary";

export const ListLocation = (data) => {
  const [getDataLocation, setgetDataLocation] = useState();

  const getLocationOfList = (item) => {
    setgetDataLocation(item)
  }

  return (
    <>
      <div className="branch">
        <h5>Danh sách cơ sở</h5>
        <Card sx={{ overflow: "inherit", maxHeight: 300 }}>
          <div className="branch__Info-detail">
            {!!data.locationFriendlyPC &&
              data.locationFriendlyPC.map((item, index) => (
                <div
                  className="leaderboard__branch"
                  key={index}
                  onClick={() => getLocationOfList(item)}
                >
                  <span className="leaderboard__branch-name">
                    {item.properties.name}
                  </span>
                </div>
              ))}
          </div>
        </Card>
      </div>
      <Intermediary getLocationOfList={getDataLocation}/>
    </>
  );
};

export default ListLocation;
