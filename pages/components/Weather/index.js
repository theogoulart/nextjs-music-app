import Link from 'next/link';

function Weather(props) {
  const date = new Date(props.info.dt * 1000);
  const todaysDate = new Date().getDate();
  let formatedDate;

  switch (date.getDate()) {
    case todaysDate:
      formatedDate = 'today';
    break;
    case todaysDate + 1:
      formatedDate = 'tomorrow';
    break;
    default:
      formatedDate = date.getDate() + 
      '/' + (date.getMonth() + 1);
    break;
  }

  return (
    <Link href="/about">
      <button className="card text-white m-2 text-left">
        <div className="card-body">
          <img className="mb-2" height="100" width="100" src={"http://openweathermap.org/img/wn/" + props.info.weather[0].icon + "@2x.png"} />
          <p>{parseInt(props.info.main['temp'])}ºC</p>
          <p>{props.info.weather[0].main}</p>
          <p className="mt-3 text-right"><small className="font-weight-bold">{formatedDate}</small></p>
        </div>
      </button>
    </Link>
  );
}

export default Weather;