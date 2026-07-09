import Testimonial from '@/components/Testimonial';
import { testimonials } from '@/data/testimonials';

export default function HomeTestimonialsSection() {
  const featured = testimonials[0];

  if (!featured) {
    return null;
  }

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <Testimonial testimonial={featured} />
      </div>
    </section>
  );
}
