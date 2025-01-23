import { StyleSheet, Image, Platform, ScrollView, Dimensions, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import SwipeButton from 'rn-swipe-button';

/**
 * Follow below steps to test live changes of rn-swipe-button.
 * 1. Copy 'src' folder from RNSwipeButton to 'RNSwipeButtonDemo/app/(tabs)/' folder
 * 2. Comment above SwipeButton import and uncomment below one
 *
 * Note: NPM linking has some issue react-native/HAUL build tools.
 */
// import SwipeButton from './src/components/SwipeButton';
import { useCallback, useState } from 'react';
import { Cell2, RenderSubHeading } from '.';

export default function TabTwoScreen() {
  const [enableScroll, setEnableScroll] = useState(true)

  const enableTheScroll = useCallback(() => {
    setEnableScroll(true)
  }, [])

  const disableTheScroll = useCallback(() => {
    setEnableScroll(false)
  }, [])

  return (
    <ScrollView scrollEnabled={enableScroll} style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}>
      <HandleOrientationChange onSwipeStart={disableTheScroll} onSwipeSuccess={enableTheScroll} onSwipeFail={enableTheScroll}/>
      </View>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
    
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ScrollView>
  );
}

function HandleOrientationChange(
  props: any
) {
  
  const DEFAULT_REMAING_SWIPE_COMPLETE_ANIM_DURATION = 400
  const [finishSwipeAnimDuration, setFinishSwipeAnimDuration] = useState(DEFAULT_REMAING_SWIPE_COMPLETE_ANIM_DURATION)

  // Save this state immutable to orientation change
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false)
  
  return (
    <Cell2>
      <RenderSubHeading heading='Handle orientation change' />
      <SwipeButton
        finishRemainingSwipeAnimationDuration={finishSwipeAnimDuration}
        forceCompleteSwipe={ (forceComplete: any) => {
          if (isFeedbackSubmitted) {
            // Set to 0 to complete the swipe quickly on orientation change
            setFinishSwipeAnimDuration(0)
            forceComplete()
          }
        }}
        title="Slide to submit"
        onSwipeSuccess={(isForceComplete) => { 
          props.onSwipeSuccess()
            if (isForceComplete) {
              // Reset it to default value
              setFinishSwipeAnimDuration(DEFAULT_REMAING_SWIPE_COMPLETE_ANIM_DURATION)
            } else {
              // your existing onSuccess callback code
              setIsFeedbackSubmitted(true)
            }
          }
        }
        onSwipeFail={props.onSwipeFail}
        onSwipeStart={props.onSwipeStart}
        width={300}
        containerStyles={{width: '100%'}}
      />
    </Cell2>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 72,
    padding: 10,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
