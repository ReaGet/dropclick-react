import { useEffect, useRef, useState } from "react";
import useClickOutside from "hooks/useClickOutside";

const OptionEl = (props) => {
  const {
    option: { value, title },
    activeClass = "",
    onClick
  } = props;

  const optionRef = useRef(null);

  const handleClick = (clickedValue) => () => {
    onClick(clickedValue);
  };

  useEffect(() => {
    const option = optionRef.current;
    if (!option) return;

    const handleEnterKeyDown = (event) => {
      if (document.activeElement === option && event.key === "Enter") {
        onClick(value);
      }
    };

    option.addEventListener("keydown", handleEnterKeyDown);

    return () => {
      option.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, [value, onClick]);

  return (
    <li
      className={"w-full px-8 py-6 xl:py-6 cursor-pointer hover:bg-[#15171C] select-none " + activeClass}
      value={value}
      onClick={handleClick(value)}
      tabIndex={0}
      ref={optionRef}
    >
      {title}
    </li>
  );
}

export const Select = (props) => {
  const {
    options = [],
    justify = "left",
    hideOnChange = true,
    // placeholder,
    // status = "default",
    // selected,
    children,
    onChange,
    onClose
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const placeholderRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState("");

  useClickOutside(rootRef, () => {
    isOpen && onClose?.();
    setIsOpen(false);
  });

  useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) return;

    const handleEnterKeyDown = (event) => {
      if (event.key === "Enter") {
        setIsOpen((prev) => !prev);
      }
    };

    placeholderEl.addEventListener("keydown", handleEnterKeyDown);

    return () => {
      placeholderEl.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, []);

  const handleOptionClick = (value) => {
    hideOnChange && setIsOpen(false);
    onChange?.(value);
    setSelectedItem(value);
  };

  const handlePlaceHolderClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="relative"
      ref={rootRef}
      data-is-active={isOpen}
    >
      <div onClick={handlePlaceHolderClick}>
        {children}
      </div>
      {isOpen && (
        <ul
          className={[
            "absolute flex flex-col min-w-[240px] py-6 top-full mt-4 rounded-lg ring-1 ring-[#15171C] bg-[#0F1114] text-xl whitespace-nowrap text-white z-10",
            justify === "left" ? "left-0" : "right-0"
          ].join(" ")}
        >
          {options.map((option) => (
            <OptionEl
              key={option.value}
              option={option}
              onClick={handleOptionClick}
              activeClass={option.value === selectedItem ? "bg-[#15171C] text-primary" : ""}
            />
          ))}
        </ul>
      )}
    </div>
  );
}