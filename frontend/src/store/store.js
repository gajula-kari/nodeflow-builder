// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  getNodeNames: () => {
    return get().nodes.map((node) => {
      return node.data.name;
    });
  },
  getNodeNamesExcept: (nodeId) => {
    const nodeNames = get().nodes.map((node) => {
      if (node.id !== nodeId) {
        return node.data.name;
      }
      return null;
    });
    return nodeNames.filter((name) => name !== null);
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    // Add the edge to the state
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
          style: { stroke: "#7A7DF3", strokeWidth: 2 },
        },
        get().edges
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue, callback) => {
    const nodes = get().nodes.map((node) => {
      if (node.id === nodeId) {
        const currentValue = node.data[fieldName];

        return {
          ...node,
          data: {
            ...node.data,
            [fieldName]: Array.isArray(currentValue)
              ? [...currentValue, fieldValue]
              : fieldValue,
          },
        };
      }

      return node;
    });

    set({ nodes });

    if (callback) setTimeout(callback, 0);
  },
  getNodeDataByName: (name) => {
    const nodeNames = get().getNodeNames();
    if (!nodeNames.includes(name))
      return { error: "No node found with given name" };

    const node = get().nodes.find((node) => node.data.name === name);

    return node.data;
  },
}));
