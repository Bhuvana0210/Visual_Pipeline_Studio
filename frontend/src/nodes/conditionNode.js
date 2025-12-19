import { useState } from "react";
import BaseNode from "./BaseNode";

export const ConditionNode = ({ id }) => {
  const [operator, setOperator] = useState("==");

  return (
    <BaseNode
      title="Condition"
      inputs={[{ id: `${id}-input`, top: "50%" }]}
      outputs={[
        { id: `${id}-true`, top: "35%" },
        { id: `${id}-false`, top: "65%" },
      ]}
    >
      <label>
        Operator:
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="==">==</option>
          <option value="!=">!=</option>
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
        </select>
      </label>
    </BaseNode>
  );
};