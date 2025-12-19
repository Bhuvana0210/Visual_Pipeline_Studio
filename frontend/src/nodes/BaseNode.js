import { Handle, Position } from "reactflow";
import { useState } from "react";

export default function BaseNode({
  title,
  inputs = [],
  outputs = [],
  children,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl transition-all duration-300 ease-out base-node"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "230px",
        background: isHovered
          ? "linear-gradient(135deg, #2d1b4e 0%, #1f1338 100%)"
          : "linear-gradient(135deg, #261740 0%, #1a0f2e 100%)",
        border: isHovered
          ? "2px solid rgba(124, 58, 237, 0.9)"
          : "2px solid rgba(124, 58, 237, 0.5)",
        boxShadow: isHovered
          ? "0 12px 40px rgba(124, 58, 237, 0.5)"
          : "0 6px 24px rgba(124, 58, 237, 0.3)",
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        overflow: "visible", 
      }}
    >
      {/* INPUT HANDLES */}
      {inputs.map((input) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={input.top ? { top: input.top } : undefined}
        />
      ))}

      {/* INNER CLIPPED CONTAINER */}
      <div className="rounded-xl overflow-hidden">
        {/* TITLE */}
        <div
          className="px-4 py-2.5 text-sm font-semibold text-white tracking-wide"
          style={{
            background: "#420c86",
            borderBottom: "1px solid rgba(124, 58, 237, 0.3)",
          }}
        >
          {title}
        </div>

        {/* CONTENT */}
        <div className="space-y-2 text-sm text-gray-300 px-4 py-3">
          {children}
        </div>
      </div>

      {/* OUTPUT HANDLES */}
      {outputs.map((output) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={output.top ? { top: output.top } : undefined}
        />
      ))}
    </div>
  );
}
