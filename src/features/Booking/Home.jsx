import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Layout from '../../HOCs/Layout';
import HomeCarousel from './components/HomeCarousel';
import HomeTabs from './components/HomeTabs';
import MovieList from './components/MovieList';
import { fetchBanners, fetchInfoTheater, fetchMovies } from './thunk';

const Home = () => {
    const dispatch = useDispatch();
    const [useSearch, setSearchParam] = useSearchParams();

    useEffect(() => {
        dispatch(fetchBanners);
        dispatch(fetchInfoTheater)
    }, [])

    useEffect(() => {
        dispatch(fetchMovies(useSearch.get('page')))
    }, [useSearch.get('page')])
    return (
        <Layout>
            <HomeCarousel />
            <MovieList />
            <HomeTabs />
           
           
        </Layout>
    );
};

export default Home;