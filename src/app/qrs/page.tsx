import type { Metadata } from 'next';
import Topbar from '@/components/Topbar';
import QRTable from '@/components/QRTable';
import config from '@data/config.json';
import qrsData from '@data/qrs.json';
import type { QR } from '@/lib/types';

export const metadata: Metadata = { title: 'Quick Replies' };

export default function QRsPage() {
  const qrs = (qrsData as QR[]).filter(q => q.enabled !== false);

  return (
    <>
      <Topbar activePage="qrs" config={config} />
      <main id="page-qrs">
        <QRTable qrs={qrs} config={config} />
      </main>
    </>
  );
}
