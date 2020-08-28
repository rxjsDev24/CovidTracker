import React from 'react';
import classes from './Boxes.module.css';
import Box from './Box/Box';

const Boxes = (props) => {
    let active = +props.data.Active;
    let deaths = +props.data.Deceased;
    let recover = +props.data.Recovered;
    let confirmed = +props.data.Confirmed;
    return (
        <div className={classes.Boxes}>
            <Box
                title={'Confirmed'}
                count={confirmed}
                color={'#ff073a20'}
                text={'#ff073fde'} />
            <Box
                title={'Active'}
                count={active}
                color={'#007bff2b'}
                text={'#007bfffd'} />
            <Box
                title={'Recovered'}
                count={recover}
                color={'#28a7452e'}
                text={'#28a745f4'} />
            <Box
                title={'Deceased'}
                count={deaths}
                color={'#6c757b2e'}
                text={'#6c757fd9'} />
        </div>
    )
}
export default Boxes;