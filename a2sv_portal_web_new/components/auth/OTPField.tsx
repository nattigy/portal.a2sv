import clsx from "clsx";
import { useMemo, useState } from "react";

export type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
  error: {
    error: boolean;
    type:string;
    message: string;
  };
};

export default function OTPField({
  value,
  valueLength,
  onChange,
  error,
}: Props) {
  const RE_DIGIT = new RegExp(/^\d+$/);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);
    
    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }
    
    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;
    
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== "") {
      return;
    }
    
    targetValue = isTargetValueDigit ? targetValue : " ";
    const targetValueLength = targetValue.length;
    
    if (targetValueLength === 1) {
      const newValue =
      value.substring(0, idx) + targetValue + value.substring(idx + 1);
      onChange(newValue);
      
      if (!isTargetValueDigit) {
        return;
      }
      focusToNextInput(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      return focusToPrevInput(target);
    }
    const targetValue = target.value;

    if (e.key === "Backspace") {
      e.preventDefault();
      const newValue =
      value.substring(0, value.length-1);
      onChange(newValue);
      
    }

    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }

    target.setSelectionRange(0, targetValue.length);

    focusToPrevInput(target);
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === "") {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }
    return items;
  }, [value, valueLength]);

  return (
    <div className="flex w-full max-w-[360px] gap-x-2">
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          className={clsx(
            "w-full h-10 lg:h-12 border bg-[#EFF3F9] rounded-md text-center text-lg text-[#3F3D56] font-semibold leading-none",
            error.error && error.type == "submit" ? "border border-red-600" : ""
          )}
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
}
