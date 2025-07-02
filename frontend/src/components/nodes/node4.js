// node4.js

import { Fragment } from "react";
import { Position } from "reactflow";
import { CustomNode } from "../reusable/customNode";

export const Node4 = ({ id, data }) => {
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
        heading="Node 4"
        description="This is node of type Node 4"
        defaultNodeName={data?.name || id.replace("-", "_")}
        showSelection={true}
        selectionContent={selectionContent}
        handles={handles}
      />
    </Fragment>
  );
};
