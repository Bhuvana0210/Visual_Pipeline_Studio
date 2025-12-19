import BaseNode from "./BaseNode";

export const ConcatNode = ({ id }) => {
  return (
    <BaseNode
      title="Concat"
      inputs={[
        { id: `${id}-input-1`, top: "33%" },
        { id: `${id}-input-2`, top: "66%" },
      ]}
      outputs={[{ id: `${id}-output`, top: "50%" }]}
    >
      <span>Concatenates inputs</span>
    </BaseNode>
  );
};