import Marquee from '@/components/ui/Marquee';
import ClientLogo from '@/components/ui/ClientLogo';
import { listedProjectProof } from '@/data/projectProof';

export default function ClientMarqueeSection() {
  return (
    <Marquee
      variant="names"
      speed={46}
      ariaLabel="Selected Sproutflow clients"
      items={listedProjectProof.map((project) => (
        <span key={project.id} className="flex min-w-64 items-center gap-4">
          <ClientLogo project={project} variant="cream" size="md" />
          <span className="block border-l border-primary-900/15 pl-4">
            <span className="block font-display text-lg font-semibold text-primary-900">{project.name}</span>
            <span className="mt-1 block text-eyebrow uppercase text-text-muted">{project.industry}</span>
          </span>
        </span>
      ))}
    />
  );
}
