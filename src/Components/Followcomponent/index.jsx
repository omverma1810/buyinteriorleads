import React, { useContext } from 'react';
import CountContext from '../../Context/index';

const FollowComponent = () => {
  const { count } = useContext(CountContext);

  return (
    <div style={{height:400 , width:400 , justifyContent:'center',alignItems:'center',backgroundColor:'purple'}}>
        <h1>follow count screen or page</h1>
      <h2>Updated Count: {count}</h2>
    </div>
  );
};

export default FollowComponent;
