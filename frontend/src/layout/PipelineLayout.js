import { NodeSidebar } from '../components/NodeSidebar';
import { PipelineUI } from '../flow/ui';
import { Navbar } from '../components/Navbar';

export const PipelineLayout = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        <NodeSidebar />
        <div className="flex-1 relative">
          <PipelineUI />
        </div>
      </div>

    </div>
  );
};
