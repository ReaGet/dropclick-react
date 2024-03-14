import { useEffect } from "react";

const useClickOutside = (rootRef, callback) => {
  const refs = [];
  if (Array.isArray(rootRef)) {
    refs.push(...rootRef);
  } else {
    refs.push(rootRef);
  }

  const refsContains = (target) => {
    return refs.filter((ref) => {
      return ref.current?.contains(target)
    }).length;
  };

  useEffect(() => {
    const handleClick = (event) => {
      const { target } = event;
      if (target instanceof Node && !refsContains(target)) {
        callback();
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
};

export default useClickOutside;