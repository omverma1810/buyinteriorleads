import React, { useContext } from 'react';
import CountContext from '../../Context/index';

const HomeComponent = () => {
  const { count, incrementCount } = useContext(CountContext);

  return (
    <div style={{height:400 , width:400 , backgroundColor:'purple',justifyContent:'center',alignItems:'center'}}>
      <h1>home Page</h1>
      <h1>Count: {count}</h1>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
};

export default HomeComponent;

