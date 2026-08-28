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
} from './variants';

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

    case 'base':
    default:
      return <BaseCard {...props}>{children}</BaseCard>;
  }
}

// Compound component attachments
Cards.Base = BaseCard;
Cards.Metric = MetricCard;
Cards.Trust = TrustCard;
Cards.EmptyState = EmptyStateCard;
Cards.Tip = TipBannerCard;
Cards.Guide = GuideCard;
Cards.Steps = StepsCard;
Cards.Chips = ChipsCard;

export default Cards;
