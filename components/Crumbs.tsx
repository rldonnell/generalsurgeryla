import Link from 'next/link';
export default function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={i}>{it.href ? <Link href={it.href}>{it.name}</Link> : <span aria-current="page">{it.name}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}
