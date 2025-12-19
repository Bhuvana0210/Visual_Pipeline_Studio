import BaseNode from "./BaseNode";

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      title="LLM"
      inputs={[
        { id: `${id}-system`, top: `${100 / 3}%` },
        { id: `${id}-prompt`, top: `${200 / 3}%` },
      ]}
      outputs={[{ id: `${id}-response`, top: "50%" }]}
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
};