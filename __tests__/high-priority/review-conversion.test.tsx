import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WorkIndex from '@/components/work/WorkIndex';
import { listedProjectProof } from '@/data/projectProof';
import { BookCallLink } from '@/components/ui/BookCallLink';
import BookPage from '@/app/book/page';
import { bookingContextQuery } from '@/lib/booking-context';

jest.mock('@/components/ui/ProjectRow', () => ({
  __esModule: true,
  default: ({ project }: { project: { name: string } }) => <article>{project.name}</article>,
}));
jest.mock('@/components/booking/CalEmbed', () => ({ CalEmbed: () => <div>Calendar</div> }));
jest.mock('next/navigation', () => ({
  redirect: (href: string) => { throw new Error(`REDIRECT:${href}`); },
  usePathname: () => '/',
}));
const originalCal = process.env.NEXT_PUBLIC_CAL_LINK;
afterEach(() => {
  if (originalCal === undefined) delete process.env.NEXT_PUBLIC_CAL_LINK;
  else process.env.NEXT_PUBLIC_CAL_LINK = originalCal;
});

it('every visible portfolio filter shows at least one listed project', async () => {
  const user = userEvent.setup();
  render(<WorkIndex />);
  expect(screen.queryByRole('button', { name: 'Shopify' })).not.toBeInTheDocument();
  for (const tag of new Set(listedProjectProof.flatMap(project => project.filterTags))) {
    await user.click(screen.getByRole('button', { name: tag }));
    const expected = listedProjectProof.filter(project => project.filterTags.includes(tag));
    expect(screen.getAllByRole('article').length).toBe(expected.length);
    expect(expected.length).toBeGreaterThan(0);
  }
});

for (const cal of ['off', 'sproutflow/15min']) {
it(`preserves a selected tier through a CTA when booking is ${cal}`, () => {
  process.env.NEXT_PUBLIC_CAL_LINK = cal;
  render(<BookCallLink inquiryQuery="tier=lead-flow-audit&email=private%40example.com&next=https://example.com" />);
  expect(screen.getByRole('link')).toHaveAttribute('href', `${cal === 'off' ? '/inquiry' : '/book'}?tier=lead-flow-audit`);
});
}

it('keeps service and tier when switching from booking to written inquiry', async () => {
  process.env.NEXT_PUBLIC_CAL_LINK = 'sproutflow/15min';
  render(await BookPage({ searchParams: Promise.resolve({ path: 'websites', tier: 'website-rescue', email: 'private@example.com' }) }));
  expect(screen.getByRole('heading', { level: 1, name: 'Let’s discuss Website Rescue.' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Send me the details instead' })).toHaveAttribute('href', '/inquiry?path=websites&tier=website-rescue');
});

it('keeps selection in the disabled-booking redirect', async () => {
  process.env.NEXT_PUBLIC_CAL_LINK = 'off';
  expect(await BookPage({ searchParams: Promise.resolve({ tier: 'system-care' }) }).catch((error: Error) => error.message)).toBe('REDIRECT:/inquiry?tier=system-care');
});

it('discards unknown, unsafe, and repeated selections from page params', () => {
  expect(bookingContextQuery({ path: ['websites', 'business-systems'], tier: '<script>', next: 'https://example.com' })).toBe('');
  expect(bookingContextQuery('path=not-a-service&tier=unknown')).toBe('');
  expect(bookingContextQuery('tier=system-care&tier=website-rescue')).toBe('');
});

it('uses a known service heading and discards arbitrary heading input', async () => {
  process.env.NEXT_PUBLIC_CAL_LINK = 'sproutflow/15min';
  const { unmount } = render(await BookPage({ searchParams: Promise.resolve({ path: 'business-systems' }) }));
  expect(screen.getByRole('heading', { level: 1, name: 'Let’s discuss your lead flow.' })).toBeInTheDocument();
  unmount();
  render(await BookPage({ searchParams: Promise.resolve({ tier: 'untrusted title' }) }));
  expect(screen.getByRole('heading', { level: 1, name: 'Pick a time that works.' })).toBeInTheDocument();
});
