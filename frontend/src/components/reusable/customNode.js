// customNode.js
import { Fragment, useState, useEffect, useRef } from "react";
import { Handle } from "reactflow";
import { validateNodeName } from "../../utils/utils";
import { ExpandableInput } from "./expandableInput";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store/store";

const selector = (state) => ({
  getNodeNamesExcept: state.getNodeNamesExcept,
  updateNodeField: state.updateNodeField,
});

export const CustomNode = ({
  data,
  heading,
  description = null,
  defaultNodeName = null,
  showSelection = false,
  selectionContent = null,
  showTextElement = false,
  textElementDetails = null,
  textValidationError = null,
  handleAdded = null,
  handles = null,
}) => {
  const [nodeName, setNodeName] = useState(defaultNodeName);
  const [selectValue, setSelectValue] = useState(data.inputType || "Text");
  const [validationError, setValidationError] = useState(null);

  const { getNodeNamesExcept, updateNodeField } = useStore(selector, shallow);

  useEffect(() => {
    updateNodeField(data.id, "name", nodeName);
    updateNodeField(data.id, "handles", handles);
  }, []);

  const onNodeNameBlur = () => {
    if (validationError) {
      setNodeName(data.name);
      setValidationError(null);
    } else updateNodeField(data.id, "name", nodeName);
  };

  const onNodeNameChange = (event) => {
    const nodeName = event.target.value;
    setValidationError(validateNodeName(nodeName, getNodeNamesExcept(data.id)));
    setNodeName(nodeName);
  };

  const onSelectionChange = (event) => {
    setSelectValue(event.target.value);
  };

  const getSelectElement = () => {
    return (
      showSelection && (
        <Fragment>
          <div className="flex justify-between w-full">
            <label className="font-medium text-md text-gray-700">
              {selectionContent.label}:
            </label>
            <label
              style={{ fontSize: "10px" }}
              className="mt-2 h-4 px-1 text-white rounded bg-indigo-500 "
            >
              Dropdown
            </label>
          </div>

          <div>
            <select
              value={selectValue}
              onChange={onSelectionChange}
              className="focus:outline-none border border-gray-400 rounded w-full mt-1 p-1 text-sm"
            >
              {selectionContent.options?.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </Fragment>
      )
    );
  };

  const getValidationElement = (error) => {
    return (
      <div
        style={{
          width: "213px",
        }}
        className="bg-red-100 rounded-md border-red-400 border p-1 mt-1 text-xs"
      >
        <label>{error}</label>
      </div>
    );
  };

  return (
    <div
      style={{
        minWidth: !data.id.includes("text") && "180px",
        caretColor:
          validationError || textValidationError ? "#f87171" : "#4b5563",
      }}
    >
      <div
        className={`${
          validationError || textValidationError
            ? "border-red-400"
            : "border-indigo-400"
        } hover:bg-gray-200 shadow-lg bg-white rounded-md  border-2 p-1 `}
      >
        <div className="shadow-sm bg-indigo-100 rounded-md border-indigo-200 border p-1 text-gray-800 ">
          <div className="font-medium text-md text-gray-800 "> {heading}</div>
          {description && (
            <div className=" w-48 text-xs text-gray-700 ">{description}</div>
          )}
        </div>

        <div className="p-1">
          <input
            type="text"
            value={nodeName}
            onChange={onNodeNameChange}
            onBlur={onNodeNameBlur}
            style={{ backgroundColor: "#DEDFF5" }}
            className="focus:outline-none rounded w-full text-sm  text-gray-800 text-center"
          />
        </div>

        {getSelectElement()}

        {showTextElement && (
          <>
            <div className="flex justify-between w-full">
              <label className="font-medium text-md text-gray-700">Text:</label>
              <label
                style={{ fontSize: "10px" }}
                className="mt-2 h-4 px-1 text-white rounded bg-indigo-500 "
              >
                Text
              </label>
            </div>
            <ExpandableInput
              value={textElementDetails.value}
              onTextChange={textElementDetails.onChange}
              onBlur={textElementDetails.onBlur}
              expandWidth={textElementDetails.expandWidth}
            />
          </>
        )}

        {handles?.map((handle) => (
          <Handle
            id={handle.id}
            key={handle.id}
            type={handle.type}
            position={handle.position}
            style={handle.style}
          />
        ))}
      </div>
      {handleAdded && (
        <label
          style={{
            visibility: "hidden",
          }}
        >
          Handle created!
        </label>
      )}
      {textValidationError && getValidationElement(textValidationError)}

      {validationError && getValidationElement(validationError)}
    </div>
  );
};
