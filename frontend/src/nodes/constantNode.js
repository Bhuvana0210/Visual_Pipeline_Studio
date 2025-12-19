import { useState } from "react";
import BaseNode from "./BaseNode";

export const ConstantNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || "");

  return (
    <BaseNode
      title="Constant"
      outputs={[{ id: `${id}-output`, top: "50%" }]}
    >
      <label>
        Value:
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};