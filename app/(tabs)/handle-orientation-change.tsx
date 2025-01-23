import { useState } from "react"
import SwipeButton from 'rn-swipe-button';

import { Cell2, RenderSubHeading } from "."

export default function HandleOrientationChange(
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
      </Cell2>
    )
  }