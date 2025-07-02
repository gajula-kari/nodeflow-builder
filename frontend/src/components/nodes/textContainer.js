// textContainer.js

import { Fragment, useState, useEffect } from "react";
import { useUpdateNodeInternals } from "reactflow";
import { Position } from "reactflow";
import { CustomNode } from "../reusable/customNode";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store/store";
import { getEnclosedString, isValidJSVariable } from "../../utils/utils";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeDataByName: state.getNodeDataByName,
  onConnect: state.onConnect,
  updateNodeField: state.updateNodeField,
});

export const TextContainer = ({ id, data, expandWidth = false }) => {
  const [text, setText] = useState("");
  const [handleAdded, setHandleAdded] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [connectedNodes, setConnectedNodes] = useState([]);
  const { getNodeDataByName, onConnect, updateNodeField } = useStore(
    selector,
    shallow
  );

  const defaultNodeName =
    data?.name ||
    data.id
      .replace("-", "_")
      .replace("texth", "text_h")
      .replace("textwh", "text_wh");

  let handles = [
    {
      id: `${id}-output`,
      type: "source",
      position: Position.Right,
    },
  ];

  useEffect(() => {
    if (handleAdded) {
      const timer = setTimeout(() => {
        setHandleAdded(false);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [handleAdded]);

  const validateAndAddEdge = (value) => {
    const extractedValue = getEnclosedString(value);
    if (extractedValue) {
      const error = isValidJSVariable(extractedValue);
      if (error) {
        setValidationError(error);
        return;
      }
      setValidationError(null);
      if (connectedNodes.length >= 0 && connectedNodes.includes(extractedValue))
        return;

      setConnectedNodes([...connectedNodes, extractedValue]);

      const connectNode = getNodeDataByName(extractedValue);
      if (connectNode.error) {
        setValidationError(connectNode.error);
        return;
      }

      if (connectNode.name === data.name) {
        setValidationError("Source and Target of an edge cannot be same.");
        return;
      }

      const sourceHandle = connectNode.handles.find(
        (handle) => handle.type === "source"
      );
      if (sourceHandle) {
        const targetHandleId = `${id}-target`;

        if (checkIfTargetHandleExists(targetHandleId)) {
          onConnect({
            source: connectNode.id,
            target: data.id,
            sourceHandle: sourceHandle.id,
            targetHandle: targetHandleId,
          });
          setValidationError(null);
          return;
        } else {
          const targetHandle = {
            id: targetHandleId,
            type: "target",
            position: Position.Left,
          };

          updateNodeField(data.id, "handles", targetHandle, () => {
            onConnect({
              source: connectNode.id,
              target: data.id,
              sourceHandle: sourceHandle.id,
              targetHandle: targetHandleId,
            });
          });
        }
        setValidationError(null);
      } else {
        setValidationError("No source handle found on the respective Node.");
      }
      setHandleAdded(true);
      return;
    }
    setValidationError(null);
  };

  const checkIfTargetHandleExists = (targetHandleId) => {
    return data.handles.find((handle) => handle.id === targetHandleId)
      ? true
      : false;
  };

  const onTextChange = (event) => {
    const value = event.target.value;
    setText(value);

    const names = value.trim().split(" ");
    names.forEach((name) => {
      validateAndAddEdge(name);
    });
  };

  const textElementDetails = {
    expandWidth: expandWidth,
    value: text,
    onChange: onTextChange,
  };

  return (
    <Fragment>
      <CustomNode
        data={data}
        heading="Text"
        description={"Accepts Text from upstream nodes"}
        defaultNodeName={defaultNodeName}
        handles={data?.handles || handles}
        showTextElement={true}
        textElementDetails={textElementDetails}
        textValidationError={validationError}
        handleAdded={handleAdded}
      />
    </Fragment>
  );
};
