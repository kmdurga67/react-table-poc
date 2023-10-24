import React, { useRef } from "react";

export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolveRef = ref || defaultRef;

  React.useEffect(() => {
    resolveRef.current.indeterminate = indeterminate;
  }, [resolveRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolveRef} {...rest} />
    </>
  );
});
