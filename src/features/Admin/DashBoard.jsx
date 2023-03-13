import { Breadcrumb } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import AdminLayout from '../../HOCs/AdminLayout';



const DashBoard = () => {
  return (
    <AdminLayout>
      <Breadcrumb
      >
        Admin / User
      </Breadcrumb>
      <Content
         
      >

        <div
          style={{
            padding: 24,
            minHeight: 360,
          }}
        >
          nôi dung
        </div>
      </Content>
    </AdminLayout>
  );
};

export default DashBoard;