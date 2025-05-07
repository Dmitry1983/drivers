import {
  useNavigation as RNuseNavigation,
  NavigationProp,
} from '@react-navigation/native';

type NavigateParams = {
  screen: string;
  params?: Record<string, unknown>;
};

export const useNavigation = () => {
  const navigation =
    RNuseNavigation<NavigationProp<ReactNavigation.RootParamList>>();

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  const handleGoTo = ({screen, params}: NavigateParams): void => {
    navigation.navigate(screen as never, params as never);
  };

  return {handleGoBack, handleGoTo};
};
