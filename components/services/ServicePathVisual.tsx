import type { ServicePathId } from '@/data/servicePaths';

export default function ServicePathVisual({ path }: { path: ServicePathId }) {
  if (path === 'business-systems') {
    return (
      <div className="service-world service-world-system" aria-hidden="true">
        <span className="service-hub">SF</span>
        {['Lead', 'Booking', 'CRM', 'Follow-up'].map((label, index) => (
          <span key={label} className={`service-node service-node-${index + 1}`}>
            {label}
          </span>
        ))}
        <span className="service-route" />
      </div>
    );
  }

  if (path === 'growth-support') {
    return (
      <div className="service-world service-world-growth" aria-hidden="true">
        <div className="growth-bars">
          <i />
          <i />
          <i />
          <i />
        </div>
        <svg viewBox="0 0 320 150" role="presentation">
          <path d="M10 125 C70 122 78 88 135 92 S205 60 310 28" />
          <circle cx="310" cy="28" r="6" />
        </svg>
        <span className="growth-note">measure · improve · repeat</span>
      </div>
    );
  }

  return (
    <div className="service-world service-world-website" aria-hidden="true">
      <div className="site-browser">
        <span className="site-browser-bar" />
        <span className="site-heading" />
        <span className="site-copy" />
        <span className="site-button" />
      </div>
      <div className="site-phone">
        <span />
      </div>
      <span className="site-seed" />
    </div>
  );
}
