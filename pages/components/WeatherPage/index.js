function WeatherPage(props) {

    useEffect(() => {
        const fetchForecast = async () => {
            // const res = await fetch('url');
            // const data = await res.json();

            // return fetchCallback(JSON.parse(data));
        } 

        fetchForecast();
    }, []);

    return (
        <div></div>
    );
}

export default WeatherPage;