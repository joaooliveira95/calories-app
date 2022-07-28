import { Card } from "antd";
import { useState } from "react";
import "./calorie-counter.component.scss";
export function CalorieCounter() {
  const [calories, setCalories] = useState<number>(1110);

  function buildCalories() {
    const percentage = calculatePercentage();
    let excessCalories = percentage - 100;
    const updatedPercentage =
      excessCalories > 0 ? 100 - excessCalories : 100 - percentage;
    return Array.from(Array(100)).map((item, index) => {
      let classModifier =
        updatedPercentage < index + 1 ? "square green-filled" : "square";

      if (excessCalories > 0 && updatedPercentage >= index + 1) {
        classModifier = "square green-filled";
      } else if (excessCalories > 0 && excessCalories > 0) {
        classModifier = "square red-filled";
        excessCalories--;
      }
      return <i key={index} className={classModifier}></i>;
    });
  }

  function calculatePercentage() {
    return Math.ceil((calories * 100) / 2100);
  }

  return (
    <Card className="cal-calorie-counter" title="Calorie Intake">
      <div className="cal-calorie-counter__chart">{buildCalories()}</div>
      <div className="cal-calorie-counter__footer">
        <div className="cal-calorie-counter__footer__item-wrapper">
          <div className="cal-calorie-counter__footer__item">Daily: 2100</div>
          <div className="cal-calorie-counter__footer__item">
            Consumed: {calories}
          </div>
        </div>
        <div className="cal-calorie-counter__footer__item-wrapper">
          <i className="square"></i>
          <i className="square green-filled"></i>
          <i className="square red-filled"></i>
        </div>
      </div>
    </Card>
  );
}
