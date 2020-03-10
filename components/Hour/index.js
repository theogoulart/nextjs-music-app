function Hour(props) {
    const date = new Date(props.info.dt * 1000);
    const todaysDate = new Date().getDate();
    let formatedDate;

    formatedDate = date.getHours() + 'h';

    return (
        <div className="hour">
            <p className="mt-3"><small className="font-weight-bold">{formatedDate}</small></p>
            <hr/>
            <p><small>{parseInt(props.info.main['temp'])}ºC</small></p>
            <img height="50" width="50" src={"http://openweathermap.org/img/wn/" + props.info.weather[0].icon + ".png"} />
            <p className="description m-2"><small>{props.info.weather[0].description}</small></p>
            <style jsx>{`
            .hour {
                text-align: center;
            }
            .description {
                height: 40px;
                max-width: 60px;
                line-height: 1.2;
            }
            `}</style>
        </div>
    );
}

export default Hour;