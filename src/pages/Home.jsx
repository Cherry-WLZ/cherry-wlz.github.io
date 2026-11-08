import { useRef, useState } from 'react'

const pains = [
  '书读了不少，课也上了，遇到事还是原来的反应。',
  '你明明挺能干，却总觉得自己在耗——可能是最强的那一面用过了头。',
  '换岗、转行、述职之前，你说不清自己到底值钱在哪。',
]

const differences = [
  { alt: '优势测评', miss: '标签之后到底怎么办', mine: '把标签翻译回具体场景里的动作' },
  { alt: '读书会、共读群', miss: '书和你自己到底什么关系', mine: '拆的是你的经历，书只是入口' },
  { alt: '职业规划咨询', miss: '你自身已有的可用资源', mine: '从优势出发，不从模板出发' },
  { alt: '心理疏导', miss: '下一步具体做什么', mine: '负责后半段：把看清变成做成' },
]

const stages = [
  { name: '一阶｜拆原文', do: '用一句话重述作者到底在说什么，去掉例子只留主张', get: '一个能被验证的判断' },
  { name: '二阶｜拆自己', do: '在你的经历里找出「用对过」和「用反过」的两个真实场景', get: '一份看清自己优势的证据' },
  { name: '三阶｜拆下一步', do: '把它压缩成一个小动作，小到这周就能做', get: '一个当周可执行的动作' },
]

const services = [
  {
    name: '一对一优势解困 · 60 分钟',
    verb: '聊清',
    fields: [
      ['适合谁', '手上有一件具体的事正卡着：一个决定、一次沟通、一个反复出现的反应'],
      ['解决什么', '你看不清这件事里，自己的优势是被用对了，还是用过了头'],
      ['交付什么', '一次对话 + 一页拆解记录（你的优势证据、用过头的地方、这周的下一步）+ 48 小时内一次文字跟进'],
      ['怎么做', '你带一件事来，我带你走完三阶。不提前发长问卷，不做测评'],
      ['价格与周期', '具体报价与可约时段，聊清场景后一起定'],
    ],
  },
  {
    name: '优势拆书小班 · 4 周',
    verb: '练成',
    fields: [
      ['适合谁', '想系统地把优势用在自己的选择里，一个人拆容易走神，需要同伴照见的人'],
      ['解决什么', '你对自己的优势只有模糊印象，说不清也验证不了'],
      ['交付什么', '四次共拆 + 一本属于你自己的拆解手册 + 结营一次 30 分钟一对一'],
      ['怎么做', '每周一次 90 分钟，6 到 8 人。每周拆一个主题：识别、用对、用过头、下一步。每人每周提交一张便签，现场互拆'],
      ['价格与周期', '开班时间与费用确定后在这里更新，先聊清场景再决定'],
    ],
  },
  {
    name: '团队拆书工作坊 · 半天 3 小时',
    verb: '带走',
    fields: [
      ['适合谁', '企业 HR、团队负责人、读书会社群——想让一群人用同一套语言谈「优势」的人'],
      ['解决什么', '团队里「优势」是个空词，评价人、分配活、做复盘时各说各话'],
      ['交付什么', '现场共拆 + 一张团队优势地图 + 一套可复用的拆书模板'],
      ['怎么做', '从一段与场景强相关的原文切入，分小组拆自己团队的真实事件，最后合成团队语言'],
      ['价格与周期', '按场次报价，需提前沟通选题'],
    ],
  },
]

const steps = [
  { t: '说说你的场景', d: '填一个两分钟的表，写一件正在卡住的事。' },
  { t: '48 小时内回你', d: '我告诉你能帮上什么，帮不上也会给你一个方向。' },
  { t: '定一次拆解', d: '选一项服务，约时间，带上那件事。' },
  { t: '带走一个动作', d: '结束时你手上有一个当周可做的动作，以及以后自查的方法。' },
]

