import { View, Text, Button, StyleSheet } from 'react-native';

import React, { SetStateAction, useCallback, useEffect, useState } from 'react';

import { FontAwesome6 } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withDelay, withSequence } from "react-native-reanimated";
import SwipeButton from "rn-swipe-button";
/**
 * Follow below steps to test live changes of rn-swipe-button.
 * 1. Copy 'src, types.d.tsx, index.js and package.json' from RNSwipeButton to 'RNSwipeButtonDemo/app/(tabs)/source' folder
 * 2. Comment above SwipeButton import and uncomment below one
 *
 * Note: NPM linking has some issue react-native/HAUL build tools.
 */
// import SwipeButton from './source/index';

export function RenderSubHeading(props: any) {
    return (<Text style={{...DemoStyles.subHeading, ...props.style}}>{props.heading}</Text>)
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

const AnimatedComponent = ({ delay, icon, color, size, waitDuration, swiped }: { delay: number, icon: string, color: string, size: number, waitDuration: number, swiped: boolean }) => {
    const opacity = useSharedValue(0.1);

    useEffect(() => {
        opacity.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(1, { duration: 300 }),
                    withTiming(0.1, { duration: 300 }),
                    withTiming(0.1, { duration: waitDuration }),
                ),
                -1,
                false
            )
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: swiped ? 0.02 : opacity.value,
    }));

    return (
        <Animated.View style={[animatedStyle]}>
            <FontAwesome6 name={icon} iconStyle="solid" size={size} color={color} />
        </Animated.View>
    );
};
const TripleArrowAnimated = (props: { delay: number; icon: string; color: string; size: number; waitDuration: number; swiped: boolean; }) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5}}>
            <AnimatedComponent delay={props.delay * 0} icon={props.icon} color={props.color} size={props.size} waitDuration={props.waitDuration} swiped={props.swiped} />
            <AnimatedComponent delay={props.delay * 1} icon={props.icon} color={props.color} size={props.size} waitDuration={props.waitDuration} swiped={props.swiped} />
            <AnimatedComponent delay={props.delay * 2} icon={props.icon} color={props.color} size={props.size} waitDuration={props.waitDuration} swiped={props.swiped} />
        </View>
    );
};

export function CustomTitle() {
    const [swiped, setSwiped] = useState(false);
    return (
        <View style={{...DemoStyles.cell2}}>
            <RenderSubHeading heading='Custom title' style={{paddingBottom: 5}} />
            <SwipeButton
                containerStyles={{
                    borderRadius: 16,
                    margin: 0
                }}
                railStyles={{
                    borderRadius: 14
                }}
                thumbIconStyles={{
                    borderRadius: 18,
                    transform: [{scale: .9}]
                }}
                railBackgroundColor="rgba(55, 55, 55, 1)"
                railBorderColor="rgba(255, 255, 255, 0)"
                railFillBackgroundColor="rgba(252, 255, 87, 0.2)"
                railFillBorderColor="rgba(255, 255, 255, 0)"
                thumbIconBackgroundColor="rgba(188, 156, 87, 1)"
                thumbIconBorderColor="rgba(252, 255, 87, 0)"
                thumbIconComponent={() => (<FontAwesome6 name="gear" iconStyle="solid" size={28} />)}
                titleComponent={() => (<TripleArrowAnimated icon="chevron-right" size={18} color="#FFFFFF" delay={100} waitDuration={2000} swiped={swiped} />)}
                height={55}
                onSwipeSuccess={() => setSwiped(true)}
                onSwipeFail={() => setSwiped(false)}
                onSwipeStart={() => setSwiped(true)}
            />
        </View>
    );
};

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
    CustomTitle,
}