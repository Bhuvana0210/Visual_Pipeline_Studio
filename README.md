# Visual Pipeline Studio

This project is a **visual pipeline / workflow builder** that allows users to construct AI-style workflows using a drag-and-drop interface.

The application consists of:
- A **frontend visual pipeline studio** built with React
- A **backend pipeline analysis service** built with FastAPI

---

## Overview

The Pipeline Studio allows users to visually construct workflows by:
- Dragging nodes from a sidebar onto a canvas
- Connecting nodes using visual edges
- Configuring node-specific parameters
- Submitting the pipeline for structural analysis

The frontend focuses on **usability, visual clarity, and extensible node architecture**, while the backend validates the pipeline structure.

---

## Features Implemented

### Drag-and-Drop Pipeline Creation
- Nodes can be dragged from the sidebar and dropped onto the canvas
- Each node instance is assigned a unique ID
- Nodes snap to a grid for alignment

### Supported Node Types
- Input Node (Text / File)
- Output Node (Text / Image)
- Text Node (dynamic variables)
- LLM Node
- Concat Node
- Condition Node
- Delay Node
- Constant Node
- Logger Node

### Visual Connections
- Input and output handles for each node
- Smooth animated edges with arrow markers
- MiniMap and canvas controls enabled

### Text Node Enhancements
- Text area automatically resizes as content grows
- Variables defined using `{{variable}}` syntax
- Dynamic input handles created for each variable
- Supports dynamic variable-based inputs in a single text node

---

## Architecture & Design

### Frontend
- React + React Flow
- Zustand for centralized state management
- Reusable `BaseNode` abstraction to reduce duplication
- Modular and extensible node design

### Backend
- FastAPI-based service
- `/pipelines/parse` endpoint:
  - Counts the number of nodes
  - Counts the number of edges
  - Checks whether the pipeline forms a Directed Acyclic Graph (DAG)
- Returns structured analysis to the frontend

---

## Running the Project Locally

Run the frontend and backend separately.

### Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
npm start
```

The frontend will run at `http://localhost:3000` (or `http://localhost:3001` if port 3000 is occupied).

### Backend Setup

Open a new terminal, navigate to the backend directory, and run:
```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

The backend will run at:
```
http://localhost:8000
```

---

## End-to-End Usage

Once both services are running:

1. Build a pipeline using drag-and-drop nodes
2. Connect nodes using edges
3. Click **Submit Pipeline**

A modal displays:
- Number of nodes
- Number of edges
- Whether the pipeline forms a valid DAG