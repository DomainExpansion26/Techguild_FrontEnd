// [TechGuild Update: 21-09-2026] Profile card display, ranking & verification tags
import Icon from '@/Components/icons/Icon';
import { APP_STRINGS } from '@/constants/string';
import { CARD_SIZES, ICON_SIZES } from '@/constants/sizes';

export default function GuildCard({
  guildCard,
  name,
  companyName,
  category,
  subtitle,
  logoInitials,
  starRating,
  verifiedText = APP_STRINGS.CARDS.GUILD.VERIFIED_CLIENT,
  location,
  website,
  portfolio,
  skills = [],
  rank,
  guildId,
  memberSince,
  className = '',
  style = {},
  delay,
  width = CARD_SIZES.GUILD_CARD.DEFAULT_WIDTH,
  height = CARD_SIZES.GUILD_CARD.DEFAULT_HEIGHT,
  ...props
}) {
  const STRINGS = APP_STRINGS.CARDS.GUILD;
  const SIZES_CFG = CARD_SIZES.GUILD_CARD;
  const g = guildCard || {};
  const displayName = name || companyName || g.name || g.companyName || STRINGS.DEFAULT_NAME;
  const displaySubtitle = subtitle || category || g.subtitle || g.category || STRINGS.DEFAULT_CATEGORY;
  const isCustomSubtitle = Boolean(subtitle || (category && category.toLowerCase() === category));
  const displayInitials =
    logoInitials ||
    g.logoInitials ||
    (displayName
      ? (displayName.trim().includes(' ')
        ? displayName.trim().split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()
        : (displayName.toUpperCase().startsWith('NEX') ? STRINGS.DEFAULT_INITIALS : displayName.slice(0, 2).toUpperCase()))
      : STRINGS.DEFAULT_INITIALS);
  const displayStars = starRating !== undefined ? starRating : (g.starRating !== undefined ? g.starRating : 4);
  const displayLocation = location || g.location || STRINGS.DEFAULT_LOCATION;

  // Support both portfolio and website props
  const rawPortfolio = portfolio || g.portfolio;
  const rawWebsite = website || g.website;
  const displayLinkText = rawPortfolio
    ? (rawPortfolio.startsWith('Portfolio:')
      ? rawPortfolio
      : `Portfolio: ${rawPortfolio.replace(/^https?:\/\//, '').replace(/\/$/, '')}`)
    : (rawWebsite
      ? (rawWebsite.startsWith(STRINGS.PREFIX_WEBSITE)
        ? rawWebsite
        : `${STRINGS.PREFIX_WEBSITE} ${rawWebsite.replace(/^https?:\/\//, '').replace(/\/$/, '')}`)
      : `${STRINGS.PREFIX_WEBSITE} ${STRINGS.DEFAULT_WEBSITE}`);

  const displaySkills = Array.isArray(skills) && skills.length > 0
    ? skills
    : (Array.isArray(g.skills) && g.skills.length > 0 ? g.skills : []);

  const displayRank = rank || g.rank || STRINGS.DEFAULT_RANK;
  const displayGuildId = guildId || g.guildId || STRINGS.DEFAULT_GUILD_ID;
  const displayMemberSince = memberSince || g.memberSince || STRINGS.DEFAULT_MEMBER_SINCE;

  const combinedStyle = {
    ...(width ? { width, maxWidth: '100%' } : {}),
    ...(height ? { height, minHeight: height } : {}),
    ...(delay ? { animationDelay: delay } : {}),
    ...style,
  };

  return (
    <div
      className={`guild-card-variant-root ${className}`}
      style={{
        position: 'relative',
        width: width || SIZES_CFG.DEFAULT_WIDTH,
        height: height || SIZES_CFG.DEFAULT_HEIGHT,
        minHeight: height || SIZES_CFG.DEFAULT_HEIGHT,
        maxWidth: '100%',
        aspectRatio: SIZES_CFG.ASPECT_RATIO,
        overflow: 'hidden',
        borderRadius: SIZES_CFG.BORDER_RADIUS,
        color: '#ffffff',
        background: 'linear-gradient(132deg, #092055 0%, #0d2c6e 35%, #0f3984 70%, #124095 100%)',
        boxShadow: '0 10px 24px rgba(7, 25, 66, 0.35)',
        isolation: 'isolate',
        boxSizing: 'border-box',
        ...combinedStyle,
      }}
      {...props}
    >
      {/* Background Gradient Accent */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '42%',
          background: 'linear-gradient(180deg, rgba(33, 77, 153, 0) 0%, rgba(33, 77, 153, 0.08) 45%, rgba(43, 92, 176, 0.2) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* HEADER */}
      <div
        style={{
          position: 'absolute',
          top: '6.5%',
          left: '5.5%',
          right: '5.5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 'clamp(12px, 1.15vw, 15px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
          <span style={{ color: '#ffffff' }}>{STRINGS.BRAND_FIRST}</span>
          <span style={{ color: '#3b82f6' }}>{STRINGS.BRAND_SECOND}</span>
        </div>
        <span
          style={{
            fontSize: 'clamp(7.5px, 0.72vw, 9.5px)',
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: 'rgba(223, 233, 255, 0.75)',
            textTransform: 'uppercase',
          }}
        >
          {STRINGS.BADGE_LABEL}
        </span>
      </div>

      {/* MAIN CONTENT BODY */}
      <div
        style={{
          position: 'absolute',
          left: '5.5%',
          top: '18.5%',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          zIndex: 8,
          width: '89%',
        }}
      >
        {/* LOGO / INITIALS BOX */}
        <div
          style={{
            position: 'relative',
            width: '23%',
            maxWidth: '118px',
            aspectRatio: '1 / 1',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              padding: '2px',
              borderRadius: '27.56px',
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '25.56px',
                background: 'linear-gradient(135deg, #1A3F8F 0%, #0D2A67 100%)',
                color: '#ffffff',
                fontSize: 'clamp(18px, 1.9vw, 24px)',
                fontWeight: 800,
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}
            >
              {displayInitials}
            </div>
          </div>

          {/* CHECK BADGE */}
          <span
            aria-label="Verified"
            style={{
              position: 'absolute',
              right: '-3px',
              bottom: '-3px',
              width: 'clamp(20px, 2vw, 25px)',
              height: 'clamp(20px, 2vw, 25px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: '#1545a8',
              border: '2.5px solid #092055',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              zIndex: 20,
            }}
          >
            <Icon name="Check" size={ICON_SIZES['2XS']} color="#ffffff" strokeWidth={3.5} />
          </span>
        </div>

        {/* INFO COLUMN */}
        <div
          style={{
            position: 'relative',
            flex: '1 1 auto',
            minWidth: 0,
            maxWidth: '56%',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              margin: '0 0 2px',
              fontSize: 'clamp(14px, 1.4vw, 19px)',
              lineHeight: 1.15,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              overflowWrap: 'anywhere',
            }}
          >
            {displayName}
          </div>

          <div
            style={{
              margin: '0 0 5px',
              fontSize: 'clamp(7.5px, 0.72vw, 9.5px)',
              lineHeight: 1.1,
              fontWeight: 600,
              letterSpacing: isCustomSubtitle ? '0.01em' : '0.12em',
              color: isCustomSubtitle ? '#cbd5e1' : '#60a5fa',
              textTransform: isCustomSubtitle ? 'none' : 'uppercase',
            }}
          >
            {displaySubtitle}
          </div>

          {/* STARS */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5px',
              margin: '0 0 6px',
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon
                name="Star"
                key={i}
                size={ICON_SIZES['2XS']}
                fill={i < displayStars ? '#ffc107' : 'none'}
                color={i < displayStars ? '#ffc107' : '#3b82f6'}
                strokeWidth={1.5}
              />
            ))}
          </div>

          {/* VERIFIED PILL */}
          {verifiedText && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                lineHeight: 1,
                padding: '3px 9px',
                margin: '0 0 7px',
                borderRadius: '999px',
                background: 'rgba(17, 77, 171, 0.45)',
                border: '1px solid rgba(59, 130, 246, 0.55)',
                color: '#ffffff',
                fontSize: 'clamp(7px, 0.62vw, 8.5px)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                width: 'fit-content',
              }}
            >
              <Icon name="Shield" size={ICON_SIZES['2XS']} color="#ffffff" strokeWidth={2} />
              <span>{verifiedText}</span>
            </div>
          )}

          {/* LOCATION */}
          {displayLocation && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                margin: '0 0 4px',
                fontSize: 'clamp(7.5px, 0.68vw, 9.5px)',
                lineHeight: 1.2,
                color: '#cbd5e1',
                fontWeight: 400,
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '5px',
                  background: 'rgba(17, 77, 171, 0.4)',
                  border: '1px solid rgba(59, 130, 246, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon name="MapPin" size={ICON_SIZES['2XS']} color="#ffffff" strokeWidth={1.8} />
              </div>
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {displayLocation}
              </span>
            </div>
          )}

          {/* PORTFOLIO / WEBSITE */}
          {displayLinkText && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                fontSize: 'clamp(7.5px, 0.68vw, 9.5px)',
                lineHeight: 1.2,
                color: '#cbd5e1',
                fontWeight: 400,
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '5px',
                  background: 'rgba(17, 77, 171, 0.4)',
                  border: '1px solid rgba(59, 130, 246, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon name="Globe" size={ICON_SIZES['2XS']} color="#ffffff" strokeWidth={1.8} />
              </div>
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {displayLinkText}
              </span>
            </div>
          )}

          {/* SKILLS PILLS INSIDE GUILD CARD */}
          {displaySkills && displaySkills.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '5px',
                marginTop: '6px',
              }}
            >
              {displaySkills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#e2e8f0',
                    fontSize: 'clamp(6.5px, 0.6vw, 8px)',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CSS SHIELD BACKGROUND + GOLD RANK LETTER */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '44%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        {/* Back Shield */}
        <span
          style={{
            position: 'absolute',
            width: '38%',
            height: '48%',
            right: '8%',
            top: '20%',
            background: 'rgba(61, 99, 164, 0.22)',
            clipPath: 'polygon(50% 0%, 100% 16%, 100% 57%, 96% 69%, 88% 81%, 76% 90%, 62% 97%, 50% 100%, 38% 97%, 24% 90%, 12% 81%, 4% 69%, 0% 57%, 0% 16%)',
          }}
        />
        {/* Front Shield */}
        <span
          style={{
            position: 'absolute',
            width: '54%',
            height: '78%',
            right: '34%',
            top: '10%',
            background: 'linear-gradient(180deg, rgba(89, 120, 174, 0.26) 0%, rgba(78, 111, 166, 0.22) 64%, rgba(73, 106, 161, 0.16) 100%)',
            clipPath: 'polygon(50% 0%, 100% 18%, 100% 58%, 96% 70%, 89% 81%, 78% 90%, 64% 97%, 50% 100%, 36% 97%, 22% 90%, 11% 81%, 4% 70%, 0% 58%, 0% 18%)',
          }}
        />
        {/* Gold Rank Letter */}
        <span
          style={{
            position: 'absolute',
            right: '44%',
            top: '26%',
            margin: 0,
            fontFamily: '"Times New Roman", "Playfair Display", "Cinzel", Georgia, serif',
            fontSize: 'clamp(58px, 7vw, 92px)',
            lineHeight: 0.9,
            fontWeight: 700,
            background: 'linear-gradient(180deg, #dfc66a 0%, #b89838 52%, #cfba5c 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            opacity: 0.88,
            zIndex: 4,
          }}
        >
          {displayRank}
        </span>
      </div>

      {/* FOOTER */}
      <div
        style={{
          position: 'absolute',
          left: '5.5%',
          right: '5.5%',
          bottom: '5%',
          paddingTop: '6px',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        <div>
          <span
            style={{
              display: 'block',
              margin: '0 0 2px',
              fontSize: 'clamp(6px, 0.52vw, 7.5px)',
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: 'rgba(204, 218, 250, 0.68)',
              textTransform: 'uppercase',
            }}
          >
            {STRINGS.LABEL_GUILD_ID}
          </span>
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(7.5px, 0.7vw, 9.5px)',
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: '0.03em',
              color: '#ffffff',
            }}
          >
            {displayGuildId}
          </span>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span
            style={{
              display: 'block',
              margin: '0 0 2px',
              fontSize: 'clamp(6px, 0.52vw, 7.5px)',
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: 'rgba(204, 218, 250, 0.68)',
              textTransform: 'uppercase',
            }}
          >
            {STRINGS.LABEL_MEMBER_SINCE}
          </span>
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(7.5px, 0.7vw, 9.5px)',
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: '0.03em',
              color: '#ffffff',
            }}
          >
            {displayMemberSince}
          </span>
        </div>
      </div>
    </div>
  );
}
