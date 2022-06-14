import './Home.scss'
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestCharacters, processingCharacters, failedCharacters } from "../../redux/actions/character/character";
import { requestLocations } from '../../redux/actions/location/location';
import axios from "axios";
import { Link } from "react-router-dom";
import Image from '../../components/Image';

const Home = () => {
    const {data, loading} = useSelector(state => state.character);
    const {data: location, loading: loadingLocation} = useSelector(state => state.location);
    const [currentPageData, setCurrentPageData] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(processingCharacters());

        const fetchData = async () => {
            for (let index = 1; index < 43; index++) {
                let request = await axios.get(`https://rickandmortyapi.com/api/character?page=${index}`);
                console.log(`https://rickandmortyapi.com/api/character?page=${index}`);
                dispatch(requestCharacters(request.data.results));
            }
            const requestLocation = await axios.get(`https://rickandmortyapi.com/api/location`);
            dispatch(requestLocations(requestLocation.data.results));
        }
        if (data.length === 0 && location.length === 0) {
            fetchData();
        }
    }, [currentPageData, dispatch]);

    return (
        <div className="home">
            <div className="home__logo">
                <Image src={`https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png`} className={'home__logoimg'} />
            </div>
            <div className="home__menu">
                Character List |&nbsp;
                <Link className='home__anchor' to={`/locations/`}>
                    Character by Location
                </Link>
            </div>
            <div className="home__container">
                {data ? data.map((item, index) => (
                    <Link className='home__anchor' to={`/character/${encodeURIComponent(JSON.stringify(item))}`} key={index}>
                        <Image src={item.image} alt={item.name} className={'home__image'} />
                    </Link>
                )) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )
}

export default Home