import React from "react";
import Navbar from "../../components/Navbar";
import AdminOrder from "../../containers/admin/AdminOrder";

const AdminOrderPage = () => {
  return (
    <div>
      <Navbar>
        <AdminOrder></AdminOrder>
      </Navbar>
    </div>
  );
};

export default AdminOrderPage;
