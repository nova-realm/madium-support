import type { StatusData } from '@/lib/types';

interface Props {
  data: StatusData;
}

function StatusRow({
  name,
  sub,
  isOk,
}: {
  name: string;
  sub: string;
  isOk: boolean;
}) {
  return (
    <div className="status-row">
      <div className="status-row-left">
        <span className="status-row-name">{name}</span>
        <span className="status-row-sub">{sub}</span>
      </div>
      <span className={`status-word ${isOk ? 'ok' : 'warn'}`}>
        {isOk ? 'Operational' : 'Issue detected'}
      </span>
    </div>
  );
}

export default function StatusTable({ data }: Props) {
  const m = data.madium;
  const s = data.support;

  const madiumOk = m.status !== 'downgrade';
  const supportOk = s.status !== 'unavailable';
  const allOk = madiumOk && supportOk;

  const ver = m.version ? ` v${m.version}` : '';
  const madiumSub = madiumOk
    ? (m.workingMsg || 'All systems operational.')
    : 'Outdated — downgrade required.';

  return (
    <>
      {/* Summary banner — like GitHub Status */}
      <div className={`status-banner${allOk ? ' ok' : ' warn'}`}>
        <div className={`status-banner-dot${allOk ? ' ok' : ' warn'}`} />
        <span>{allOk ? 'All Systems Operational' : 'Incident Detected'}</span>
      </div>

      <div className="status-table">
        <div className="status-row">
          <div className="status-row-left">
            <span className="status-row-name">
              Madium
              {m.version && (
                <span className="status-version">v{m.version}</span>
              )}
            </span>
            <span className="status-row-sub">{madiumSub}</span>
          </div>
          <span className={`status-word ${madiumOk ? 'ok' : 'warn'}`}>
            {madiumOk ? 'Operational' : 'Issue detected'}
          </span>
        </div>

        <div className="status-row">
          <div className="status-row-left">
            <span className="status-row-name">Madium Support</span>
            <span className="status-row-sub">
              {supportOk ? 'Support server is online.' : 'Support server is currently unavailable.'}
            </span>
          </div>
          <span className={`status-word ${supportOk ? 'ok' : 'warn'}`}>
            {supportOk ? 'Operational' : 'Issue detected'}
          </span>
        </div>
      </div>
    </>
  );
}
