import Marquee from '@/components/ui/Marquee';
import { listedProjectProof } from '@/data/projectProof';

export default function ClientMarqueeSection() {
  return (
    <Marquee
      variant="names"
      speed={46}
      ariaLabel="Selected Sproutflow clients"
      items={listedProjectProof.map((project) => (
        <span key={project.id} className="block min-w-52">
          <span className="block font-display text-lg font-semibold text-primary-900">{project.name}</span>
          <span className="mt-1 block text-eyebrow uppercase text-text-muted">{project.industry}</span>
        </span>
      ))}
    />
  );
}
