import React, { ReactElement } from "react";
import { AnimationType } from "../_types/animation/animation.type";
import { AnimationDelayType } from "../_types/animation/animation-delay.type";
import { AnimationFasterType } from "../_types/animation/animation-faster.type";
import { AnimationRepeatType } from "../_types/animation/animation-repeat.type";

interface IAnimateProps {
  children: ReactElement;
  animation: AnimationType;
  delay?: AnimationDelayType;
  faster?: AnimationFasterType;
  repeat?: AnimationRepeatType;
}

export default function Animate(props: IAnimateProps) {
  const { children, animation, delay = "", faster = "", repeat = "" } = props;
  const _prefix = `animate__`;

  const delayClass = delay && `${_prefix}${delay}`;
  const fasterClass = faster && `${_prefix}${faster}`;
  const repeatClass = repeat && `${_prefix}${repeat}`;

  const currentClass = children.props.className || "";
  const animationClass = `animate__animated ${_prefix}${animation}`;

  return React.cloneElement(children, {
    className: `${currentClass} ${animationClass} ${delayClass} ${fasterClass} ${repeatClass}`,
  });
}
