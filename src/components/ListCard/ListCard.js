import Card from "../Card/Card";

const ListCard = ({reload, setReload}) => {
    let dataCity = JSON.parse(localStorage.getItem('weatherData'))
    return (
        <>
            {dataCity && dataCity.map((e) => <Card key={`${e + Date.now()}`} city={e} reload={reload} setReload={setReload}/>)}
        </>
    );
};

export default ListCard;


