import { useState } from "react";
import BaseNode from "./BaseNode";

export const DelayNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);

  return (
    <BaseNode
      title="Delay"
      inputs={[{ id: `${id}-input`, top: "50%" }]}
      outputs={[{ id: `${id}-output`, top: "50%" }]}
    >
      <label>
        Delay (ms):
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};