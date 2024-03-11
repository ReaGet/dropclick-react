import { useEffect, useRef, useState } from "react";

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
    placeholder,
    status = "default",
    selected,
    children,
    onChange,
    onClose
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const placeholderRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const handleClick = (event) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && onClose?.();
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [onClose]);

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
    setIsOpen(false);
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
          className="absolute flex flex-col min-w-[240px] py-6 top-full mt-4 rounded-lg ring-1 ring-[#15171C] bg-[#0F1114] text-xl whitespace-nowrap text-white z-10"
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