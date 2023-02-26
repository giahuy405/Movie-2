import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RouteComponent = ({ isAuth, isPrivate, Component, redirectPath }) => {
    // lấy infor dưới reducer 
    const { infoUser } = useSelector(state => state.authReducer);
    const token = localStorage.getItem('userToken');
    // chỉ được vào khi đã login 
    if (isPrivate) {
        return token ? <Component /> : <Navigate to={redirectPath} />
    }
    // chỉ dc vào khi chưa đăng nhập
    if (isAuth) {
        return !infoUser ? <Component /> : <Navigate to={redirectPath} />
    }
    return (
        <Component />
    );
};

export default RouteComponent;