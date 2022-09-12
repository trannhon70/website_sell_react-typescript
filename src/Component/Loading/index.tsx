import React, { FC } from 'react';

const Loading: FC =() => {
    return (
        <div style={{position:'relative'}}>
            <div style={{position:'fixed', top:'50%', left:'50%' ,transform:'translate(-50%, -50%)',fontSize:'60px', color:'white'}}>Loading...</div>
        </div>
    );
}

export default Loading;