import './Location.scss'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Image from '../../components/Image';

const Locations = () => {
    const {data: location, loading: loadingLocation} = useSelector(state => state.location);
    
  return (
    <div className="location">
        <div className="location__logo">
            <Image src={`https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png`} className={'location__logoimg'} />
        </div>
        <div className="location__menu">
        <Link className='location__anchor' to={`/`}>
            Character List
        </Link>
        &nbsp;| Character by Location
        </div>
        <div style={
            {
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '10px',
                marginBottom: '20px'
            }
        }>
            {location ? location.map((item, index) => (
                <Link className='' to={`/location/${encodeURIComponent(JSON.stringify(item.id))}`} key={item.id} style={
                    {
                        color: 'black',
                        textDecoration: 'none'
                    }
                }>
                    ● {item.name}
                </Link>
            )) : (
                <div>Loading...</div>
            )}
        </div>
    </div>
  )
}

export default Locations