import SectionShell from '@/components/ui/SectionShell';
import { serviceOfferDetails } from '@/data/offerDetails';
import type { ServicePathId } from '@/data/servicePaths';

export default function ServiceOfferDetails({ path }: { path: ServicePathId }) {
  const detail = serviceOfferDetails[path];
  return (
    <SectionShell label="scope and expectations" variant="cream" tone="raised" labelledBy="offer-details-heading">
      <h2 id="offer-details-heading" className="max-w-3xl font-display text-display-md text-primary-900">{detail.title}</h2>
      <p className="mt-5 max-w-3xl text-body-lg text-text-secondary">{detail.intro}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {detail.items.map((item) => <div key={item.title} className="border-t border-primary-900/20 pt-5">
          <h3 className="font-display text-h4 text-primary-900">{item.title}</h3>
          <p className="mt-3 text-body-sm text-text-secondary">{item.body}</p>
        </div>)}
      </div>
    </SectionShell>
  );
}
