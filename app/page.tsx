import Link from 'next/link';
import BodyMap from '@/components/BodyMap';
import ConsultForm from '@/components/ConsultForm';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';
import { allFaqs, getProcedures, settings as s } from '@/lib/content';
import { faqPage } from '@/lib/schema';

export const metadata = {
  title: 'Los Angeles General Surgeon | Hernia & Gallbladder | Dr. Moein',
  description:
    'Board-certified general surgeon Dr. Babak Moein performs minimally invasive hernia, gallbladder and appendix surgery in Century City, Los Angeles.',
  alternates: { canonical: '/' },
};

const homeQuestions = [
  'Can you heal a hernia without surgery?',
  'How long does it take to recover from hernia surgery?',
  'What is the difference between open and laparoscopic hernia surgery?',
  'What are the symptoms of an inguinal hernia?',
  'What does gallstone pain feel like?',
  'How long does it take to recover from gallbladder surgery?',
];
const homeFaqs = homeQuestions.map((q) => allFaqs.find((f) => f.q === q)!).filter(Boolean);

const firstSentence = (t = '') => t.split(/(?<=\.)\s/)[0];

export default function Home() {
  const procs = getProcedures();
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', ...faqPage(homeFaqs, `${s.baseUrl}/`) }} />
      <section className="hero">
        <div className="wrap">
          <div>
            <h1>General surgery in Los Angeles, through the smallest incision that works.</h1>
            <p className="lede">
              Dr. Babak Moein treats hernias, gallbladder disease and appendicitis with laparoscopic and robotic
              techniques in Century City. Many patients go home the same day.
            </p>
            <div className="actions">
              <a className="btn btn-marker" href={`tel:${s.phoneE164}`}>Call {s.phone}</a>
              <Link className="btn btn-line" href="/contact-us/#request">Request a consultation</Link>
            </div>
            <div className="creds">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.doctor.photo} alt={`${s.doctor.name}, general surgeon`} width={56} height={56} />
              <span>
                <strong>{s.doctor.name}, {s.doctor.credentials}</strong>
                <br />
                Board certified by the {s.doctor.board}. Residency at Georgetown, fellowship at Montefiore.
              </span>
            </div>
          </div>
          <BodyMap />
        </div>
      </section>

      <section className="section band" id="procedures">
        <div className="wrap">
          <div className="section-head">
            <h2>Procedures</h2>
            <p>Each page explains the condition, how the operation is done, and what recovery looks like, in plain language.</p>
          </div>
          <ul className="proc-index">
            {procs.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}/`}>
                  <span className="name">{p.navLabel}</span>
                  <span className="go">Read</span>
                  <span className="blurb">{firstSentence(p.summary)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap doctor">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dr-moein-3.webp" alt={`${s.doctor.name}, ${s.doctor.credentials}`} width={489} height={630} loading="lazy" />
          <div>
            <h2>Your surgeon, from first visit to final check-up</h2>
            <p style={{ marginTop: '1rem', maxWidth: '60ch' }}>
              Dr. Moein is a Los Angeles native and a Fellow of the American College of Surgeons with more than 20 years of surgical
              experience. He focuses on minimally invasive abdominal surgery and follows each patient through recovery.
            </p>
            <dl>
              {s.doctor.education.map((e) => (
                <div key={e.school}>
                  <dt>{e.school}</dt>
                  <dd>{e.detail}</dd>
                </div>
              ))}
              <div>
                <dt>{s.doctor.board}</dt>
                <dd>Board certified in general surgery</dd>
              </div>
            </dl>
            <Link className="btn btn-line" href="/general-surgeon-dr-babak-moein/">About Dr. Moein</Link>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="section-head">
            <h2>Minimally invasive or open surgery?</h2>
            <p>
              Dr. Moein uses laparoscopic or robotic techniques whenever they are safe for your case. Open surgery is still the right
              choice for some large or complicated repairs.
            </p>
          </div>
          <div className="table-scroll">
            <table className="compare">
              <thead>
                <tr><th scope="col">What changes</th><th scope="col">Minimally invasive</th><th scope="col">Open</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">Incisions</th><td>A few small incisions</td><td>One longer incision</td></tr>
                <tr><th scope="row">Going home</th><td>Often the same day</td><td>Sometimes an overnight stay</td></tr>
                <tr><th scope="row">Pain after surgery</th><td>Usually less</td><td>Usually more</td></tr>
                <tr><th scope="row">Back to desk work</th><td>Often within a week</td><td>Often two weeks or more</td></tr>
                <tr><th scope="row">Scarring</th><td>Small, easy to hide</td><td>A longer scar</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section band-dark">
        <div className="wrap">
          <div className="section-head"><h2>What patients say</h2></div>
          <div className="quotes">
            <blockquote>
              <p>Dr. Moein performed my hernia surgery laparoscopically. Recovery was much faster than I expected, and I was back at work in a few days.</p>
              <footer>Michael R., hernia repair</footer>
            </blockquote>
            <blockquote>
              <p>He removed my gallbladder laparoscopically. The whole process was seamless, and his team supported me through recovery.</p>
              <footer>James K., gallbladder surgery</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Common questions</h2>
            <p><Link href="/frequently-asked-question/">See all questions</Link></p>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
      </section>

      <section className="section band" id="contact">
        <div className="wrap contact-grid">
          <ConsultForm />
          <div>
            <address className="nap">
              <strong>{s.siteName}</strong>
              {s.street}<br />
              {s.city}, {s.region} {s.postalCode}<br />
              <a href={`tel:${s.phoneE164}`}>{s.phone}</a><br />
              <a href={`mailto:${s.email}`}>{s.email}</a>
            </address>
            <iframe className="map" src={s.mapEmbed} title="Map to General Surgery LA in Century City" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </>
  );
}
