// node3.js

import { Fragment } from "react";
import { Position } from "reactflow";
import { CustomNode } from "../reusable/customNode";

export const Node3 = ({ id, data }) => {
  const selectionContent = {
    label: "Type",
    options: ["Text", "File"],
  };

  const handles = [
    {
      id: `${id}-response`,
      type: "target",
      position: Position.Left,
    },
  ];

  return (
    <Fragment>
      <CustomNode
        data={data}
        heading="Node 3"
        description="This is node of type Node 3"
        defaultNodeName={data?.name || id.replace("-", "_")}
        showSelection={true}
        selectionContent={selectionContent}
        handles={handles}
      />
    </Fragment>
  );
};
