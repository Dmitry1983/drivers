import React from 'react';
import {useNavigation} from '@src/hooks';

type SeasonProps = {
  children: (
    goToSeasonHandler: (season: string, driverId: string) => void,
  ) => React.ReactNode;
};

export const Season: React.FC<SeasonProps> = ({children}) => {
  const {handleGoTo} = useNavigation();

  const goToSeasonHandle = (season: string, driverId: string) => {
    console.log({season, driverId});
    handleGoTo({
      screen: 'Race',
      params: {title: season, driverId},
    });
  };

  return <>{children(goToSeasonHandle)}</>;
};
