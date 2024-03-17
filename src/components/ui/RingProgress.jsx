import { useEffect, useState } from "react";

export const RingProgress = (props) => {
  const {
    value = 0,
    maxValue = 100,
    width = 350,
    scoreTextClassname = "",
    labelTextClassname = "",
    labelText,
    showScoreText = true,
    smooth = true,
    className = ""
  } = props;

  const [labelTextValue, setLabelTextValue] = useState("");
  
  const getPercents = () => Math.min(1, Math.max(0, (value / maxValue)));

  const getScale = () => width / 350;
  
  const transitionClass = () => smooth ? "transition-all duration-300" : ''; 

  const wrapperHeight = () => getScale() * 190;

  const scoreHeight = () => getScale() * 160;
  
  useEffect(() => {
    if (labelText) setLabelTextValue(labelText(value))
  }, []);

  const twToOffest = () => 1000 - 500 * getPercents();

  const twToColor = () =>  `hsl(${110 * getPercents()} 79% 50% / 1)`;

  return (
    <div
      className={"relative flex justify-center items-center " + className} 
      style={{ color: twToColor() }}
    >
      <svg
        width={width}
        height={wrapperHeight()}
        viewBox="0 170 350 175"
        className="origin-center -rotate-180 fill-transparent"
        strokeLinecap="round"
        strokeWidth="23.975"
      >
        <circle
          className="stroke-[#2F2F2F] opacity-55"
          cx="175"
          cy="175"
          r="159.155"
          strokeDasharray="1000"
          strokeDashoffset="500"
        />
      </svg>

      <svg
        width={width}
        height={wrapperHeight()}
        viewBox="0 170 350 175"
        className="absolute top-0 origin-center -rotate-180 fill-transparent stroke-current"
        strokeLinecap="round"
        strokeWidth="23.975"
      >
        <circle
          cx="175"
          cy="175"
          r="159.155"
          strokeDasharray="1000"
          strokeDashoffset={twToOffest()}
          className={transitionClass()}
        />
      </svg>

      <div
        className={"absolute flex flex-col items-center justify-center gap-1 bottom-0 " + (transitionClass())}
        style={{ height: `${scoreHeight()}px`}}
      >
        {
          showScoreText
            ? (<span className={["font-bold", scoreTextClassname].join(" ")}>{ value }</span>)
            : ""
        }
        {
          labelTextValue
            ? (<span className={labelTextClassname}>{ labelTextValue }</span>)
            : ""
        }
      </div>
    </div>
  )
}