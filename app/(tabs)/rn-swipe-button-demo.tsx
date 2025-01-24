import { View, Text, Button, StyleSheet } from 'react-native';

import { SetStateAction, useCallback, useState } from 'react';
import SwipeButton from 'rn-swipe-button';

/**
 * Follow below steps to test live changes of rn-swipe-button.
 * 1. Copy 'src' folder from RNSwipeButton to 'RNSwipeButtonDemo/app/(tabs)/' folder
 * 2. Comment above SwipeButton import and uncomment below one
 *
 * Note: NPM linking has some issue react-native/HAUL build tools.
 */
// import SwipeButton from './src/components/SwipeButton';

export function RenderSubHeading(props: any) {
    return (<Text style={DemoStyles.subHeading}>{props.heading}</Text>)
}
  
export function DisabledStateDemo() {
    return (
        <View style={DemoStyles.cell}>
            <RenderSubHeading heading='Disabled' />
            <SwipeButton thumbIconImageSource={require('@/assets/images/arrow-right.png')} disabled />
        </View>
    )
}

export function ForceResetAndForceCompleteSwipeDemo() {
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
        <View style={DemoStyles.cell2}>
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
                <Text style={DemoStyles.button} onPress={forceCompleteButtonCallback}>Force Complete</Text>
                <Text style={DemoStyles.button} onPress={forceResetButtonCallback}>Force Reset</Text>
            </View>
        </View>
    )
}

export function SwipeStatusDemo() {
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
        <View style={DemoStyles.cell2}>
            <Text style={DemoStyles.swipeStatus}>{swipeStatusMessage}</Text>
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
        </View>
    )
}

export function ReverseSwipeStatusDemo() {
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
        <View style={DemoStyles.cell}>
            <Text style={DemoStyles.swipeStatus}>{swipeStatusMessage}</Text>
            <RenderSubHeading heading='Reverse swipe enabled' />
            <SwipeButton
                enableReverseSwipe
                onSwipeSuccess={() => updateSwipeStatusMessage('Reverse swipe success!')}
                railBackgroundColor="#a493d6"
                thumbIconBackgroundColor="#FFFFFF"
                title="Slide to unlock"
            />
        </View>
    )
}

export function SetHeightAndWidth() {
    const [disableCBButton, setDisableCBButton] = useState(false)
    return (
        <View style={DemoStyles.cell2}>
            <RenderSubHeading heading='Set height and width' />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SwipeButton height={35} width={150} title="Swipe" disabled={disableCBButton} />
                <View style={{ marginLeft: 5, width: 140, height: 48 }}><Button onPress={() => setDisableCBButton(!disableCBButton)} title="Toggle disable" /></View>
            </View>
        </View>
    )
}

export function ResetAfterSuccessfulSwipe() {
    return (
        <View style={DemoStyles.cell}>  
            <RenderSubHeading heading='Set height & reset after successful swipe' />
            <SwipeButton height={25} shouldResetAfterSuccess={true} resetAfterSuccessAnimDelay={1000} />
        </View> 
    )
}

export function SetImageToThumbIcon() {
    return (
        <View style={DemoStyles.cell}>
            <RenderSubHeading heading='Set .png image as thumb icon' />
            <SwipeButton thumbIconImageSource={require('@/assets/images/thumb-icon.png')} railBackgroundColor="#cfb0dd"
            />
        </View>  
    )
}

export function HandleOrientationChange(props: any) {
    
    const DEFAULT_REMAING_SWIPE_COMPLETE_ANIM_DURATION = 400
    const [finishSwipeAnimDuration, setFinishSwipeAnimDuration] = useState(DEFAULT_REMAING_SWIPE_COMPLETE_ANIM_DURATION)
  
    // Save this state immutable to orientation change
    const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false)
    
    return (
        <View style={DemoStyles.cell}>
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
          onSwipeSuccess={(isForceComplete: boolean) => { 
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
      </View>
    )
  }

  const DemoStyles = StyleSheet.create({
    swipeStatus: {
        color: '#FF0000',
        fontSize: 15,
        paddingVertical: 3,
        marginVertical: 5,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 1,
        textAlign: 'center',
    },
    subHeading: {color: '#140866', fontSize: 15},
    title: {
        color: '#700D99',
        fontSize: 20,
        paddingBottom: 5,
        textAlign: 'center',
    },
    cell: {
        backgroundColor: '#93d2f9',
        borderColor: '#2284c0',
        borderRadius: 5,
        borderWidth: 1,
        padding: 5,
        marginBottom: 5, 
    },
    cell2: {
        backgroundColor: '#cfe89f',
        borderColor: '#5b860a',
        borderRadius: 5,
        borderWidth: 1,
        padding: 5,
        marginBottom: 5, 
    },
    scrollview: {
        backgroundColor: '#ffffff',
        marginVertical: 64,
        paddingHorizontal: 15
    },
    button: {
        backgroundColor: '#c0bab3',
        borderColor: '#5b860a',
        borderRadius: 5,
        borderWidth: 1,
        padding: 5,
        marginTop: 5,
        marginRight: 15,
    }
});


export default {
    RenderSubHeading,
    DisabledStateDemo,
    SwipeStatusDemo,
    ReverseSwipeStatusDemo,
    ForceResetAndForceCompleteSwipeDemo,
    SetImageToThumbIcon,
    SetHeightAndWidth,
    ResetAfterSuccessfulSwipe,
    HandleOrientationChange,
}