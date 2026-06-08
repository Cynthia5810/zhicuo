import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Camera,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileStack,
  Flame,
  Home,
  ImagePlus,
  Lightbulb,
  Network,
  Plus,
  RotateCcw,
  ScanLine,
  Sparkles,
  Tag,
  Target,
  X,
} from 'lucide-react';

const subjects = [
  { name: '数学', count: 38, color: '#24705a' },
  { name: '物理', count: 21, color: '#d16a4a' },
  { name: '化学', count: 14, color: '#d2a334' },
  { name: '英语', count: 11, color: '#4774a8' },
];

const relatedQuestions = [
  {
    level: '基础巩固',
    title: '若 x² - 5x + 6 = 0，则两个根分别是多少？',
    time: '约 2 分钟',
  },
  {
    level: '同类变式',
    title: '已知关于 x 的方程 x² - 7x + m = 0 有两个整数根，求 m。',
    time: '约 4 分钟',
  },
  {
    level: '前置补强',
    title: '将多项式 x² - 6x + 8 分解因式。',
    time: '约 3 分钟',
  },
];

function App() {
  const [screen, setScreen] = useState('home');
  const [scanStep, setScanStep] = useState('camera');
  const [batchStep, setBatchStep] = useState('upload');
  const [activeTab, setActiveTab] = useState('home');
  const [tags, setTags] = useState(['一元二次方程', '根与系数', '符号判断']);
  const [newTag, setNewTag] = useState('');
  const [answered, setAnswered] = useState(false);

  function openScan() {
    setScanStep('camera');
    setScreen('scan');
  }

  function openBatch() {
    setBatchStep('upload');
    setScreen('batch');
  }

  function addTag(event) {
    event.preventDefault();
    const value = newTag.trim();
    if (value && !tags.includes(value)) setTags([...tags, value]);
    setNewTag('');
  }

  return (
    <div className="app-shell">
      <aside className="side-nav">
        <Brand />
        <nav>
          <NavButton icon={Home} label="错题本" active={activeTab === 'home'} onClick={() => { setActiveTab('home'); setScreen('home'); }} />
          <NavButton icon={Network} label="知识网" active={activeTab === 'graph'} onClick={() => { setActiveTab('graph'); setScreen('graph'); }} />
          <NavButton icon={Target} label="专项练习" />
        </nav>
        <div className="profile">
          <span>林</span>
          <div><b>林小满</b><small>初三 · 2班</small></div>
        </div>
      </aside>

      <main className="app-main">
        {screen === 'home' && <HomeScreen onScan={openScan} onBatch={openBatch} onGraph={() => { setScreen('graph'); setActiveTab('graph'); }} />}
        {screen === 'batch' && (
          <BatchScreen
            step={batchStep}
            setStep={setBatchStep}
            onBack={() => setScreen('home')}
            onLearn={() => { setScreen('graph'); setActiveTab('graph'); }}
          />
        )}
        {screen === 'scan' && (
          <ScanScreen
            step={scanStep}
            setStep={setScanStep}
            onBack={() => setScreen('home')}
            onDone={() => setScreen('diagnosis')}
          />
        )}
        {screen === 'diagnosis' && (
          <DiagnosisScreen
            tags={tags}
            setTags={setTags}
            newTag={newTag}
            setNewTag={setNewTag}
            addTag={addTag}
            onBack={() => setScreen('home')}
            onGraph={() => { setScreen('graph'); setActiveTab('graph'); }}
          />
        )}
        {screen === 'graph' && (
          <GraphScreen
            answered={answered}
            setAnswered={setAnswered}
            onBack={() => { setScreen('home'); setActiveTab('home'); }}
          />
        )}
      </main>

      <nav className="mobile-nav">
        <NavButton icon={Home} label="错题本" active={activeTab === 'home'} onClick={() => { setActiveTab('home'); setScreen('home'); }} />
        <button className="scan-fab" onClick={openScan} aria-label="扫描错题"><ScanLine size={24} /></button>
        <NavButton icon={Network} label="知识网" active={activeTab === 'graph'} onClick={() => { setActiveTab('graph'); setScreen('graph'); }} />
      </nav>
    </div>
  );
}

function Brand() {
  return (
    <div className="brand">
      <span><Check size={20} strokeWidth={3} /></span>
      <div><b>知错</b><small>让错误指向答案</small></div>
    </div>
  );
}

function NavButton({ icon: Icon, label, active, onClick }) {
  return (
    <button className={active ? 'active' : ''} onClick={onClick}>
      <Icon size={19} /><span>{label}</span>
    </button>
  );
}

