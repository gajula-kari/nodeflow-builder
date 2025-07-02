// node2.js

import { Fragment } from "react";
import { Position } from "reactflow";
import { CustomNode } from "../reusable/customNode";

export const Node2 = ({ id, data }) => {
  const handles = [
    {
      id: `${id}-value`,
      type: "source",
      position: Position.Right,
    },
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
        heading="Node 2"
        description="This is node of type Node 2"
        defaultNodeName={data?.name || id.replace("-", "_")}
        handles={handles}
      />
    </Fragment>
  );
};
