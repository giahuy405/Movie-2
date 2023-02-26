import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieItem from './MovieItem';
import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';
const MovieList = () => {
    const dispatch = useDispatch();
    const { movies } = useSelector(state => state.bookingReducer);
    const [useSearch,setSearchParam] = useSearchParams();
    
    return (
        <div className='max-w-4xl mx-auto' id='lichChieu'>
            <h1 className='text-center text-4xl font-bold my-10'>DANH SÁCH PHIM</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-6 p-2 lg:grid-cols-4'>
                {movies.items?.map(item =>
                    <MovieItem key={item.maPhim} item={item} />
                )}
            </div>
            {/* pageSize phải bằng số soPhanTuTrenTrang */}
            {/* totalCount là toàn bộ phim 23 bộ */}
            <Pagination current={+useSearch.get('page')} className='mt-6 mb-10' pageSize={8} total={movies.totalCount} onChange={(page, pageSize) => {
                setSearchParam({ page })
            }} />
        </div>
    );
};

export default MovieList;