const faqs = [
  { q: '这和职业规划、心理咨询有什么不同？', a: '职业规划给你路径，心理咨询先接住情绪，我做的是后半段：把你已有的优势拆成这一周能做的动作。三者可以并行，我不替代它们。' },
  { q: '我没读过书，或者读不下去，能来吗？', a: '能。拆书不要求你先读完。你只需要带一件真实发生过的事，书由我选、由我拆，你负责对照自己。' },
  { q: '拆书是不是就是读书会？', a: '不是。读书会关心「书讲了什么」，拆书只关心「这段原文让你想起自己的哪件事、下一步你改哪一个动作」。' },
  { q: '一定要先做优势测评吗？', a: '不需要。测评给的是标签，我们用的是你经历里的证据。你做过也可以带来，我们把它拆回具体场景。' },
  { q: '一次 60 分钟真的能解决吗？', a: '一次只解决你带来的那一件事，不解决你的人生。但那件事结束后，你会拿到一个当周动作和一套自查方法，通常就够了。' },
  { q: '收费和周期是怎样的？', a: '一对一、小班、工作坊三种方式各有报价，所有服务都先聊清场景再决定，聊不清我不会建议你买。' },
]

const blockOptions = ['说不清优势', '知道但用不出来', '优势用过头反而耗', '选择与转型卡住']
const wayOptions = ['一对一', '小班', '工作坊', '还不确定']
const timeOptions = ['这周内', '这个月内', '先了解']

const emptyForm = { name: '', contact: '', story: '', block: '', book: '', way: '', timing: '' }

