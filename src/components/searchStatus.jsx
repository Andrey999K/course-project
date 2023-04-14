import React from 'react';

const SearchStatus = ({number}) => {

  if (number !== 0) {
    let phrase = "";
    if (number > 1 && number < 5) phrase = "человека тусанут";
    else phrase = "человек тусанёт";
    return <h1><span className="badge bg-primary">{number} {phrase} с тобой сегодня</span></h1>;
  } else {
    return <h1><span className="badge bg-danger">Никто с тобой не тусанёт</span></h1>;
  }

};

export default SearchStatus;