import React from 'react';

// import GridCarousal from './components/Carousal';
import Header from 'components/header/header';
import style from './SportsLive.module.css';

const SportsLive = () => {
    return (
        <>
            <Header />

            <div className={style.body}>{/* <GridCarousal /> */}</div>
        </>
    );
};

export default SportsLive;
