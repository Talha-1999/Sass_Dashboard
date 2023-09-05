import React, { useEffect, useState } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { getPackage } from "redux/actions/Auth";
import Flex from "components/shared-components/Flex";

import Pricing from "views/app-views/pages/pricing";
import { connect } from "react-redux";

const VIEW_LIST = "LIST";
const VIEW_GRID = "GRID";

const ProjectList = ({ getPackage }) => {
  useEffect(() => {
    getPackage()
  }, [])
  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center" className="py-4">
            <h2>Pricing </h2>
          </Flex>
        </div>
      </PageHeaderAlt>
      <Pricing />
    </>
  );
};

// export default ProjectList;
export default connect(null, { getPackage })(ProjectList)