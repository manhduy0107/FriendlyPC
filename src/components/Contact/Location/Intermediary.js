import React, { useEffect, useState } from "react";

export const Intermediary = (props) => {
    const [coordinate, setCoordinate] = useState();

    useEffect(() => {
        setCoordinate(props?.getLocationOfList);
    },[props?.getLocationOfList])
  const callLoction = () => {
    if (props.getLocationOfList !== undefined) {
      props?.getMap?.flyTo({
        center: [
          props?.getLocationOfList?.geometry.coordinates[0],
          props?.getLocationOfList?.geometry.coordinates[1],
        ],
        zoom: 15,
      });
    }
  };

  useEffect(() => {
    callLoction();
  }, [coordinate]);
  return <></>;
};
