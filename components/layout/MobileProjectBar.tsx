import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function MobileProjectBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary-900/10 bg-[#f7f4ec]/95 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <Link
        href="/inquiry"
        className="flex min-h-11 items-center justify-center gap-2 rounded-[0.35rem] bg-primary-900 px-5 py-2.5 text-sm font-bold text-white"
      >
        Tell us about your project
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
