import BaseNode from "./BaseNode";

export const LoggerNode = ({ id }) => {
  return (
    <BaseNode
      title="Logger"
      inputs={[{ id: `${id}-input`, top: "50%" }]}
    >
      <span>Logs incoming value</span>
    </BaseNode>
  );
};