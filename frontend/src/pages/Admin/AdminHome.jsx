import React from "react";
import AdminCategoryFilter from "../../components/admin/AdminCategoryFilter";
import AdminProductList from "../../components/admin/AdminProductList";
import Navbar from "../../components/Navbar";

const AdminHome = () => {
  return (
    <div>
      <Navbar>
        <AdminCategoryFilter>
          <AdminProductList></AdminProductList>
        </AdminCategoryFilter>
      </Navbar>
    </div>
  );
};

export default AdminHome;
