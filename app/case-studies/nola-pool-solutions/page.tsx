// app/case-studies/nola-pool-solutions/page.tsx

import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout';
import { getCaseStudy } from '@/data/caseStudies';

const caseStudy = getCaseStudy('nola-pool-solutions')!;

export const metadata = {
  title: { absolute: `${caseStudy.metaTitle} | Sproutflow Studio` },
  description: caseStudy.metaDescription,
  alternates: {
    canonical: '/case-studies/nola-pool-solutions',
  },
};

export default function NOLAPoolCaseStudy() {
  return <CaseStudyLayout caseStudy={caseStudy} />;
}
