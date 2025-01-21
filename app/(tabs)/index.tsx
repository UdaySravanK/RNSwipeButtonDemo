import { View, Text, Button, ScrollView } from 'react-native';

import { SetStateAction, useCallback, useState } from 'react';
import styles from './styles';
import SwipeButton from 'rn-swipe-button';

/**
 * Follow below steps to test live changes of rn-swipe-button.
 * 1. Copy 'src' folder from RNSwipeButton to 'RNSwipeButtonDemo/app/(tabs)/' folder
 * 2. Comment above SwipeButton import and uncomment below one
 *
 * Note: NPM linking has some issue react-native/HAUL build tools.
 */
// import SwipeButton from './src/components/SwipeButton';

export default function HomeScreen() {
  
  const [enableScroll, setEnableScroll] = useState(true)

  const enableTheScroll = useCallback(() => {
    setEnableScroll(true)
  }, [])

  const disableTheScroll = useCallback(() => {
    setEnableScroll(false)
  }, [])

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

function RenderSubHeading(props: any) {
  return (<Text style={styles.subHeading}>{props.heading}</Text>)
}

const Cell = (props: any) => {
  return(
    <View style={styles.cell}> {props.children} </View>
  )
}

const Cell2 = (props: any) => {
  return(
    <View style={styles.cell2}> {props.children} </View>
  )
}

function DisabledStateDemo() {
  return (
    <Cell>
      <RenderSubHeading heading='Disabled' />
      <SwipeButton thumbIconImageSource={require('@/assets/images/arrow-right.png')} disabled />
    </Cell>
  )
}

function ForceResetAndForceCompleteSwipeDemo() {
  let forceResetLastButton: any = null;
  let forceCompleteCallback: any = null;
  const [finishSwipeAnimDuration, setFinishSwipeAnimDuration] = useState(400)
  
  const forceCompleteButtonCallback = useCallback(() => {
    setFinishSwipeAnimDuration(0)
    forceCompleteCallback()
  }, [])

  const forceResetButtonCallback = useCallback(() => {
    forceResetLastButton()
    setInterval(() => setFinishSwipeAnimDuration(400) , 1000)
  }, [])
  
  return (
    <Cell2>
      <RenderSubHeading heading='Set a component as thumb icon & use forceCompleteSwipe or forceReset' />
      <SwipeButton
        disableResetOnTap
        forceReset={ (reset: any) => {
          forceResetLastButton = reset
        }}
        finishRemainingSwipeAnimationDuration={finishSwipeAnimDuration}
        forceCompleteSwipe={ (forceComplete: any) => {
          forceCompleteCallback = forceComplete
        }}
        railBackgroundColor="#9fc7e8"
        railStyles={{
          backgroundColor: '#147cbb',
          borderColor: '#880000FF',
        }}
        thumbIconBackgroundColor="#FFFFFF"
        thumbIconImageSource={require('@/assets/images/react-logo.png')}
        title="Slide to unlock"
      />
      <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.button} onPress={forceCompleteButtonCallback}>Force Complete</Text>
        <Text style={styles.button} onPress={forceResetButtonCallback}>Force Reset</Text>
      </View>
    </Cell2>
  )
}

function SwipeStatusDemo() {
  const defaultStatusMessage = 'swipe status appears here';
  const [swipeStatusMessage, setSwipeStatusMessage] = useState(
    defaultStatusMessage,
  );

  const resetInterval = setInterval(() => setSwipeStatusMessage(defaultStatusMessage), 5000);
  const updateSwipeStatusMessage = (message: SetStateAction<string>) => { 
    clearInterval(resetInterval)
    setSwipeStatusMessage(message) 
  }

  const CheckoutButton = () => {
    return(
        <View style={{width: 100, height: 30, backgroundColor: '#C70039', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#ffffff'}}>Checkout</Text>
        </View>
    );
  }
  return (
    <Cell2>
      <Text style={styles.swipeStatus}>{swipeStatusMessage}</Text>
      <RenderSubHeading heading='Swipe status callbacks' />
      <SwipeButton
        containerStyles={{borderRadius: 5}}
        height={30}
        onSwipeFail={() => updateSwipeStatusMessage('Incomplete swipe!')}
        onSwipeStart={() => updateSwipeStatusMessage('Swipe started!')}
        onSwipeSuccess={() =>
          updateSwipeStatusMessage('Submitted successfully!')
        }
        railBackgroundColor="#31a57c"
        railStyles={{borderRadius: 5}}
        thumbIconComponent={CheckoutButton}
        thumbIconStyles={{borderRadius: 5}}
        thumbIconWidth={100} 
        title="Submit order"
      />
    </Cell2>
  )
}

function ReverseSwipeStatusDemo() {
  const defaultStatusMessage = 'swipe status appears here';
  const [swipeStatusMessage, setSwipeStatusMessage] = useState(
    defaultStatusMessage,
  );

  const resetInterval = setInterval(() => setSwipeStatusMessage(defaultStatusMessage), 5000);
  const updateSwipeStatusMessage = (message: SetStateAction<string>) => { 
    clearInterval(resetInterval)
    setSwipeStatusMessage(message) 
  }

  return (
    <Cell>
      <Text style={styles.swipeStatus}>{swipeStatusMessage}</Text>
      <RenderSubHeading heading='Reverse swipe enabled' />
      <SwipeButton
        enableReverseSwipe
        onSwipeSuccess={() => updateSwipeStatusMessage('Reverse swipe success!')}
        railBackgroundColor="#a493d6"
        thumbIconBackgroundColor="#FFFFFF"
        title="Slide to unlock"
      />
    </Cell>
  )
}

function SetHeightAndWidth() {
  const [disableCBButton, setDisableCBButton] = useState(false)
  return (
    <Cell2>
      <RenderSubHeading heading='Set height and width' />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SwipeButton height={35} width={150} title="Swipe" disabled={disableCBButton} />
        <View style={{ marginLeft: 5, width: 140, height: 48 }}><Button onPress={() => setDisableCBButton(!disableCBButton)} title="Toggle disable" /></View>
      </View>
    </Cell2>
  )
}

function ResetAfterSuccessfulSwipe() {
  return (
    <Cell>  
      <RenderSubHeading heading='Set height & reset after successful swipe' />
      <SwipeButton height={25} shouldResetAfterSuccess={true} resetAfterSuccessAnimDelay={1000} />
    </Cell> 
  )
}

function SetImageToThumbIcon() {
  return (
    <Cell>
      <RenderSubHeading heading='Set .png image as thumb icon' />
      <SwipeButton thumbIconImageSource={require('@/assets/images/thumb-icon.png')} railBackgroundColor="#cfb0dd"
      />
    </Cell>  
  )
}