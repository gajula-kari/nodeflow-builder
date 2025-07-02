//llm.js

import { Fragment } from "react";
import { Position } from "reactflow";
import { CustomNode } from "../reusable/customNode";

export const LLM = ({ id, data }) => {
  const handles = [
    {
      id: `${id}-system`,
      type: "target",
      position: Position.Left,
      style: { top: `${100 / 3}%` },
    },
    {
      id: `${id}-prompt`,
      type: "target",
      position: Position.Left,
      style: { top: `${200 / 3}%` },
    },
    {
      id: `${id}-response`,
      type: "source",
      position: Position.Right,
    },
  ];

  return (
    <Fragment>
      <CustomNode
        data={data}
        heading="LLM"
        description={"This is a LLM."}
        defaultNodeName={data?.name || id.replace("-", "_")}
        handles={handles}
      />
    </Fragment>
  );
};
