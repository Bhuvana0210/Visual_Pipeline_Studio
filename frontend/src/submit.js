
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { createPortal } from 'react-dom';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAlertData(data);
      setShowAlert(true);
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      setAlertData({
        error: true,
        message: error.message || 'Failed to submit pipeline. Make sure the backend is running on port 8000.',
      });
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: '#676cec',
          boxShadow: '0 4px 16px rgba(103, 108, 236, 0.3)',
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.background = '#5b61d6';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(103, 108, 236, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = '#676cec';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(103, 108, 236, 0.3)';
          }
        }}
      >
        {isLoading ? (
          <>
            <span className="loading-spinner" />
            Processing...
          </>
        ) : (
          <>
            <span>✓</span>
            Submit Pipeline
          </>
        )}
      </button>

      {showAlert &&
        createPortal(
          <AlertModal
            data={alertData}
            onClose={() => {
              setShowAlert(false);
              setAlertData(null);
            }}
          />,
          document.getElementById('modal-root')
        )
      }
    </>
  );
};

const AlertModal = ({ data, onClose }) => {
  if (!data) return null;

  const isError = data.error;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center animate-fadeIn"
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        pointerEvents: 'auto',
      }}
    >
      <div
        className="rounded-2xl p-8 max-w-md w-11/12 shadow-2xl animate-slideUp"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.98) 0%, rgba(22, 33, 62, 0.98) 100%)',
          border: isError
            ? '2px solid rgba(239, 68, 68, 0.6)'
            : '2px solid rgba(124, 58, 237, 0.5)',
          boxShadow: isError
            ? '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(239, 68, 68, 0.3)'
            : '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(124, 58, 237, 0.2)',
          position: 'relative',
          zIndex: 10000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-100 mb-5">
          {isError ? (
            <>
              <span>⚠️</span>
              Error
            </>
          ) : (
            <>
              <span>📊</span>
              Pipeline Analysis
            </>
          )}
        </h2>

        {isError ? (
          <div className="text-red-300 mb-6 leading-relaxed">{data.message}</div>
        ) : (
          <div className="space-y-3 mb-6">
            <StatRow label="Number of Nodes" value={data.num_nodes} />
            <StatRow label="Number of Edges" value={data.num_edges} />
            <StatRow
              label="Valid DAG"
              value={data.is_dag ? '✓ Yes' : '✗ No'}
              success={data.is_dag}
            />

            {!data.is_dag && (
              <div
                className="mt-4 p-3 rounded-lg text-sm leading-relaxed"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#FCA5A5',
                }}
              >
                ⚠️ Pipeline contains cycles. Please ensure it forms a directed acyclic graph.
              </div>
            )}
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full px-4 py-3 rounded-lg font-semibold text-white transition-all"
          style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(124, 58, 237, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const StatRow = ({ label, value, success }) => (
  <div
    className="flex justify-between items-center px-4 py-3 rounded-lg"
    style={{
      background: 'rgba(124, 58, 237, 0.1)',
      border: '1px solid rgba(124, 58, 237, 0.2)',
    }}
  >
    <span className="font-semibold text-gray-400">{label}:</span>
    <span
      className="font-bold"
      style={{
        color: success === true ? '#10B981' : success === false ? '#EF4444' : '#A78BFA',
      }}
    >
      {value}
    </span>
  </div>
);
