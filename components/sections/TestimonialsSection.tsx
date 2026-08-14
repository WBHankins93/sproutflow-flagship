import { Quote } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsSection() {
  return (
    <SectionShell index="06" label="testimonials" variant="cream" labelledBy="testimonials-heading">
      <h2 id="testimonials-heading" className="max-w-4xl font-display text-display-sm text-primary-900">
        What clients say after the work is{' '}
        <span className="font-accent font-normal italic text-accent-700">in use.</span>
      </h2>
      <div className="mt-12 grid gap-px border border-primary-900/20 bg-primary-900/20 lg:grid-cols-2">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.id} className="bg-white p-7 md:p-10">
            <Quote className="h-7 w-7 text-accent-700" aria-hidden="true" />
            <blockquote className="mt-7 font-accent text-2xl italic leading-relaxed text-primary-900">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-8 border-t border-primary-900/15 pt-5">
              <p className="font-semibold text-primary-900">{testimonial.name}</p>
              <p className="mt-1 text-body-sm text-text-secondary">
                {testimonial.role}, {testimonial.business}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}
