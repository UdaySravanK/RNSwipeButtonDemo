import { View, Text } from 'react-native';

import styles from './styles';
import { DisabledStateDemo, ForceResetAndForceCompleteSwipeDemo, ResetAfterSuccessfulSwipe, ReverseSwipeStatusDemo, SetHeightAndWidth, SetImageToThumbIcon, SwipeStatusDemo } from './rn-swipe-button-demo';

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Swipe Button</Text>
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

