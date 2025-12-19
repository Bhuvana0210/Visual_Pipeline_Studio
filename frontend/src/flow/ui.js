import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  getSmoothStepPath
} from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

import { InputNode } from '../nodes/inputNode';
import { LLMNode } from '../nodes/llmNode';
import { OutputNode } from '../nodes/outputNode';
import { TextNode } from '../nodes/textNode';
import { ConstantNode } from '../nodes/constantNode';
import { ConcatNode } from '../nodes/concatNode';
import { LoggerNode } from '../nodes/loggerNode';
import { DelayNode } from '../nodes/delayNode';
import { ConditionNode } from '../nodes/conditionNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  constant: ConstantNode,
  concat: ConcatNode,
  logger: LoggerNode,
  delay: DelayNode,
  condition: ConditionNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const CustomConnectionLine = ({ fromX, fromY, toX, toY }) => {
  const [path] = getSmoothStepPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  return (
    <path
      d={path}
      fill="none"
      stroke="#ffffff"
      strokeWidth={2.5}
      style={{
        filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.6))',
      }}
    />
  );
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (id, type) => ({
    id,
    nodeType: type,
  });

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const bounds = reactFlowWrapper.current.getBoundingClientRect();

    const data = event.dataTransfer.getData('application/reactflow');
    if (!data) return;

    const { nodeType } = JSON.parse(data);
    if (!nodeType) return;

    const position = reactFlowInstance.project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });

    const id = getNodeID(nodeType);

    addNode({
      id,
      type: nodeType,
      position,
      data: getInitNodeData(id, nodeType),
    });
  }, [reactFlowInstance, getNodeID, addNode]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        snapGrid={[gridSize, gridSize]}
        proOptions={proOptions}
        connectionLineType="smoothstep"
        connectionLineComponent={CustomConnectionLine}
        defaultEdgeOptions={{
          animated: true,
          style: {
            stroke: '#7C3AED',
            strokeWidth: 2.5,
          },
        }}
        style={{ background: 'transparent' }}
      >
        <Background gap={gridSize} color="#2d2d4a" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
