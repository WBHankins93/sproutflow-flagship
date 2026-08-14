import { Fragment } from 'react';

interface AccentPhraseProps {
  /** Full headline text. */
  children: string;
  /** Exact substring of `children` to set in the accent face. Case sensitive. */
  accent: string;
  /** Tailwind colour class for the accent run. */
  tone?: string;
}

/**
 * Renders one headline with a single phrase set in Newsreader italic.
 *
 * Deliberately takes a plain string and a substring rather than arbitrary
 * children: the design rule is one accented phrase per headline, and a
 * component that can only highlight one run enforces that rule instead of
 * relying on everyone remembering it. If `accent` is not found, the headline
 * still renders in full rather than silently dropping text.
 *
 * Accent italic is for a phrase, never a whole paragraph, and never for UI
 * labels, buttons, or navigation.
 */
export default function AccentPhrase({
  children,
  accent,
  tone = 'text-accent-300',
}: AccentPhraseProps) {
  const at = children.indexOf(accent);

  if (at === -1) {
    return <>{children}</>;
  }

  const before = children.slice(0, at);
  const after = children.slice(at + accent.length);

  return (
    <Fragment>
      {before}
      <span className={`font-accent font-normal italic ${tone}`}>{accent}</span>
      {after}
    </Fragment>
  );
}
