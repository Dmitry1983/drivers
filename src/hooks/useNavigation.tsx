import {
  useNavigation as RNuseNavigation,
  NavigationProp,
} from '@react-navigation/native';
import {RootStackParamList} from '../appNavigation';

type NavigateParams<T extends keyof RootStackParamList> = {
  screen: T;
  params: RootStackParamList[T];
};

export const useNavigation = () => {
  const navigation = RNuseNavigation<NavigationProp<RootStackParamList>>();

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  // Дженерик T — экран, params — параметры для этого экрана
  const handleGoTo = <T extends keyof RootStackParamList>({
    screen,
    params,
  }: NavigateParams<T>): void => {
    navigation.navigate(screen, params);
  };

  return {handleGoBack, handleGoTo};
};
