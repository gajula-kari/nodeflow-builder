// output.js
import { Fragment } from "react";
import { Position } from "reactflow";
import { CustomNode } from "../reusable/customNode";

export const Output = ({ id, data }) => {
  const selectionContent = {
    label: "Type",
    options: ["Text", "Image"],
  };

  const handles = [
    {
      id: `${id}-value`,
      type: "target",
      position: Position.Left,
    },
  ];

  return (
    <Fragment>
      <CustomNode
        data={data}
        heading="Output"
        description={"Output data of different types from your workflow"}
        defaultNodeName={data?.name || id.replace("customOutput-", "output_")}
        showSelection={true}
        selectionContent={selectionContent}
        handles={handles}
      />
    </Fragment>
  );
};
