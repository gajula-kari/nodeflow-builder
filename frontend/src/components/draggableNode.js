// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`${type} shadow-md h-20 flex-col draggable_node flex bg-white rounded-md border border-gray-400 transform transition-transform hover:scale-90 hover:shadow hover:bg-indigo-100 hover:border-indigo-500`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        minWidth: "80px",
        alignItems: "center",
        justifyContent: "center",
      }}
      draggable
    >
      <span className="text-base font-normal text-gray-700">{label}</span>
    </div>
  );
};