function ContactForm() {
  const [form, setForm] = useState(emptyForm)
  const [result, setResult] = useState('')
  const areaRef = useRef(null)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    const text = [
      `称呼：${form.name.trim()}`,
      `联系方式：${form.contact.trim()}`,
      `我想解决的那件事：${form.story.trim()}`,
      `我卡在哪：${form.block || '未选'}`,
      `最近在读或想读的书：${form.book.trim() || '未填'}`,
      `更想要的方式：${form.way || '未选'}`,
      `时间预期：${form.timing || '未选'}`,
    ].join('\n')
    setResult(text)
  }

  const copy = () => {
    if (areaRef.current) {
      areaRef.current.select()
      try { document.execCommand('copy') } catch { /* 用户可手动复制 */ }
    }
  }

  const mail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent('说说我卡住的那件事')}&body=${encodeURIComponent(result)}`
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <div className="form-grid">
        <div className="field">
          <label>怎么称呼你<span>*</span></label>
          <input value={form.name} onChange={set('name')} required placeholder="怎么称呼你" />
        </div>
        <div className="field">
          <label>联系方式<span>*</span></label>
          <input value={form.contact} onChange={set('contact')} required placeholder="微信或邮箱，方便我回你" />
        </div>
        <div className="field full">
          <label>你想解决的那件事<span>*</span> <span className="hint">说一件具体的事，两句话就够</span></label>
          <textarea value={form.story} onChange={set('story')} required placeholder="最近哪件事让你觉得「我怎么又这样」，或者哪个决定你已经反复想了好几天" />
        </div>
        <div className="field full">
          <label>你觉得自己卡在哪<span>*</span></label>
          <select value={form.block} onChange={set('block')} required>
            <option value="">选一个最接近的</option>
            {blockOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="field">
          <label>最近在读或想读的书 <span className="hint">选填</span></label>
          <input value={form.book} onChange={set('book')} placeholder="在读什么，或者想读还没读的" />
        </div>
        <div className="field">
          <label>你更想要哪种方式 <span className="hint">选填</span></label>
          <select value={form.way} onChange={set('way')}>
            <option value="">还不确定也可以空着</option>
            {wayOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="field">
          <label>时间预期 <span className="hint">选填</span></label>
          <select value={form.timing} onChange={set('timing')}>
            <option value="">选填</option>
            {timeOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div className="btn-row">
        <button type="submit" className="btn btn-primary">写好了，发我 →</button>
      </div>
      <p className="micro">不用写完整，也不用写得漂亮。填完我会在 48 小时内回复你，先聊清你的场景，再决定要不要一起做。</p>

      {result && (
        <div className="form-result">
          <strong style={{ color: '#2e2a42' }}>收到，你说的这件事我看到了。</strong>
          <p style={{ margin: '8px 0 0' }}>我会在 48 小时内回你，先问两个问题，再告诉你这件事可以怎么拆。如果它不适合用拆书的方式解决，我也会直接说，并给你一个别的方向。</p>
          <p className="note" style={{ marginTop: 14 }}>本站的表单接收通道还在配置中，请先复制下面这段内容，通过微信或邮件发给我；也可以直接打开邮件草稿。</p>
          <textarea ref={areaRef} readOnly value={result} />
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={copy}>复制内容</button>
            <button type="button" className="btn btn-ghost" onClick={mail}>打开邮件草稿</button>
          </div>
        </div>
      )}
    </form>
  )
}

export default function Home() {
  return (
    <main id="top">
      <section className="hero" id="hero">
        <div className="wrap">
          <div className="hero-card">
            <div className="eyebrow">拆书 × 优势 · 一对一陪拆</div>
            <h1>你的优势，<br /><em>可能一直在用反方向。</em></h1>
            <p className="lead">我是优势教练，拆书帮三级拆书家、人力资源从业者。我不给你一份测评报告，我陪你拆开一段原文、也拆开你自己的经历，找到那个这周就能做的动作。</p>
            <div className="btn-row">
              <a href="#contact" className="btn btn-primary">说说我卡住的那件事</a>
              <a href="#activities" className="btn btn-ghost">看看往期拆书活动</a>
            </div>
            <p className="micro">填完我会在 48 小时内回复你，先聊清你的场景，再决定要不要一起做。</p>
            <div className="wordline">
              <span>拆书</span><span>优势</span><span>正向发挥</span>
              <span>一本书 · 一支笔 · 一张便签</span>
            </div>
          </div>
        </div>
      </section>

      <section id="pains">
        <div className="wrap">
          <h2>如果你也这样，我们会聊得来</h2>
          <div className="grid grid-3" style={{ marginTop: 34 }}>
            {pains.map((t, i) => (
              <div className="card" key={i}>
                <div className="quote-mark">“</div>
                <div className="quote">{t}</div>
              </div>
            ))}
          </div>
          <p className="lead" style={{ marginTop: 30, marginBottom: 0 }}>这三种，说到底是同一件事——你的优势，没有被放在对的位置上。</p>
        </div>
      </section>

      <section className="alt" id="about">
        <div className="wrap">
          <div className="eyebrow">凭什么信我</div>
          <h2>关于我：我拆过很多书，也拆过很多人</h2>
          <div className="story" style={{ marginTop: 30 }}>
            <p>做人力资源的那些年，我面过很多人，也送走过很多人。最让我放不下的不是能力不够的人，而是那些明明很强、却一直在用错方向的人——他们把最锋利的那一面，用来削自己。</p>
            <p>后来我开始拆书。拆到第三年我才发现，拆书真正拆的从来不是书，是读的人。RIA 便签法要求你把一段原文用自己的话重述、写下自己真实发生过的经历、再写下一步怎么做。这三步走完，一个抽象的道理才会变成你身上的一个动作。</p>
            <p>所以我现在的身份是优势教练：用拆书这套方法，陪你把「我的优势是什么」这种大问题，拆成「这周我在哪件事上先这样用一次」。</p>
          </div>

          <div style={{ marginTop: 8, marginBottom: 40 }}>
            <span className="tag">拆得开</span><span className="tag">照得见</span><span className="tag">用得上</span>
          </div>

          <div className="credential">
            <span>拆书帮三级拆书家</span>
            <span>人力资源从业背景</span>
            <span>RIA 便签法带拆</span>
            <span>用拆书助力优势正向发挥</span>
          </div>

          <h2 style={{ fontSize: 24 }}>方法论：优势拆书三阶法</h2>
          <p className="section-sub">三阶走完，一个抽象的道理才会变成你身上的一个动作。</p>
          <div className="grid grid-3">
            {stages.map(s => (
              <div className="card" key={s.name}>
                <h3>{s.name}</h3>
                <p>{s.do}</p>
                <p style={{ color: '#5d4e9b', marginBottom: 0 }}>带走：{s.get}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 24, marginTop: 64 }}>为什么是「拆书 × 优势」</h2>
          <p className="section-sub">它和这些常见方式，差在最后一步。</p>
          <table className="table">
            <thead><tr><th>常见替代</th><th>它给不了的</th><th>我的位置</th></tr></thead>
            <tbody>
              {differences.map(d => (
                <tr key={d.alt}><td>{d.alt}</td><td>{d.miss}</td><td>{d.mine}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="services">
        <div className="wrap">
          <div className="eyebrow">你能选什么</div>
          <h2>三项服务，动词各不相同</h2>
          <p className="section-sub">一张聊清，一张练成，一张带走。每一项结束，你手上都有一个当周能做的动作。</p>
          <div className="grid grid-3">
            {services.map(s => (
              <div className="card" key={s.name}>
                <div className="service-name">{s.name}</div>
                <div className="service-verb">{s.verb}</div>
                <ul className="service-fields">
                  {s.fields.map(([k, v]) => <li key={k}><b>{k}</b>{v}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 24, marginTop: 72 }}>从现在到那一步，中间只有四步</h2>
          <div className="grid grid-4" style={{ marginTop: 28 }}>
            {steps.map((s, i) => (
              <div className="card soft" key={s.t}>
                <div className="step-num">{i + 1}</div>
                <h3>{s.t}</h3>
                <p style={{ marginBottom: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" id="cases">
        <div className="wrap">
          <div className="eyebrow">用结果说话</div>
          <h2>她们后来做了什么</h2>
          <p className="section-sub">每条案例都是「她当时的原话 → 我们拆了什么 → 现在怎样」。以下为格式示例，正式案例需取得客户授权后替换。</p>
          <div className="grid grid-3">
            <div className="card">
              <div className="note" style={{ marginTop: 0, marginBottom: 14 }}>示例结构 · 待替换为真实案例</div>
              <p className="big"><b>原话</b>：「我带团队总忍不住替他们做完，累到怀疑自己不适合做管理。」</p>
              <p><b>拆了什么</b>：把「我执行力强」这条优势拆开——它在「交付」场景里是优势，在「带人」场景里用过了头，变成了替代而不是培养。三阶之后，她把这句「我来做」改成「你先做，我只改一处」。</p>
              <p style={{ color: '#5d4e9b', marginBottom: 0 }}><b>现在</b>：「第一次开会我没动手，团队反而交得更快。」</p>
            </div>
            <div className="placeholder">
              <strong>案例二 · 待补</strong><br />
              对应「优势用过头反而耗」的人群，以及一对一优势解困服务。<br />
              需要：客户原话、拆解过程、一个她自己做出的具体动作。
            </div>
            <div className="placeholder">
              <strong>案例三 · 待补</strong><br />
              对应「说不清自己值钱在哪」的人群，以及优势拆书小班。<br />
              需要：客户原话、拆解过程、一句可引用的现状。
            </div>
          </div>
        </div>
      </section>

      <section id="activities">
        <div className="wrap">
          <div className="eyebrow">方法正在真实发生</div>
          <h2>我们每个月真的在拆书</h2>
          <p className="section-sub">这一区放三样东西：一场近期活动的介绍、往期回顾、一个报名入口。活动介绍写成「这一次我们拆哪本书里的哪一段，为什么选它」，本身就是方法演示。</p>
          <div className="grid grid-2">
            <div className="card">
              <h3>近期一场 · 具体场次公布后更新</h3>
              <p>拆哪一段、为什么选它、谁能来、带走什么——这四项会在每场活动确定后写在这里。</p>
              <p style={{ marginBottom: 0 }}>不需要读过这本书，需要带着一件自己的事。结束时带走一张写满的便签，和一个当周动作。</p>
            </div>
            <div className="placeholder">
              <strong>往期回顾 · 待补</strong><br />
              建议用「场次 + 人数 + 一句现场原话」三件套，比一排海报更有说服力。<br />
              优先选那种「原来我一直用反了」的瞬间。
            </div>
          </div>
        </div>
      </section>

      <section className="alt" id="faq">
        <div className="wrap">
          <div className="eyebrow">打消最后的疑虑</div>
          <h2>常见问题</h2>
          <div style={{ marginTop: 34, maxWidth: 820 }}>
            {faqs.map(f => (
              <details className="faq" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <div className="placeholder" style={{ marginTop: 34 }}>
            <strong>客户评价 · 待补</strong><br />
            计划放 4 条，每条「一句原话 + 身份标签」。优先写「她让我把……改成了……」这种带动作的话，不写空泛的感谢。
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="wrap">
          <div style={{ maxWidth: 720, marginBottom: 36 }}>
            <div className="eyebrow">最后一步</div>
            <h2>说说你正在卡住的那件事</h2>
            <p className="lead" style={{ marginBottom: 0 }}>不用写完整，也不用写得漂亮。说一件事就好：最近哪件事让你觉得「我怎么又这样」，或者哪个决定你已经反复想了好几天。我会在 48 小时内回你，告诉你这件事可以怎么拆。</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
