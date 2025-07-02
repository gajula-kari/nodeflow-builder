// node1.js

import { Fragment } from "react";
import { Position } from "reactflow";
import { CustomNode } from "../reusable/customNode";

export const Node1 = ({ id, data }) => {
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
        heading="Node 1"
        description="This is node of type Node 1"
        defaultNodeName={data?.name || id.replace("-", "_")}
        handles={handles}
      />
    </Fragment>
  );
};
