import { useEffect, useRef, useState } from "react";
import BaseNode from "./BaseNode";

const extractVariables = (text) => {
  const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
  const vars = new Set();
  let match;

  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }

  return Array.from(vars);
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const textareaRef = useRef(null);

  const variables = extractVariables(text);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [text]);

  // Build input handles dynamically
  const inputHandles = variables.map((variable, index) => ({
    id: `${id}-${variable}`,
    top: `${((index + 1) / (variables.length + 1)) * 100}%`,
  }));

  return (
    <BaseNode
      title="Text"
      inputs={inputHandles}
      outputs={[{ id: `${id}-output`, top: "50%" }]}
    >
      <label>
        Text:
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={1}
        />
      </label>
    </BaseNode>
  );
};