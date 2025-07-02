// dialog.js

export const Dialog = ({
  num_nodes,
  num_edges,
  is_dag,
  handleSuccessDialog,
}) => {
  return (
    <div className="fixed z-50  inset-0  flex items-center justify-center ">
      <div className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
      <div className=" bg-white z-10 w-full max-w-lg mx-4 rounded-lg shadow-lg p-4">
        <div className="flex justify-end">
          <button
            onClick={handleSuccessDialog}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4 text-green-600">
          Pipeline Created Successfully!
        </h2>
        <p className="mb-6 text-gray-700">
          This pipeline consists of{" "}
          <span className="font-medium">{num_nodes} nodes </span> connected by{" "}
          <span className="font-medium">{num_edges} edges </span> that define
          the data flow.
        </p>
        <p className="mb-6 text-gray-700">
          {is_dag ? (
            <span>
              The structure forms a{" "}
              <span className="font-medium">Directed Acyclic Graph (DAG)</span>,
              ensuring that the processing sequence has no cycles and each node
              is executed in a defined order.
            </span>
          ) : (
            <span>
              However, the structure is{" "}
              <span className="font-medium">
                {" "}
                not a Directed Acyclic Graph (DAG)
              </span>
              , meaning it contains cycles which may lead to repeated processing
              or potential infinite loops.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
