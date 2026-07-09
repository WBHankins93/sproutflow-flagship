export interface TestimonialEntry {
  id: string;
  caseStudySlug: string;
  quote: string;
  name: string;
  role: string;
  business: string;
  metric?: string;
  logoSrc?: string;
  liveUrl?: string;
}

export const testimonials: TestimonialEntry[] = [
  {
    id: 'second-line-psychiatry',
    caseStudySlug: 'second-line-psychiatry',
    quote:
      'We didn’t have a current website and were working through client referrals only, but thanks to Sproutflow Studio we have seen a tremendous growth of incoming clients. The booking platform connected to our Google business account really helped our team.',
    name: 'Dr. Lauryn Richard, PMHNP',
    role: 'Founder',
    business: 'Second Line Psychiatry',
    metric: '50% more qualified inquiries',
    logoSrc: 'work/client-logos/second-line.png',
    liveUrl: 'https://www.secondlinepsychiatry.com/',
  },
  {
    id: 'nola-pool-solutions',
    caseStudySlug: 'nola-pool-solutions',
    quote:
      'Incredible professionalism. Handled the project quickly and kept constant communication throughout. Really pleased with the maintenance and upkeep service after the project was completed. It’s nice to know that I can focus on my business without worrying about this anymore.',
    name: 'Owner',
    role: 'Owner',
    business: 'NOLA Pool Solutions',
    metric: '30% customer acquisition growth',
    logoSrc: 'work/client-logos/logo.png',
    liveUrl: 'https://nolapoolsolutions.com/',
  },
];

export function getTestimonialForCaseStudy(slug: string): TestimonialEntry | undefined {
  return testimonials.find((testimonial) => testimonial.caseStudySlug === slug);
}
