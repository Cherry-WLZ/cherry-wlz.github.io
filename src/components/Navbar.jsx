const links = [
  { href: '#about', label: '关于我' },
  { href: '#services', label: '我能做什么' },
  { href: '#cases', label: '客户案例' },
  { href: '#activities', label: '拆书活动' },
  { href: '#faq', label: '常见问题' },
]

export default function Navbar() {
  return (
    <div className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="brand">拆书 <em>×</em> 优势</a>
        <nav className="nav-links">
          {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <a href="#contact" className="nav-cta">说说你的场景</a>
      </div>
    </div>
  )
}
