import fetch from 'isomorphic-unfetch';
import Layout from './components/Layout/index';
import Weather from './components/Weather/index';
import Select from 'react-select';

const options = [
    { value: '3448439', label: 'São Paulo' },
    { value: '3451190', label: 'Rio de Janeiro' },
    { value: '6322752', label: 'Curitiba' },
    { value: '3394023', label: 'Natal' },
];

class App extends React.Component {

    static async getInitialProps () {
        const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?id=3448439&units=metric&appid=' + process.env.weatherApiKey);
        const data = await res.json();

        return {
            forecasts: data.list, 
            city: data.city.name, 
            country: data.city.country, 
            cityId: data.city.id 
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            forecasts: props.forecasts,
            city: props.city, 
            country: props.country,
            cityId: props.cityId
        };
    }

    handleChange = async (selectedOption) => {
        const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?id=' + selectedOption.value + '&units=metric&appid=' + process.env.weatherApiKey);
        const data = await res.json();

        this.setState((state) => {
            return {
                forecasts: data.list, 
                city: data.city.name, 
                country: data.city.country, 
                cityId: data.city.id
            };
        });
    };

    render () {
        return (
            <Layout>
                <div className="heading">
                    <h1>
                        <small>Weather in</small> <strong>{`${this.state.city}, ${this.state.country}`}</strong>
                    </h1>
                    <Select
                        value={this.state.cityId}
                        onChange={this.handleChange}
                        options={options}
                    />
                </div>
                <div className="weather__container">
                    {this.state.forecasts.map((v,i,a) => {
                        let curDate = new Date(v.dt * 1000).getDate();
                        let prevDate = i !== 0 ? new Date(a[i-1].dt * 1000).getDate() : false;

                        if (curDate === prevDate) {
                            return;
                        }

                        return <Weather id={this.state.cityId} key={i} info={v}></Weather>;
                    })}
                </div>
                <style jsx>{`
                .heading {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 27px;
                    width: 100%;
                }

                .weather__container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }
                `}</style>
            </Layout>
        );
    }
}

export default App;