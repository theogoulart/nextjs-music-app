import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout/index';
import Hour from '../components/Hour/index';

function Forecast (props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const curDate = new Date(props.date);
    const formatedCurDate = monthNames[curDate.getMonth()] + ' ' +  curDate.getDate() + ', ' + curDate.getFullYear();

    return (
        <Layout>
            <h1>
                {`${props.city}, ${props.country}`}
            </h1>
            <h2 className="mb-3">
                <small>{formatedCurDate}</small>
            </h2>
            <div className="weather__container">

                <div className="card text-white m-1 text-left">
                    <div className="card-body">
                    {props.forecasts.map((v,i,a) => {
                        let itemDate = new Date(v.dt * 1000).getDate();
                        let selectedDate = new Date(props.date).getDate();

                        if (itemDate !== selectedDate) {
                            return;
                        }

                        return <Hour key={i} info={v}></Hour>;
                    })}
                    </div>
                </div>
            </div>
            <style jsx>{`
            .weather__container, .card-body {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
            }
            `}</style>
        </Layout>
    );
}

Forecast.getInitialProps = async (ctx) => {
    if (!! isNaN(ctx.query.id)) {
        return { forecasts: [] };
    }

    const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?id='+ctx.query.id+'&units=metric&appid=' + process.env.weatherApiKey);
    const data = await res.json();

    if (! ctx.query.date) {
        const d = new Date();
        ctx.query.date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }

    return { 
        forecasts: data.list, 
        date: ctx.query.date,
        city: data.city.name, 
        country: data.city.country, 
        cityId: data.city.id 
    };
}

export default Forecast;