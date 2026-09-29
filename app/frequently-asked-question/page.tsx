import Crumbs from '@/components/Crumbs';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';
import { allFaqs, settings as s } from '@/lib/content';
import { breadcrumbs, faqPage } from '@/lib/schema';

export const metadata = {
  title: 'General Surgery Frequently Asked Questions | Dr. Moein',
  description: 'Answers to common questions about hernia, hiatal hernia and gallbladder surgery, recovery and what to expect, from Dr. Babak Moein in Los Angeles.',
  alternates: { canonical: '/frequently-asked-question/' },
};

export default function Faq() {
  const pageUrl = `${s.baseUrl}/frequently-asked-question/`;
  return (
    <div className="wrap" style={{ paddingBottom: '4rem' }}>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [faqPage(allFaqs, pageUrl), breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Frequently asked questions', path: '/frequently-asked-question/' }])] }} />
      <header className="page-head">
        <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Frequently asked questions' }]} />
        <h1>Frequently asked questions</h1>
      </header>
      <FaqList faqs={allFaqs} open />
    </div>
  );
}
