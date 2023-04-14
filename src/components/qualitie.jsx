import React from 'react';

const Qualitie = (props) => {
  return (
    <div className={"badge m-1 bg-" + props.color}>{props.name}</div>
  );
};

export default Qualitie;