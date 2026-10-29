import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Eyebrow, Heading, Section } from '@/components/v3';
import { homeBen } from '@/data/home';
import { getTestimonialByline, testimonials } from '@/data/testimonials';
import { getImageUrl } from '@/lib/blob-images';
import { TEXT_LINK_CLASS } from './styles';

/** The excerpt only renders when it is a verbatim part of the published quote. */
export function getBenTestimonial() {
  const testimonial = testimonials.find((entry) => entry.id === homeBen.testimonialId);
  if (!testimonial || !testimonial.quote.includes(homeBen.excerpt)) return null;
  return { excerpt: homeBen.excerpt, byline: getTestimonialByline(testimonial) };
}

/** 9. Ben: photo, two short paragraphs, credentials and one client's words. */
export default function BenSection() {
  const quote = getBenTestimonial();

  return (
    <Section tone="lichen" rhythm="tight" id="about" labelledBy="home-ben-h">
      <Eyebrow index="06">{homeBen.eyebrow}</Eyebrow>
      <Heading as="h2" id="home-ben-h" className="mt-4">
        {homeBen.heading}
      </Heading>

      <div className="mt-8 grid gap-8 md:grid-cols-12 lg:gap-12">
        <div className="relative aspect-[4/5] w-40 overflow-hidden rounded-2xl border border-primary-900/10 bg-cream-300 md:col-span-4 md:w-full lg:col-span-3">
          <Image
            src={getImageUrl('ben-photo.png')}
            alt={homeBen.photoAlt}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 768px) 30vw, 160px"
            className="object-cover object-top"
          />
        </div>

        <div className="min-w-0 md:col-span-8 lg:col-span-5">
          {homeBen.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mb-4 max-w-[60ch] font-body text-body-lg text-primary-900">
              {paragraph}
            </p>
          ))}
          <p className="mt-6 border-l-2 border-ink-700 pl-4 font-body text-body font-semibold text-primary-900">
            {homeBen.credentials}
          </p>
          <Link href="/about" className={`${TEXT_LINK_CLASS} mt-4`} data-cta="about">
            {homeBen.aboutLink}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {quote && (
          <figure className="min-w-0 md:col-span-12 lg:col-span-4">
            <blockquote className="font-display text-display-sm text-primary-900">
              <p>&ldquo;{quote.excerpt}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-4 font-body text-body-sm text-[#4A574D]">{quote.byline}</figcaption>
          </figure>
        )}
      </div>
    </Section>
  );
}
