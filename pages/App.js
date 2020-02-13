import Head from 'next/head';
import Fetch from 'isomorphic-unfetch';
import styles from './App.module.css';
import Weather from './components/Weather/index';

class App extends React.Component {

    constructor () {
        super();
        this.state = {
            forecasts: []
        };
    }

    fetchWeatherForecast = async () => {
        if (! localStorage.getItem('weatherCache')) {
            const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?id=3448439&units=metric&appid=' + process.env.weatherApiKey);
            const data = await res.json();
            localStorage.setItem('weatherCache', JSON.stringify(data.list));
        }

        console.log(JSON.parse(localStorage.getItem('weatherCache')));
        this.setState((state) => {
            return { forecasts: JSON.parse(localStorage.getItem('weatherCache')) };
        });
    }

    componentDidMount() {
        this.fetchWeatherForecast();
    }

    render () {
        return (
            <React.Fragment>
            <Head>
            <title>Next.Js</title>
            <link rel="stylesheet" href="/static/bootstrap.min.css"/>
            </Head>
            <div className={styles['App']}>
            <div className={styles['App-body']}>
            {this.state.forecasts.map((v,i,a) => {
                let curDate = new Date(v.dt * 1000).getDate();
                let prevDate = i !== 0 ? new Date(a[i-1].dt * 1000).getDate() : false;

                if (curDate === prevDate) {
                    return;
                }

                return <Weather key={i} info={v}></Weather>;
            })}
            </div>
            </div>
            </React.Fragment>
        );
    }
}

export default App;