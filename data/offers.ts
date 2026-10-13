export interface Offer {
  id: string;
  name: string;
  /** Who the offer is for, written as a single line above the name. */
  audience: string;
  price: string;
  priceNote: string;
  includes: string[];
}

/**
 * Fixed-price entry offer for trades and home-service businesses whose
 * website is missing or not working. Rendered as a band above the tiers and
 * listed in structured data and llms.txt, so update all three together.
 */
export const websiteRescue: Offer = {
  id: 'website-rescue',
  name: 'Website Rescue',
  audience: 'For contractors and home-service businesses with a dead, missing, or broken website',
  price: '$1,500',
  priceNote: 'fixed, live 10 business days after your content arrives',
  includes: [
    'Five pages on the domain you already own',
    'A quote form that reaches your phone and email',
    'Google Business Profile cleanup',
    'Mobile-first build you own outright',
  ],
};
