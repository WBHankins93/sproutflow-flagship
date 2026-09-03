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
  {
    id: 'nealy-events',
    caseStudySlug: 'nealy-events',
    quote:
      'Before Sproutflow, we were running on word of mouth and Facebook Marketplace only, and bookings were slow and inconsistent. Ben was helpful and professional, and always made time for me even outside our scheduled calls. Since launch, our bookings have grown massively and we are already fully booked for next month. Such a huge help to our business. I would highly recommend him.',
    name: 'Owner',
    role: 'Owner',
    business: 'Nealy Event Decor',
    logoSrc: 'work/client-logos/NealyLogo.png',
    liveUrl: 'https://nealyevents.com/',
  },
  {
    id: 'djn-services',
    caseStudySlug: 'djn-services',
    quote:
      'I am a retired veteran who has run my own operation for over 20 years. Since working with Ben, we have seen a 35% increase in total bookings, and the jobs coming in are much larger. This has been a great help for our business.',
    name: 'Owner',
    role: 'Owner',
    business: 'DJN Services LLC',
    metric: '35% increase in total bookings',
    logoSrc: 'work/client-logos/djn-logo.webp',
    liveUrl: 'https://djnservices.com/',
  },
];

export function getTestimonialForCaseStudy(slug: string): TestimonialEntry | undefined {
  return testimonials.find((testimonial) => testimonial.caseStudySlug === slug);
}

/**
 * Role and business, or name/role/business, depending on whether a real name
 * was given. Several clients are quoted anonymously as "Owner" for both
 * fields, and printing that twice ("Owner, Owner, Business") reads as a typo.
 */
export function getTestimonialByline(testimonial: TestimonialEntry): string {
  if (testimonial.name === testimonial.role) {
    return `${testimonial.role}, ${testimonial.business}`;
  }
  return `${testimonial.name} · ${testimonial.role}, ${testimonial.business}`;
}
