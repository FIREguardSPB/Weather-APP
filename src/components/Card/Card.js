import {useEffect, useState} from 'react'
import style from './Card.module.css'
import trash from '../../img/trash.png'
import config from '../../config/default.json';
const Card = ({city, reload, setReload}) => {
    const API = config.API
    console.log(API)
    let [ownData, setOwnData] = useState()
    useEffect(() => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&lang=ru&units=metric`)
            .then(data => data.json())
            .then(res => setOwnData(res))

    }, [])
    const DeleteCard = () => {
        let arrCity = JSON.parse(localStorage.getItem('weatherData'))
        arrCity.splice((arrCity.indexOf(city)), 1)
        localStorage.setItem('weatherData', JSON.stringify(arrCity))
        setReload(prev => prev + 1)
    }

    return (
        <>
            <div className={style.cardBody}>
                <div className={style.cityName}>
                    {city}
                </div>
                <>
                    <div className={style.trash} onClick={DeleteCard}><img src={trash}/></div>
                </>
                <div className={style.mainInfo}>
                    <div className={style.temperature}>
                        {ownData && Math.floor(ownData.main.temp)}
                    </div>
                    <div className={style.icon}>
                        <img src={`http://openweathermap.org/img/wn/${ownData && ownData.weather[0].icon}@2x.png`}
                             alt={`weather-icon`}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;