import {useEffect, useState} from "react";
import ListCard from "../ListCard/ListCard";
import style from './Widget.module.css'
import TextInput from 'react-autocomplete-input';
import cityData from '../data/city.list.json'
import 'react-autocomplete-input/dist/bundle.css';

function Widget() {
//Получаем массив городов из файла для автокомплита
    let [reload, setReload] = useState(0)
    let [stateInput, setStateInput] = useState(false)
    useEffect(() => console.log(), [stateInput]
    )
    useEffect(() => console.log(), [reload])
    //Обновление погоды каждые 20 минут
    setTimeout(() => {
        setReload(prev => prev + 1)
    },1000*60*20)
    let arr = []

    const addDataToLocalStorage = (e) => {
        let weatherData = localStorage.getItem('weatherData') && localStorage.getItem('weatherData') !== 'undefined' ? JSON.parse(localStorage.getItem('weatherData')) : []
        let cityCorrect = e.split('')
        cityCorrect.splice(cityCorrect.length - 1, 1)
        e = cityCorrect.join('')
        weatherData.push(e)
        localStorage.setItem('weatherData', JSON.stringify(weatherData))
        setReload(prev => prev + 1)
    }

    async function getArrayCity() {
        await cityData.map(el => arr.push(el.name))
    }

    return (
        <div className={style.widget}>
            <div className={style.container}>
                <div className={style.header}>
                    <div className={style.text}>ПОГОДА
                    </div>
                </div>

                {!localStorage.getItem('weatherData') || localStorage.getItem('weatherData') === 'undefined' ?
                    <>
                        <> Начните вводить название города на английском языке(в базе более 120 млн.городов)<TextInput className={style.input} options={getArrayCity() && arr} Component={"input"} trigger={''} onSelect={(e) => addDataToLocalStorage(e)}/></>
                    </>
                    :
                    <>
                        <> Начните вводить название города на английском языке(в базе более 120 млн.городов)<TextInput className={style.input} options={getArrayCity() && arr} Component={"input"} trigger={''}
                                                                                                                       onSelect={(e) => addDataToLocalStorage(e)}/></>
                        <ListCard reload={reload} setReload={setReload}/>
                    </>
                }

            </div>
        </div>
    );
}

export default Widget;
