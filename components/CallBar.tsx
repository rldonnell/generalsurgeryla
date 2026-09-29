import { settings as s } from '@/lib/content';
export default function CallBar() {
  return (
    <div className="call-bar">
      <a className="btn btn-marker" href={`tel:${s.phoneE164}`}>Call the office</a>
      <a className="btn btn-line" href="/contact-us/#request">Book a consult</a>
    </div>
  );
}
