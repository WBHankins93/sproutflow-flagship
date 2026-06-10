// app/case-studies/big-butt-association/page.tsx
// TODO: Confirm this client should be featured as a case study before deploy.
// Remove this file and the matching entry in data/caseStudies.ts to exclude it.

import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout';
import { getCaseStudy } from '@/data/caseStudies';

const caseStudy = getCaseStudy('big-butt-association')!;

export const metadata = {
  title: { absolute: `${caseStudy.metaTitle} | Sproutflow Studio` },
  description: caseStudy.metaDescription,
  alternates: {
    canonical: '/case-studies/big-butt-association',
  },
};

export default function BigButtAssociationCaseStudy() {
  return <CaseStudyLayout caseStudy={caseStudy} />;
}
