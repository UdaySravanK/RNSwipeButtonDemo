import { View, Text } from 'react-native';

import styles from './styles';
import { CustomTitle, DisabledStateDemo, ForceResetAndForceCompleteSwipeDemo, ResetAfterSuccessfulSwipe, ReverseSwipeStatusDemo, SetHeightAndWidth, SetImageToThumbIcon, SwipeStatusDemo } from './rn-swipe-button-demo';

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Swipe Button</Text>
      <CustomTitle />
      <DisabledStateDemo />
      <SwipeStatusDemo />
      <ReverseSwipeStatusDemo />
      <ForceResetAndForceCompleteSwipeDemo />
      <SetImageToThumbIcon />
      <SetHeightAndWidth />
      <ResetAfterSuccessfulSwipe /> 
    </View>
  );
}

