import React from "react";
import Navbar from "../../components/Navbar";
import AdminProductForm from "../../containers/admin/AdminProductForm";

const AdminProductFormPage = () => {
  return (
    <div>
      <Navbar>
        <AdminProductForm></AdminProductForm>
      </Navbar>
    </div>
  );
};

export default AdminProductFormPage;
