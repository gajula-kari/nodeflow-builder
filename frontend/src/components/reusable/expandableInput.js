import { useRef, useEffect } from "react";

export const ExpandableInput = ({
  value,
  onTextChange,
  expandWidth = false,
}) => {
  const maxWidth = 250;
  const maxHeight = 100;
  const minWidth = 202;
  const minHeight = 50;

  const textareaRef = useRef(null);

  const adjustSize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.boxSizing = "border-box";

    if (expandWidth) {
      textarea.style.width = `${minWidth}px`;
      textarea.style.whiteSpace = "pre";
      textarea.style.width = "auto";

      const contentWidth = textarea.scrollWidth;
      const width = Math.min(Math.max(contentWidth, minWidth), maxWidth);
      textarea.style.width = `${width}px`;

      if (width >= maxWidth) {
        textarea.style.whiteSpace = "pre-wrap";
      }
    }

    textarea.style.height = "auto";

    const contentHeight = textarea.scrollHeight;
    const height = Math.min(Math.max(contentHeight, minHeight), maxHeight);
    textarea.style.height = `${height}px`;

    textarea.style.overflowY = contentHeight > height ? "auto" : "hidden";
  };

  useEffect(() => {
    adjustSize();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onTextChange}
      style={{
        maxWidth: `${maxWidth}px`,
        minHeight: `${minHeight}px`,
        maxHeight: `${maxHeight}px`,
      }}
      className=" w-full border border-gray-400 text-sm p-1 focus:outline-none resize-none overflow-hidden rounded mt-1"
    />
  );
};
