import React, { useContext } from "react";

import ThemesLayout from "layouts/themes-loyout";

const Scrumboard = (props) => {
  return (
    <div>
      <div>
        <div className="scrumboard-header">
          <div>
            <h3>Select You Theme </h3>
          </div>
          <div className="text-right"></div>
        </div>
        <ThemesLayout />
      </div>
    </div>
  );
};

export default Scrumboard;
