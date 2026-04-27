import type { LeaderboardUser } from '../types';

interface PodiumItemProps {
  entry: LeaderboardUser;
  rank: 1 | 2 | 3;
}

const PodiumItem = ({ entry, rank }: PodiumItemProps) => {
  const isFirst = rank === 1;

  const avatarBorder = isFirst ? '4px solid #fbbf24' : '4px solid #fff';
  const avatarSize = isFirst ? 80 : 64;

  const badgeBg = rank === 1 ? '#eab308' : rank === 2 ? '#94a3b8' : '#92400e';

  const blockBackground =
    rank === 1
      ? 'linear-gradient(180deg, #fef3c7, #fde68a)'
      : 'linear-gradient(180deg, #e2e8f0, #cbd5e1)';
  const blockBorderTop = rank === 1 ? '2px solid #fde047' : '2px solid #cbd5e1';
  const blockHeight = rank === 1 ? '160px' : rank === 2 ? '140px' : '128px';

  const scoreBg = isFirst ? '#fef9c3' : '#fff';
  const scoreBorderColor = isFirst ? '#fde047' : '#e2e8f0';
  const scoreColor = isFirst ? '#ca8a04' : '#0ea5e9';
  const scoreFontSize = isFirst ? '20px' : '18px';

  const order = rank === 1 ? 2 : rank === 2 ? 1 : 3;
  const marginTop = rank === 1 ? '-32px' : '0';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        order,
        marginTop,
      }}
    >
      {/* Avatar with rank badge */}
      <div style={{ position: 'relative', marginBottom: '8px' }}>
        <img
          src={`https://i.pravatar.cc/100?img=${entry.id}`}
          alt={`${entry.firstName} ${entry.lastName}`}
          style={{
            width: `${avatarSize}px`,
            height: `${avatarSize}px`,
            borderRadius: '50%',
            objectFit: 'cover',
            border: avatarBorder,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '-4px',
            right: '-4px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: badgeBg,
            border: '4px solid #fff',
            color: '#fff',
            fontWeight: 700,
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
          aria-hidden="true"
        >
          {rank}
        </span>
      </div>

      {/* Name */}
      <p
        style={{
          color: '#0f172a',
          fontSize: isFirst ? '24px' : '20px',
          fontWeight: 700,
          textAlign: 'center',
          lineHeight: 1.2,
          maxWidth: '140px',
          margin: '0 0 4px 0',
        }}
      >
        {entry.firstName} {entry.lastName}
      </p>

      {/* Role */}
      <p
        style={{
          color: '#64748b',
          fontSize: '14px',
          fontWeight: 500,
          textAlign: 'center',
          maxWidth: '140px',
          margin: '0 0 8px 0',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {entry.title}
      </p>

      {/* Score pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: scoreBg,
          border: `1px solid ${scoreBorderColor}`,
          borderRadius: '20px',
          padding: '6px 16px',
          boxShadow: '0 1px 2px rgba(0,0,0,.05)',
          marginBottom: '12px',
          color: scoreColor,
          fontSize: scoreFontSize,
          fontWeight: 700,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '18px', height: '18px', flexShrink: 0, fill: 'currentColor' }}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
        {entry.score.toLocaleString()}
      </div>

      {/* Podium block */}
      <div
        style={{
          background: blockBackground,
          borderTop: blockBorderTop,
          height: blockHeight,
          width: '128px',
          borderRadius: '12px 12px 0 0',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,.06)',
          paddingTop: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: isFirst ? '#ca8a04' : '#94a3b8',
            fontWeight: 800,
            fontSize: '40px',
            lineHeight: 1,
          }}
        >
          {rank}
        </span>
      </div>
    </div>
  );
};

interface PodiumProps {
  entries: LeaderboardUser[];
}

const Podium = ({ entries }: PodiumProps) => {
  const top3 = entries.slice(0, 3);

  if (top3.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 0',
          color: '#94a3b8',
          fontSize: '14px',
        }}
      >
        No results to display.
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '24px',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '32px 8px 0',
      }}
    >
      {top3[1] && <PodiumItem entry={top3[1]} rank={2} />}
      {top3[0] && <PodiumItem entry={top3[0]} rank={1} />}
      {top3[2] && <PodiumItem entry={top3[2]} rank={3} />}
    </div>
  );
};

export default Podium;
