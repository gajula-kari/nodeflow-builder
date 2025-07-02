// input.js

import { Fragment } from "react";
import { Position } from "reactflow";
import { CustomNode } from "../reusable/customNode";

export const Input = ({ id, data }) => {
  const selectionContent = {
    label: "Type",
    options: ["Text", "File"],
  };
  const handles = [
    {
      id: `${id}-value`,
      type: "source",
      position: Position.Right,
    },
  ];

  return (
    <Fragment>
      <CustomNode
        data={data}
        heading="Input"
        description={"Pass data of different types into your workflow"}
        defaultNodeName={data?.name || id.replace("customInput-", "input_")}
        showSelection={true}
        selectionContent={selectionContent}
        handles={handles}
      />
    </Fragment>
  );
};
