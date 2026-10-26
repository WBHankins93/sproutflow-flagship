import type { Metadata } from 'next';
import { Footer } from '@/components/layout/Footer';
import { Eyebrow, Heading, Section } from '@/components/v3';
import { WebsiteCheck } from '@/components/website-check/WebsiteCheck';
import { prefillFromQuery } from '@/components/website-check/prefill';

export const metadata: Metadata = {
  title: 'Free website check',
  description:
    'Enter your website address. I check six things a customer runs into first, and show you the results right here. No sign-up.',
  alternates: { canonical: '/check' },
};

type Props = { searchParams?: Promise<{ url?: string | string[] }> };

export default async function CheckPage({ searchParams }: Props) {
  // /check?url=example.com fills the field. The check still waits for the button.
  const params = searchParams ? await searchParams : {};
  const initialUrl = prefillFromQuery(params.url);

  return (
    <>
      <Section tone="birch" labelledBy="check-h">
        <div className="max-w-4xl">
          <Eyebrow>Free website check</Eyebrow>
          <Heading as="h1" id="check-h" italic="job" className="mt-5">
            Is your website doing its job? Check it in 10 seconds.
          </Heading>
          <p className="mt-5 max-w-[60ch] text-body-lg text-[#4A574D]">
            Enter your website address. I check six things a customer runs into first, and show you the results right
            here. No sign-up.
          </p>
        </div>
        <div className="mt-10 md:mt-12">
          <WebsiteCheck initialUrl={initialUrl} />
        </div>
      </Section>
      <Footer />
    </>
  );
}
