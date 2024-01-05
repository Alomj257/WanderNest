import React, { useState } from 'react';
import SyncLoader from "react-spinners/SyncLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div style={{marginTop: '250px'}}>
        <div className="sweet-loading text-center">
      <SyncLoader
        color='#3a79f0'
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </div>
  );
}

export default Loader;
