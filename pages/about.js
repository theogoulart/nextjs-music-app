import Head from 'next/head';
import styles from './App.module.css';

class About extends React.Component {

    constructor () {
        super();
        this.state = {};
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
                about
            </div>
            </div>
            </React.Fragment>
        );
    }
}

export default About;