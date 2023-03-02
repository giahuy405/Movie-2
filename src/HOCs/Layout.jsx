import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
const Layout = (props) => {
    return (
        <div>
            <Header />
            <div className='mt-14'></div>
            {props.children}
            <Footer />
            <Loading/>
        </div>
    );
};

export default Layout;