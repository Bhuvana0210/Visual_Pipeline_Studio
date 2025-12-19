

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "http://localhost:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NodeData(BaseModel):
    id: str
    nodeType: str

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: NodeData

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the pipeline forms a Directed Acyclic Graph (DAG).
    
    Algorithm: DFS with color marking
    - White (0): Unvisited node
    - Gray (1): Currently being processed (in the current DFS path)
    - Black (2): Completely processed
    
    If we encounter a gray node during DFS, we've found a back edge (cycle).
    """
    # Build adjacency list
    graph = {node.id: [] for node in nodes}
    
    for edge in edges:
        if edge.source in graph:
            graph[edge.source].append(edge.target)
    
    # Color states: 0 = white, 1 = gray, 2 = black
    color = {node.id: 0 for node in nodes}
    
    def has_cycle(node_id: str) -> bool:
        """
        Perform DFS to detect cycles.
        Returns True if a cycle is found.
        """
        color[node_id] = 1  # Mark as being processed (gray)
        
        for neighbor in graph.get(node_id, []):
            # Skip if neighbor is not in our graph
            if neighbor not in color:
                continue
            
            # Back edge found - cycle detected!
            if color[neighbor] == 1:
                return True
            
            # If neighbor is unvisited, recursively check it
            if color[neighbor] == 0:
                if has_cycle(neighbor):
                    return True
        
        color[node_id] = 2  # Mark as completely processed (black)
        return False
    
    # Check all nodes (handles disconnected components)
    for node in nodes:
        if color[node.id] == 0:  # Unvisited
            if has_cycle(node.id):
                return False  # Cycle found
    
    return True  # No cycles - it's a DAG!

@app.get('/')
def read_root():
    return {'status': 'ok', 'message': 'VectorShift Pipeline API'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    """
    Parse the pipeline and return analysis.
    
    Returns:
        - num_nodes: Total number of nodes
        - num_edges: Total number of edges
        - is_dag: Whether the pipeline forms a valid DAG
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }