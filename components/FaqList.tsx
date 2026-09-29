import type { Faq } from '@/lib/content';
export default function FaqList({ faqs, open = false }: { faqs: Faq[]; open?: boolean }) {
  return (
    <div className="faq">
      {faqs.map((f, i) => (
        <details key={i} open={open && i === 0}>
          <summary>{f.q}</summary>
          <div className="answer"><p>{f.a}</p></div>
        </details>
      ))}
    </div>
  );
}
