// submitButton.js
import { useStore } from "../store/store.js";
import { shallow } from "zustand/shallow";
import { useState, useEffect } from "react";
import { Dialog } from "../components/reusable/dialog.js";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [validationError, setValidationError] = useState();
  const [num_nodes, setNumNodes] = useState();
  const [num_edges, setNumEdges] = useState();
  const [is_dag, setDag] = useState();
  const [isFetching, setIsFetching] = useState();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    if (validationError !== null) {
      const timer = setTimeout(() => {
        setValidationError();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [validationError]);

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    setValidationError();
    const error = validations();
    if (error) {
      setValidationError(error);
    } else {
      const pipeline = getRequestData();

      try {
        setIsFetching(true);
        const response = await fetch("http://localhost:8000/pipelines/parse/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pipeline),
        });

        if (!response.ok) {
          setValidationError(response.status);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseJson = await response.json();
        console.log("Success:", responseJson);
        handleSuccessDialog(responseJson);
      } catch (error) {
        setValidationError(
          "Unable to connect to the server. Please check if the server is up and running."
        );
        console.error("Error sending data:", error);
      }
      setIsFetching(false);
    }
  };

  const getRequestData = () => {
    let listOfNodes = nodes.map((node) => ({
      id: node.id,
      nodeType: node.type,
    }));

    let listOfEdges = edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    }));

    return { nodes: listOfNodes, edges: listOfEdges };
  };

  const handleSuccessDialog = (data) => {
    setShowSuccessDialog(!showSuccessDialog);
    setNumNodes(data?.num_nodes);
    setNumEdges(data?.num_edges);
    setDag(data?.is_dag);
  };

  const validations = () => {
    if (nodes.length < 2 || edges.length < 1) {
      return "A pipeline must contain at least two nodes and one connecting edge.";
    }
  };
  return (
    <div className=" z-50 flex flex-col items-center ">
      {isFetching && (
        <>
          <div className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          <div className="z-10 fixed inset-0 flex items-center justify-center">
            <div
              style={{ width: "50px" }}
              className=" border-2  border-gray-200  rounded-full animate-spin"
            ></div>
          </div>
        </>
      )}

      <button
        type="submit"
        onClick={handleSubmitClick}
        className="focus:outline-none text-white rounded bg-indigo-500 w-16 text-md p-1 transform transition-transform hover:scale-95 hover:shadow-md hover:border-indigo-500"
      >
        Submit
      </button>
      {validationError && (
        <div className="bg-red-100 rounded-md border-red-400 border p-1 mt-1 text-sm">
          <label>{validationError}</label>
        </div>
      )}
      {showSuccessDialog && (
        <Dialog
          num_nodes={num_nodes}
          num_edges={num_edges}
          is_dag={is_dag}
          handleSuccessDialog={handleSuccessDialog}
        />
      )}
    </div>
  );
};