function HomeScreen({ onScan, onBatch, onGraph }) {
  return (
    <div className="page home-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">6月8日 · 星期一</p>
          <h1>下午好，小满</h1>
          <p>今天花 12 分钟，把一个没弄懂的地方真正弄懂。</p>
        </div>
        <div className="streak"><Flame size={18} /><b>连续复习 6 天</b></div>
      </header>

      <section className="overview-band">
        <div className="overview-copy">
          <span className="eyebrow light">我的错题本</span>
          <strong>84</strong>
          <p>累计收录错题</p>
          <button onClick={onScan}><Camera size={18} />上传新错题</button>
        </div>
        <div className="overview-stats">
          <div><span>本周待复习</span><b>12</b><small>比上周少 5 题</small></div>
          <div><span>已掌握</span><b>47</b><small>掌握率 56%</small></div>
          <div><span>薄弱知识点</span><b>6</b><small>2 个需要优先复习</small></div>
        </div>
      </section>

      <div className="home-grid">
        <section className="content-section">
          <div className="section-head">
            <div><p className="eyebrow">学科分布</p><h2>错误主要出现在哪里</h2></div>
            <button className="text-button">全部错题 <ChevronRight size={16} /></button>
          </div>
          <div className="subject-list">
            {subjects.map((subject) => (
              <article key={subject.name}>
                <div className="subject-icon" style={{ backgroundColor: subject.color }}>{subject.name.slice(0, 1)}</div>
                <div><b>{subject.name}</b><span>{subject.count} 道错题</span></div>
                <div className="subject-bar"><i style={{ width: `${subject.count / 38 * 100}%`, backgroundColor: subject.color }} /></div>
                <strong>{Math.round(subject.count / 84 * 100)}%</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="review-section">
          <div className="section-head"><div><p className="eyebrow">今日复习</p><h2>从这里继续</h2></div><span className="count-chip">3 题</span></div>
          <article className="review-card">
            <div className="question-index">01</div>
            <span className="subject-pill">数学 · 一元二次方程</span>
            <h3>关于根与系数关系的符号判断</h3>
            <p>上次错误原因：忽略负号，公式记忆不完整</p>
            <button>开始复习 <ArrowRight size={16} /></button>
          </article>
          <button className="graph-link" onClick={onGraph}>
            <span className="graph-mini"><i /><i /><i /><i /></span>
            <span><b>查看我的知识网络</b><small>发现 2 个前置知识缺口</small></span>
            <ChevronRight size={18} />
          </button>
        </section>
      </div>

      <section className="import-actions">
        <button className="upload-dock batch-entry" onClick={onBatch}>
          <span><FileStack size={24} /></span>
          <div><b>批量导入作业或试卷</b><small>不必逐题整理，直接定位真正的知识缺口</small></div>
          <ArrowRight size={20} />
        </button>
        <button className="upload-dock single-entry" onClick={onScan}>
          <span><ImagePlus size={22} /></span>
          <div><b>扫描单道错题</b><small>适合快速分析一道题的错误步骤</small></div>
          <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}

function BatchScreen({ step, setStep, onBack, onLearn }) {
  if (step === 'upload') {
    return (
      <div className="page batch-page">
        <SubHeader title="批量诊断" onBack={onBack} />
        <section className="batch-intro">
          <div>
            <p className="eyebrow light">不用再抄一整本错题</p>
            <h1>上传整份作业，<br />把几十道错题缩成几个问题</h1>
            <p>系统只提取题目、作答痕迹和知识结构，不要求你逐道整理答案。</p>
          </div>
          <div className="compress-visual">
            <span><b>18</b><small>道错题</small></span>
            <ArrowRight size={24} />
            <span className="result"><b>4</b><small>个知识问题</small></span>
          </div>
        </section>

        <section className="batch-upload">
          <div className="upload-zone">
            <span><FileStack size={32} /></span>
            <h2>上传作业、练习册或试卷</h2>
            <p>支持一次上传多页照片，系统会自动去重并按知识点归类。</p>
            <button onClick={() => setStep('ready')}><ImagePlus size={18} />选择照片</button>
            <small>原型示例：点击后载入“初三数学月考试卷”</small>
          </div>
          <aside>
            <p className="eyebrow">这次不会让你做什么</p>
            <ul>
              <li><X size={16} />逐题抄写题目和答案</li>
              <li><X size={16} />把所有错题重新做一遍</li>
              <li><X size={16} />面对一长串没有重点的错题</li>
            </ul>
            <p className="eyebrow">系统会替你完成</p>
            <ul className="will-do">
              <li><Check size={16} />识别重复出现的错误模式</li>
              <li><Check size={16} />追溯支撑当前知识的基础缺口</li>
              <li><Check size={16} />生成一条短而明确的补学路径</li>
            </ul>
          </aside>
        </section>
      </div>
    );
  }

  if (step === 'ready') {
    return (
      <div className="page batch-page">
        <SubHeader title="批量诊断" onBack={onBack} />
        <section className="batch-ready">
          <div className="paper-stack">
            <div /><div /><div className="front">
              <span>初三数学月考试卷</span>
              <b>共 6 页</b>
              <i><Check size={28} /></i>
            </div>
          </div>
          <div>
            <p className="eyebrow">文件已就绪</p>
            <h1>初三数学月考试卷</h1>
            <p>已识别 26 道作答题，其中 18 道存在错误或不完整步骤。</p>
            <div className="ready-facts">
              <span><b>6</b>页试卷</span>
              <span><b>26</b>道作答</span>
              <span><b>18</b>处错误</span>
            </div>
            <button className="primary-button" onClick={() => setStep('result')}>开始定位薄弱点 <Sparkles size={17} /></button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page batch-page">
      <SubHeader title="本次诊断结果" onBack={onBack} action={<span className="saved"><Check size={14} />已保存</span>} />
      <section className="batch-result-hero">
        <div>
          <p className="eyebrow light">初三数学月考试卷</p>
          <h1>18 道错题，最终指向<br /><u>4 个知识问题</u></h1>
          <p>先解决最底层的 2 个基础缺口，预计可以覆盖其中 11 道错题。</p>
        </div>
        <div className="result-score"><span>本次诊断</span><b>61</b><small>知识结构稳定度</small></div>
      </section>

      <div className="batch-result-layout">
        <section className="weakness-list">
          <div className="section-head"><div><p className="eyebrow">按影响范围排序</p><h2>真正需要处理的问题</h2></div><span className="count-chip">4 项</span></div>
          <Weakness rank="01" level="优先补基础" title="代数式符号运算" count="关联 7 道错题" reason="负号遗漏、移项变号错误反复出现" progress="35%" urgent />
          <Weakness rank="02" level="优先补基础" title="因式分解" count="关联 4 道错题" reason="提取公因式后括号内符号不稳定" progress="48%" urgent />
          <Weakness rank="03" level="当前章节" title="一元二次方程" count="关联 5 道错题" reason="公式会用，但依赖的代数基础不牢" progress="63%" />
          <Weakness rank="04" level="当前章节" title="二次函数图像" count="关联 2 道错题" reason="顶点与对称轴关系理解不完整" progress="72%" />
        </section>

        <aside className="learning-route">
          <p className="eyebrow">建议补学路径</p>
          <h2>今天不需要重做 18 道题</h2>
          <p className="route-summary">先用约 22 分钟完成两个基础知识讲解和 5 道诊断题。</p>
          <div className="route-step"><span>1</span><div><b>代数式符号运算</b><small>知识讲解 · 6分钟</small></div></div>
          <div className="route-step"><span>2</span><div><b>符号专项诊断</b><small>3道题 · 7分钟</small></div></div>
          <div className="route-step"><span>3</span><div><b>因式分解关键思路</b><small>知识讲解 · 5分钟</small></div></div>
          <div className="route-step"><span>4</span><div><b>迁移检验</b><small>2道题 · 4分钟</small></div></div>
          <button className="primary-button" onClick={onLearn}>开始补第一个知识点 <ArrowRight size={17} /></button>
          <button className="folded-errors">查看作为诊断依据的 18 道错题 <ChevronRight size={16} /></button>
        </aside>
      </div>
    </div>
  );
}

function Weakness({ rank, level, title, count, reason, progress, urgent }) {
  return (
    <article className={`weakness-item ${urgent ? 'urgent' : ''}`}>
      <span className="weakness-rank">{rank}</span>
      <div className="weakness-main">
        <span>{level}</span>
        <h3>{title}</h3>
        <p>{reason}</p>
      </div>
      <div className="weakness-impact"><b>{count}</b><span>掌握度 {progress}</span></div>
      <ChevronRight size={18} />
    </article>
  );
}

function ScanScreen({ step, setStep, onBack, onDone }) {
  return (
    <div className="page scan-page">
      <SubHeader title={step === 'camera' ? '扫描错题' : '确认扫描结果'} onBack={onBack} />
      <div className="stepper">
        <span className="done"><Check size={14} />上传</span><i />
        <span className={step === 'review' ? 'done' : ''}>2 识别</span><i />
        <span>3 诊断</span>
      </div>

      {step === 'camera' ? (
        <section className="scanner-stage">
          <div className="scanner-copy">
            <p className="eyebrow light">保持纸面平整</p>
            <h1>把题目和你的解题过程<br />一起放进框内</h1>
            <p>完整的步骤能帮助我们判断真正的错误原因。</p>
          </div>
          <div className="camera-frame">
            <div className="worksheet">
              <div className="paper-head"><span>初三数学 · 单元练习</span><span>第 8 题</span></div>
              <p>已知一元二次方程 x² - 5x + 6 = 0，求两根之和与两根之积。</p>
              <div className="handwriting">
                <span>x₁ + x₂ = b/a = -5</span>
                <span>x₁x₂ = c/a = 6</span>
                <em>×</em>
              </div>
            </div>
            <i className="corner c1" /><i className="corner c2" /><i className="corner c3" /><i className="corner c4" />
            <div className="scan-line" />
          </div>
          <div className="camera-actions">
            <button className="round-button"><ImagePlus size={21} /><small>相册</small></button>
            <button className="shutter" onClick={() => setStep('review')} aria-label="拍摄"><span /></button>
            <button className="round-button"><CircleHelp size={21} /><small>示例</small></button>
          </div>
        </section>
      ) : (
        <section className="scan-review">
          <div className="review-paper">
            <div className="paper-label"><Check size={15} />识别清晰</div>
            <div className="paper-head"><span>初三数学 · 单元练习</span><span>第 8 题</span></div>
            <h2>已知一元二次方程 x² - 5x + 6 = 0，求两根之和与两根之积。</h2>
            <div className="answer-lines">
              <p><span>你的答案</span>x₁ + x₂ = b/a = <mark>-5</mark></p>
              <p><span></span>x₁x₂ = c/a = 6</p>
            </div>
            <div className="error-note"><X size={16} />系统发现第 1 行可能存在符号错误</div>
          </div>
          <aside className="scan-summary">
            <p className="eyebrow">识别结果</p>
            <h2>请确认题目与作答</h2>
            <div className="summary-row"><span>科目</span><b>数学</b></div>
            <div className="summary-row"><span>年级</span><b>初三</b></div>
            <div className="summary-row"><span>题型</span><b>填空题</b></div>
            <div className="summary-row"><span>作答状态</span><b className="wrong">回答错误</b></div>
            <button className="primary-button" onClick={onDone}>确认并分析错因 <Sparkles size={17} /></button>
            <button className="secondary-button" onClick={() => setStep('camera')}><RotateCcw size={16} />重新扫描</button>
          </aside>
        </section>
      )}
    </div>
  );
}

function DiagnosisScreen({ tags, setTags, newTag, setNewTag, addTag, onBack, onGraph }) {
  return (
    <div className="page diagnosis-page">
      <SubHeader title="错因诊断" onBack={onBack} action={<span className="saved"><Check size={14} />已保存到数学错题本</span>} />
      <section className="diagnosis-hero">
        <div className="diagnosis-title">
          <span className="status-dot">需要复习</span>
          <p className="eyebrow light">AI 错因分析</p>
          <h1>你记住了公式的结构，<br />但把 <u>-b/a</u> 记成了 <u>b/a</u></h1>
          <p>这不是计算错误，而是公式中的符号规则没有形成稳定记忆。</p>
        </div>
        <div className="confidence"><span>诊断置信度</span><b>92%</b><i><em /></i><small>你可以手动修改诊断结果</small></div>
      </section>

      <div className="diagnosis-layout">
        <section className="question-panel">
          <p className="eyebrow">原题与作答</p>
          <h2>已知一元二次方程 x² - 5x + 6 = 0，求两根之和与两根之积。</h2>
          <div className="answer-compare">
            <div><span>你的答案</span><p>x₁ + x₂ = <mark>-5</mark></p><small><X size={14} />符号错误</small></div>
            <div><span>正确答案</span><p>x₁ + x₂ = <mark>5</mark></p><small><Check size={14} />-b/a = -(-5)/1</small></div>
          </div>
          <div className="explanation">
            <Lightbulb size={20} />
            <div><b>题干分析</b><p>标准形式为 ax² + bx + c = 0。本题中 a=1，b=-5，c=6，因此两根之和为 -b/a=5，而不是 -5。</p></div>
          </div>
        </section>

        <aside className="cause-panel">
          <p className="eyebrow">错误原因</p>
          <h2>公式记忆不完整</h2>
          <div className="cause-chain">
            <span><b>表层错误</b>结果符号写反</span>
            <i><ArrowRight size={15} /></i>
            <span className="active"><b>核心原因</b>遗漏韦达定理中的负号</span>
            <i><ArrowRight size={15} /></i>
            <span><b>潜在缺口</b>代数式符号运算不稳定</span>
          </div>
          <div className="tag-box">
            <div><Tag size={16} /><b>知识点标签</b></div>
            <div className="tags">
              {tags.map((tag) => <button key={tag} onClick={() => setTags(tags.filter((item) => item !== tag))}>{tag}<X size={12} /></button>)}
            </div>
            <form onSubmit={addTag}><Plus size={15} /><input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="手动增加标签" /></form>
          </div>
          <button className="primary-button" onClick={onGraph}><Network size={17} />查看知识网络与推荐练习</button>
        </aside>
      </div>
    </div>
  );
}

function GraphScreen({ answered, setAnswered, onBack }) {
  return (
    <div className="page graph-page">
      <SubHeader title="我的知识网络" onBack={onBack} action={<span className="updated"><Clock3 size={14} />刚刚更新</span>} />
      <div className="graph-layout">
        <section className="knowledge-map">
          <div className="map-head">
            <div><p className="eyebrow light">数学 · 方程模块</p><h1>错误不是孤立的，它有来路</h1><p>当前错题关联 1 个核心知识点和 2 个前置能力。</p></div>
            <div className="legend"><span><i className="red" />需要复习</span><span><i className="yellow" />掌握不稳</span><span><i className="green" />已掌握</span></div>
          </div>
          <div className="network-canvas">
            <svg viewBox="0 0 760 390" aria-hidden="true">
              <path d="M110 195 C210 195 220 110 330 110" />
              <path d="M110 195 C210 195 220 280 330 280" />
              <path d="M430 110 C520 110 520 195 625 195" />
              <path d="M430 280 C520 280 520 195 625 195" />
            </svg>
            <Node className="node-a mastered" style={{ left: '4%', top: '39%' }} title="整式运算" detail="已掌握 · 86%" />
            <Node className="node-b unstable" style={{ left: '37%', top: '17%' }} title="代数式符号" detail="掌握不稳 · 62%" />
            <Node className="node-c mastered" style={{ left: '37%', top: '62%' }} title="一元二次方程" detail="已掌握 · 79%" />
            <Node className="node-d weak" style={{ right: '4%', top: '39%' }} title="根与系数关系" detail="需要复习 · 41%" />
          </div>
          <div className="map-insight"><BrainCircuit size={21} /><p><b>建议先补“代数式符号”</b><span>你最近 5 道相关错题中，有 3 道都出现了负号遗漏。先修复前置能力，再复习韦达定理会更有效。</span></p></div>
        </section>

        <section className="practice-panel">
          <div className="section-head"><div><p className="eyebrow">为你推荐</p><h2>根与系数关系 · 3题</h2></div><span className="time-chip"><Clock3 size={14} />约 9 分钟</span></div>
          <div className="practice-list">
            {relatedQuestions.map((question, index) => (
              <article key={question.title} className={index === 0 ? 'current' : ''}>
                <div className="practice-number">{String(index + 1).padStart(2, '0')}</div>
                <div><span>{question.level}</span><h3>{question.title}</h3><small>{question.time}</small></div>
                {index === 0 ? <button onClick={() => setAnswered(true)}>{answered ? <Check size={18} /> : <ArrowRight size={18} />}</button> : <button><ChevronRight size={18} /></button>}
              </article>
            ))}
          </div>
          {answered && <div className="success-message"><Check size={18} /><span><b>已完成第一题</b>很好，正确答案是 x=2 和 x=3。知识点掌握度已更新。</span></div>}
        </section>
      </div>
    </div>
  );
}

function Node({ title, detail, className, style }) {
  return <div className={`knowledge-node ${className}`} style={style}><i /><b>{title}</b><span>{detail}</span></div>;
}

function SubHeader({ title, onBack, action }) {
  return (
    <header className="sub-header">
      <button onClick={onBack} aria-label="返回"><ArrowLeft size={20} /></button>
      <h2>{title}</h2>
      <div>{action}</div>
    </header>
  );
}

export default App;
