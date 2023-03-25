import React, { useState, useCallback, useEffect } from "react";
import { locationFriendly } from "../../../api/main";
import ListLocation from "../LocationDetail/ListLocation";
import MapboxFriendlyPC from "./MapboxFriendlyPC";

export const Contact = () => {
  const [locationFriendlyPC, setLocationFriendlyPC] = useState(null);

  const loadLociton = useCallback(async (endPointAPI) => {
    try {
      const response = await locationFriendly(endPointAPI);
      setLocationFriendlyPC(response.data.features);
    } catch (error) {
        console.log(error);
    }
  }, [locationFriendly]);

  useEffect(()=> {
    loadLociton('location');
  }, [loadLociton])

  return (
    <>
    <div className="father-contact">
        {!!locationFriendlyPC && locationFriendlyPC.length > 0 && (<MapboxFriendlyPC locationFriendlyPC={locationFriendlyPC} />)}
        {!!locationFriendlyPC && locationFriendlyPC.length >0 && <ListLocation locationFriendlyPC={locationFriendlyPC}/>}
    </div>
    </>
    );
};
