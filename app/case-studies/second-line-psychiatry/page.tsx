// app/case-studies/second-line-psychiatry/page.tsx

import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout';
import { getCaseStudy } from '@/data/caseStudies';

const caseStudy = getCaseStudy('second-line-psychiatry')!;

export const metadata = {
  title: { absolute: `${caseStudy.metaTitle} | Sproutflow Studio` },
  description: caseStudy.metaDescription,
  alternates: {
    canonical: '/case-studies/second-line-psychiatry',
  },
};

export default function SecondLinePsychiatryCaseStudy() {
  return <CaseStudyLayout caseStudy={caseStudy} />;
}
