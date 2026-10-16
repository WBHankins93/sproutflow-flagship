import { renderSocialCard, SOCIAL_CARD_ALT, SOCIAL_CARD_CONTENT_TYPE, SOCIAL_CARD_SIZE } from '@/lib/social-card';

export const alt = SOCIAL_CARD_ALT;
export const size = SOCIAL_CARD_SIZE;
export const contentType = SOCIAL_CARD_CONTENT_TYPE;

export default function Image() {
  return renderSocialCard();
}
