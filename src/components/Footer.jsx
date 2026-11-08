export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">拆书 × 优势</div>
            <p>用拆书助力优势正向发挥的优势教练。<br />拆得开 · 照得见 · 用得上</p>
            <p className="note">不给标准答案，只陪你把答案从自己身上拆出来。</p>
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#2e2a42', fontWeight: 600, marginBottom: 14 }}>页面导航</div>
            <ul>
              <li><a href="#pains">如果你也这样</a></li>
              <li><a href="#about">关于我</a></li>
              <li><a href="#services">服务与流程</a></li>
              <li><a href="#faq">常见问题</a></li>
            </ul>
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#2e2a42', fontWeight: 600, marginBottom: 14 }}>开始</div>
            <ul>
              <li><a href="#contact">说说你卡住的那件事</a></li>
              <li><a href="#activities">拆书活动</a></li>
              <li><a href="#cases">她们后来做了什么</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© 2026 拆书 × 优势 · 拆书、优势、正向发挥</div>
      </div>
    </footer>
  )
}
