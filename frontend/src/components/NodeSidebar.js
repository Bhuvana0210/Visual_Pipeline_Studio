
import { DraggableNode } from '../draggableNode';

export const NodeSidebar = () => {
  const nodeCategories = [
    {
      title: 'Input / Output',
      nodes: [
        { type: 'customInput', label: 'Input'},
        { type: 'customOutput', label: 'Output' },
      ],
    },
    {
      title: 'Processing',
      nodes: [
        { type: 'llm', label: 'LLM' },
        { type: 'text', label: 'Text'},
        { type: 'concat', label: 'Concat' },
      ],
    },
    {
      title: 'Logic',
      nodes: [
        { type: 'condition', label: 'Condition' },
        { type: 'delay', label: 'Delay' },
        { type: 'logger', label: 'Logger' },
        { type: 'constant', label: 'Constant'},
      ],
    },
  ];

  return (
    <aside
      className="w-64 h-full p-4 overflow-y-auto"
      style={{
        background: 'rgba(40, 11, 97, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid #4d3882',
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.2)',
      }}
    >
      {nodeCategories.map((category) => (
        <div key={category.title} className="mb-6">
          <h3 
            className="mb-3 text-xs font-semibold uppercase tracking-wider pb-2"
            style={{
              color: '#e0e0e0',
              borderBottom: '2px solid #4d3882',
            }}
          >
            {category.title}
          </h3>

          <div className="flex flex-col gap-2">
            {category.nodes.map((node) => (
              <DraggableNode
                key={node.type}
                type={node.type}
                label={node.label}
                icon={node.icon}
              />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
};
