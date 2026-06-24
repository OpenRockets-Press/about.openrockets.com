import React, { useState } from "react";

interface MaterialInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  multiline?: boolean;
}

export function MaterialInput({ label, multiline, className = "", ...props }: MaterialInputProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(props.value || props.defaultValue));

  const handleFocus = (e: React.FocusEvent<any>) => {
    setFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<any>) => {
    setFocused(false);
    setHasValue(Boolean(e.target.value));
    if (props.onBlur) props.onBlur(e);
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    setHasValue(Boolean(e.target.value));
    if (props.onChange) props.onChange(e);
  };

  const isFloating = focused || hasValue;

  const containerClasses = `relative border border-black bg-white rounded-md transition-shadow ${
    focused ? "ring-1 ring-black" : ""
  } ${className}`;

  const labelClasses = `absolute left-3 transition-all duration-200 pointer-events-none ${
    isFloating 
      ? "-top-2.5 text-xs bg-white px-1 font-bold text-black" 
      : "top-3 text-base text-gray-500 font-medium"
  }`;

  if (multiline) {
    return (
      <div className={containerClasses}>
        <label className={labelClasses}>{label}</label>
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className="w-full px-3 py-3 outline-none bg-transparent min-h-[200px] resize-y text-black font-sans"
        />
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <label className={labelClasses}>{label}</label>
      <input
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className="w-full px-3 py-3 outline-none bg-transparent text-black font-sans"
      />
    </div>
  );
}
