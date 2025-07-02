// pipelineToolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div className="p-2 flex gap-3 shadow bg-gray-200 overflow-x-auto">
      <DraggableNode type="customInput" label="Input" />
      <DraggableNode type="llm" label="LLM" />
      <DraggableNode type="customOutput" label="Output" />
      <DraggableNode type="textwh" label="Text WH" />
      <DraggableNode type="texth" label="Text H" />
      <DraggableNode type="node1" label="Node 1" />
      <DraggableNode type="node2" label="Node 2" />
      <DraggableNode type="node3" label="Node 3" />
      <DraggableNode type="node4" label="Node 4" />
    </div>
  );
};
