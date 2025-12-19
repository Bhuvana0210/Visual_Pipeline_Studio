
import { SubmitButton } from '../submit';

export const Navbar = () => {
  return (
    <div
      className="relative flex items-center justify-between px-8"
      style={{
        height: 70,
        background: 'rgba(40, 11, 97, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid #4d3882',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Gradient accent line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #7C3AED 50%, transparent 100%)'
        }}
      />

      {/* Left: Branding */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl cursor-pointer"
          style={{
            background: '#676cec',
            boxShadow: '0 4px 12px rgba(103, 108, 236, 0.3)',
          }}
        >
          BS
        </div>
        <span
  className="text-2xl font-bold tracking-tight"
  style={{
    color: '#ffffff',
  }}
>
  Pipeline Builder
</span>

      </div>

      {/* Right: Submit button */}
      <SubmitButton />
    </div>
  );
};