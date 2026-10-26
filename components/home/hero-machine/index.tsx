/**
 * Placeholder for the Lead Machine hero animation. The `hero` worker replaces
 * this folder; the homepage only depends on this export and its props.
 */
export interface HeroMachineProps {
  className?: string;
}

export function HeroMachine({ className }: HeroMachineProps) {
  return (
    <div
      role="img"
      aria-label="Diagram placeholder: inquiries come in, get answered and land on a calendar as booked jobs."
      data-state="placeholder"
      className={`aspect-[4/3] w-full rounded-2xl border border-dashed border-primary-300 bg-white/60 ${className ?? ''}`}
    />
  );
}

export default HeroMachine;
