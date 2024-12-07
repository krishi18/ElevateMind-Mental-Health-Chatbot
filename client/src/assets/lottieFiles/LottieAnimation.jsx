// src/components/LottieAnimation.jsx
import React from 'react';
import Lottie from 'lottie-react';

const LottieAnimation = ({
  animationData,
  loop = true,
  autoplay = true,
  onComplete,
  onLoopComplete,
  onEnterFrame,
  style,
  renderer = 'svg',
  speed = 1,
  direction = 1,
}) => {
  return (
    <div style={style}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        onComplete={onComplete}
        onLoopComplete={onLoopComplete}
        onEnterFrame={onEnterFrame}
        renderer={renderer}
        speed={speed}
        direction={direction}
      />
    </div>
  );
};

export default LottieAnimation;
