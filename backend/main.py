from fastapi import FastAPI, Form
from pydantic import BaseModel
from typing import  List

app = FastAPI()

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

class Node(BaseModel):
    id: str
    nodeType: str

class Edge(BaseModel):
    id:str
    source:str
    target:str

class Pipeline(BaseModel):
    nodes:List[Node]
    edges:List[Edge]

def is_dag(graph):

    visited = set()  # Nodes fully explored
    recursion_stack = set()  # Nodes currently in the DFS path

    # {'A': [], 'B': ['A'], 'C': ['D'], 'D': []}
    # {'A': [], 'B': ['A', 'E'], 'F': ['G', 'B', 'E'], 'G': [], 'E': ['B']}

    def dfs(node):
        visited.add(node)
        recursion_stack.add(node)

        for neighbor in graph.get(node, []):
            if neighbor in recursion_stack:
                return False  # Cycle detected
            if neighbor not in visited:
                if not dfs(neighbor):
                    return False

        recursion_stack.remove(node)
        return True

    for node in graph:
        if node not in visited:
            if not dfs(node):
                return False

    return True

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline ): 
    graph= {} 
    for node in pipeline.nodes:
        edges = [edge.target for edge in pipeline.edges if edge.source == node.id] 
        graph[node.id]=edges
    # print("\n",graph)  # {'A': [], 'B': ['A'], 'C': ['D'], 'D': []}
    return {'num_nodes': len(pipeline.nodes), 'num_edges':len(pipeline.edges),'is_dag':is_dag(graph)}

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)