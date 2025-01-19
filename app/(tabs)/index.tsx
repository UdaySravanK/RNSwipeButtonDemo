import { View, Text, Button, ScrollView } from 'react-native';

import { SetStateAction, useState } from 'react';
import styles from './styles';
import SwipeButton from 'rn-swipe-button';

/**
 * Follow below steps to test live changes of rn-swipe-button.
 * 1. Copy 'src' folder from RNSwipeButton to 'RNSwipeButton/examples/RNSwipeButtonDemo' folder
 * 2. Comment above SwipeButton import and uncomment below one
 *
 * Note: NPM linking has some issue react-native/HAUL build tools.
 */
// import SwipeButton from './src/components/SwipeButton';

export default function HomeScreen() {
  const [disableCBButton, setDisableCBButton] = useState(false)
  const defaultStatusMessage = 'swipe status appears here';
  const [swipeStatusMessage, setSwipeStatusMessage] = useState(
    defaultStatusMessage,
  );

  setInterval(() => setSwipeStatusMessage(defaultStatusMessage), 5000);
  const updateSwipeStatusMessage = (message: SetStateAction<string>) => setSwipeStatusMessage(message);
  const renderSubHeading = (heading: string) => (
    <Text style={styles.subHeading}>{heading}</Text>
  );
  let forceResetLastButton: any = null;
  
  const CheckoutButton = () => {
    return(
        <View style={{width: 100, height: 30, backgroundColor: '#C70039', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#ffffff'}}>Checkout</Text>
        </View>
    );
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

  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
          <Text style={styles.title}>React Native Swipe Button</Text>
          <Text style={styles.swipeStatus}>{swipeStatusMessage}</Text>
          <Cell>
            {renderSubHeading('Disabled')}
            <SwipeButton thumbIconImageSource={require('@/assets/images/arrow-right.png')} disabled />
          </Cell>
          <Cell2>
            {renderSubHeading('Swipe status callbacks')}
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
          <Cell>
            {renderSubHeading('Reverse swipe enabled')}
            <SwipeButton
              enableReverseSwipe
              onSwipeSuccess={() => updateSwipeStatusMessage('Slide success!')}
              railBackgroundColor="#a493d6"
              thumbIconBackgroundColor="#FFFFFF"
              title="Slide to unlock"
            />
          </Cell>
          <Cell2>
            {renderSubHeading('Set a component as thumb icon & use forceReset')}
            <SwipeButton
              disableResetOnTap
              forceReset={ (reset: any) => {
                forceResetLastButton = reset
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
            <View style={{ alignItems: 'center', marginBottom: 5 }}>
              <Button onPress={() => forceResetLastButton != null && forceResetLastButton()} title="Force reset" />
            </View>
          </Cell2>
          <Cell>
            {renderSubHeading('Set .png image as thumb icon')}
            <SwipeButton thumbIconImageSource={require('@/assets/images/thumb-icon.png')} railBackgroundColor="#cfb0dd"/>
          </Cell>  
          <Cell2>
            {renderSubHeading('Set height and width')}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SwipeButton height={35} width={150} title="Swipe" disabled={disableCBButton} />
              <View style={{ marginLeft: 5, width: 140, height: 48 }}><Button onPress={() => setDisableCBButton(!disableCBButton)} title="Toggle disable" /></View>
            </View>
          </Cell2>
          <Cell>  
            {renderSubHeading('Set height & reset after successful swipe')}
            <SwipeButton height={25} shouldResetAfterSuccess={true} resetAfterSuccessAnimDelay={1000} />
          </Cell>  
        </View>
    </ScrollView>
  );
}