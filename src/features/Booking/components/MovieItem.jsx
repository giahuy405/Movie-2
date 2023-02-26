import React from 'react';
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';

const { Meta } = Card;
const MovieItem = (props) => {
    const { item } = props;
    console.log('item', item)
    return (
        <Card
            style={{ height: 580 }}
            hoverable
            cover={<img className='h-96 object-cover' alt="example" src={item.hinhAnh} />}

        >


            <div className=''>
                <div>
                    <Meta title={item.tenPhim} description={item.moTa.length > 60 ? item.moTa.slice(0, 60) + '...' : item.moTa} />
                </div>
                <div className='absolute bottom-3 w-full left-0 px-4'>
                    <NavLink className='rounded-lg p-2 font-bold text-center block bg-orange-600 hover:bg-black hover:text-white' to={`/detail/${item.maPhim}`} >ĐẶT VÉ</NavLink>
                </div>
            </div>


        </Card>
    )

};

export default MovieItem;