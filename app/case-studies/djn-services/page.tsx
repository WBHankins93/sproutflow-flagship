// app/case-studies/djn-services/page.tsx

import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout';
import { getCaseStudy } from '@/data/caseStudies';

const caseStudy = getCaseStudy('djn-services')!;

export const metadata = {
  title: { absolute: `${caseStudy.metaTitle} | Sproutflow Studio` },
  description: caseStudy.metaDescription,
  alternates: {
    canonical: '/case-studies/djn-services',
  },
};

export default function DJNServicesCaseStudy() {
  return <CaseStudyLayout caseStudy={caseStudy} />;
}
