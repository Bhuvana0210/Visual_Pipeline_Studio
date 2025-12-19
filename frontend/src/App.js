
import { PipelineLayout } from './layout/PipelineLayout';

function App() {
  return (
    <div
      id="root-app"
      className="w-screen h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 30% 30%, rgba(124, 58, 237, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), linear-gradient(135deg, #1a0f2e 0%, #0f0820 50%, #0a0515 100%)',
        position: 'relative',
      }}
    >
      <PipelineLayout />
    </div>
  );
}

export default App;