import React from "react";

import { useParams } from "react-router-dom";
import AdminProductOverview from "../../components/admin/AdminProductOverview";
import Navbar from "../../components/Navbar";

const AdminProductOverviewPage = () => {
  const params = useParams();
  return (
    <div>
      <Navbar>
        <AdminProductOverview params={params}></AdminProductOverview>
      </Navbar>
    </div>
  );
};

export default AdminProductOverviewPage;
