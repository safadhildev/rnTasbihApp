import React, {useEffect} from 'react';
import date from '../Date';

const useTime = () => {
  const [currentTime, setCurrentTime] = React.useState(date.getCurrentTime());

  useEffect(() => {
    const startTimer = setInterval(() => {
      setCurrentTime(date.getCurrentTime());
    }, 1000);
    return () => clearInterval(startTimer);
  }, [currentTime]);

  return {currentTime};
};

export default useTime;
