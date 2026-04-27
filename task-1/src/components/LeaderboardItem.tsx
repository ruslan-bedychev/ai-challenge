import { useState } from 'react';
import type { LeaderboardUser } from '../types';

interface LeaderboardItemProps {
  entry: LeaderboardUser;
  rank: number;
}

const TECHNICAL_CATS = new Set(['Engineering', 'Analytics', 'QA', 'Operations', 'Security']);

const LeaderboardItem = ({ entry, rank }: LeaderboardItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const techCount = entry.activities.filter((a) => TECHNICAL_CATS.has(a.category)).length;
  const otherCount = entry.activities.filter((a) => !TECHNICAL_CATS.has(a.category)).length;

  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${isOpen ? '#0ea5e9' : '#e2e8f0'}`,
        borderRadius: '12px',
        boxShadow: isOpen ? '0 4px 12px rgba(0,0,0,.1)' : '0 1px 3px rgba(0,0,0,.1)',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
    >
      {/* Main row — entire row is clickable */}
      <div
        className="flex items-center gap-4 transition-colors duration-150 cursor-pointer"
        style={{ padding: '20px 24px' }}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
      >
        {/* Rank */}
        <span
          style={{
            minWidth: '32px',
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '24px',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {rank}
        </span>

        {/* Avatar */}
        <img
          src={`https://i.pravatar.cc/100?img=${entry.id}`}
          alt={`${entry.firstName} ${entry.lastName}`}
          style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
        />

        {/* Name + Title */}
        <div className="flex-1 min-w-0">
          <p style={{ fontWeight: 600, color: '#0f172a', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {entry.firstName} {entry.lastName}
          </p>
          <p style={{ color: '#64748b', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.title}</p>
        </div>

        {/* Stat icons */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          {techCount > 0 && (
            <div className="flex items-center gap-1" style={{ color: '#0ea5e9' }}>
              {/* Monitor / screen icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <path strokeLinecap="round" d="M8 21h8M12 17v4" />
              </svg>
              <span className="text-sm font-medium">{techCount}</span>
            </div>
          )}
          {otherCount > 0 && (
            <div className="flex items-center gap-1" style={{ color: '#0ea5e9' }}>
              {/* Eye icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="text-sm font-medium">{otherCount}</span>
            </div>
          )}
        </div>

        {/* Score section */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px', color: '#0ea5e9', fontSize: '24px', fontWeight: 700 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '28px', height: '28px', fill: 'currentColor', flexShrink: 0 }}
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
          </svg>
          <span>{entry.score.toLocaleString()}</span>
        </div>

        {/* Toggle chevron */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          style={{
            marginLeft: '4px',
            padding: '8px',
            borderRadius: '50%',
            background: isOpen ? '#e0f2fe' : '#f1f5f9',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.2s',
          }}
          aria-label={isOpen ? 'Collapse' : 'Expand'}
        >
          <svg
            style={{ width: '20px', height: '20px', color: '#0ea5e9', transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Expandable activity panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div style={{ margin: '0 24px 16px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Recent Activity
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {entry.activities.map((activity) => (
              <div key={activity.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', padding: '0 0 12px 0', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ minWidth: 0, marginRight: '16px' }}>
                  <p style={{ color: '#0f172a', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{activity.name}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>
                    {activity.category} &bull; {activity.date}
                  </p>
                </div>
                <span style={{ color: '#0ea5e9', fontWeight: 700, flexShrink: 0 }}>
                  +{activity.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardItem;
