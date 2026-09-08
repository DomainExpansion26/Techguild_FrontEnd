import React from 'react';
import './cards.css';
import {
  BaseCard,
  MetricCard,
  TrustCard,
  EmptyStateCard,
  TipBannerCard,
  GuideCard,
  StepsCard,
  ChipsCard,
  GuildCard,
} from './variants';

/**
 * Universal Card / Cards Component
 * Supports all design angles, layout requirements, variants, and compound structures.
 */
function Cards({
  variant,
  children,
  ...props
}) {
  switch (variant) {
    case 'metric':
    case 'stat':
      return <MetricCard {...props} />;

    case 'trust':
    case 'reputation':
      return <TrustCard {...props} />;

    case 'empty-state':
    case 'empty':
    case 'action':
    case 'activity':
      return <EmptyStateCard {...props} />;

    case 'tip':
    case 'tip-banner':
    case 'banner-tip':
      return <TipBannerCard {...props}>{children}</TipBannerCard>;

    case 'guide':
    case 'help':
      return <GuideCard {...props} />;

    case 'steps':
    case 'process':
    case 'how-it-works':
      return <StepsCard {...props} />;

    case 'chips':
    case 'pills':
    case 'categories':
      return <ChipsCard {...props} />;

    case 'guild':
      return <GuildCard {...props} />;

    case 'base':
    case 'default':
    default:
      return <BaseCard variant={variant} {...props}>{children}</BaseCard>;
  }
}

// Compound component attachments (Structural Subcomponents)
Cards.Header = BaseCard.Header;
Cards.Title = BaseCard.Title;
Cards.Subtitle = BaseCard.Subtitle;
Cards.Body = BaseCard.Body;
Cards.Footer = BaseCard.Footer;
Cards.Divider = BaseCard.Divider;
Cards.Media = BaseCard.Media;
Cards.Image = BaseCard.Media;
Cards.Badge = BaseCard.Badge;
Cards.Section = BaseCard.Section;

// Compound component attachments (Specialized Variants)
Cards.Base = BaseCard;
Cards.Metric = MetricCard;
Cards.Trust = TrustCard;
Cards.EmptyState = EmptyStateCard;
Cards.Tip = TipBannerCard;
Cards.Guide = GuideCard;
Cards.Steps = StepsCard;
Cards.Chips = ChipsCard;
Cards.Guild = GuildCard;

// Alias export for singular "Card"
export const Card = Cards;

export default Cards;
