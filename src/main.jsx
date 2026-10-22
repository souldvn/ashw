import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const Arrow = () => <span aria-hidden="true">↗</span>;

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <a href="#top" className="logo" aria-label="Tihaya — на главную">ТИХАЯ<span>●</span></a>
      <button className="menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Открыть меню"><i /><i /></button>
      <nav className={open ? 'open' : ''} onClick={() => setOpen(false)}>
        <a href="#inside">Внутренности</a><a href="#rhythm">Ритм</a><a href="#questions">Вопросы</a>
        <a className="pill dark" href="#choose">Выбрать баночку <Arrow /></a>
      </nav>
    </header>
  );
}

function ProductScene() {
  return (
    <div className="product-scene" aria-label="Стилизованная упаковка ашваганды">
      <div className="orbit orbit-a" /><div className="orbit orbit-b" />
      <div className="branch"><i/><i/><i/><i/></div>
      <div className="product-box"><small>WITHANIA<br/>SOMNIFERA</small><b>тихая</b><p>ASHWAGANDHA<br/>ROOT EXTRACT</p><span>60 капсул</span></div>
      <div className="stamp">БЕЗ<br/>СУЕТЫ</div>
      <span className="scene-caption">ритуал №01</span>
    </div>
  );
}

const modes = {
  morning: { number: '07:30', title: 'Ясное утро', text: 'Стакан воды, несколько спокойных вдохов и одна привычка, с которой день начинается собраннее.', tone: 'sunrise' },
  pause: { number: '14:00', title: 'Тихая пауза', text: 'Короткая остановка посреди задач — чтобы услышать себя и вернуться к главному.', tone: 'day' },
  evening: { number: '21:00', title: 'Мягкий вечер', text: 'Приглушённый свет, телефон в стороне и ритуал, который помогает переключиться на отдых.', tone: 'night' }
};

function Rhythm() {
  const [active, setActive] = useState('morning');
  const mode = modes[active];
  return (
    <section className="rhythm shell" id="rhythm">
      <div className="section-heading">
        <p>02 — НАЙДИ СВОЙ РИТМ</p>
        <h2>Не ещё одна задача.<br/><em>Точка опоры.</em></h2>
      </div>
      <div className={`rhythm-stage ${mode.tone}`}>
        <div className="rhythm-tabs" role="tablist">
          {Object.entries(modes).map(([key, item]) => (
            <button key={key} className={active === key ? 'active' : ''} onClick={() => setActive(key)} role="tab" aria-selected={active === key}>
              <span>{item.number}</span>{item.title}
            </button>
          ))}
        </div>
        <div className="time-display">{mode.number}</div>
        <div className="rhythm-copy"><h3>{mode.title}</h3><p>{mode.text}</p></div>
        <div className="horizon"><span /></div>
      </div>
    </section>
  );
}

const faqItems = [
  ['Что такое ашваганда?', 'Withania somnifera — растение, которое традиционно используют в аюрведе. В добавках обычно применяют экстракт корня.'],
  ['Как встроить её в свой день?', 'Следуйте инструкции конкретного продукта. Привязать приём к уже существующему действию — например, завтраку — часто проще, чем создавать привычку с нуля.'],
  ['Кому стоит быть осторожнее?', 'Если вы беременны, кормите грудью, принимаете лекарства или имеете хронические заболевания, сначала проконсультируйтесь с врачом.'],
  ['Это лекарство?', 'Нет. БАД не является лекарственным средством и не заменяет лечение, сон, питание и рекомендации специалиста.']
];

function FAQ() {
  const [current, setCurrent] = useState(0);
  return (
    <section className="faq shell" id="questions">
      <div className="faq-title"><p>04 — ПО СУЩЕСТВУ</p><h2>Можно<br/><em>спросить</em></h2></div>
      <div className="faq-list">
        {faqItems.map(([q, a], index) => (
          <article className={current === index ? 'active' : ''} key={q}>
            <button onClick={() => setCurrent(current === index ? -1 : index)} aria-expanded={current === index}>
              <span><b>0{index + 1}</b>{q}</span><i>{current === index ? '−' : '+'}</i>
            </button>
            <div className="answer"><p>{a}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [choice, setChoice] = useState('one');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('seen');
    }), { threshold: 0.14 });
    document.querySelectorAll('.fade').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main id="top">
        <section className="hero shell">
          <div className="hero-copy fade">
            <p className="kicker">АДАПТОГЕННЫЙ РИТУАЛ / 2026</p>
            <h1>Тише.<br/>Ты всё<br/><em>успеешь.</em></h1>
            <div className="hero-bottom">
              <p>Ашваганда как напоминание: замедлиться, вдохнуть глубже и выбрать свой темп.</p>
              <a href="#choose" className="round-link" aria-label="К выбору продукта"><Arrow /></a>
            </div>
          </div>
          <ProductScene />
        </section>

        <section className="ticker"><div>МЕНЬШЕ ШУМА <b>✳</b> БОЛЬШЕ РИТМА <b>✳</b> БЕРЕЖНО К СЕБЕ <b>✳</b> МЕНЬШЕ ШУМА <b>✳</b> БОЛЬШЕ РИТМА <b>✳</b> БЕРЕЖНО К СЕБЕ <b>✳</b></div></section>

        <section className="inside shell" id="inside">
          <div className="section-heading fade"><p>01 — ЧТО ВНУТРИ</p><h2>Формула без<br/><em>лишнего шума</em></h2></div>
          <div className="ingredient-grid">
            <article className="root-card fade"><span>01</span><div className="root-drawing"><i/><i/><i/><i/><i/></div><h3>Экстракт корня</h3><p>Основа формулы — Withania somnifera в удобном капсульном формате.</p></article>
            <article className="type-card fade"><span>02</span><div>VEGAN<br/>CAPS</div><h3>Растительная оболочка</h3><p>Без желатина, сахара и лишних ароматизаторов.</p></article>
            <article className="list-card fade"><span>03</span><ul><li>понятный состав</li><li>лабораторный контроль</li><li>60 капсул</li></ul><h3>Только необходимое</h3><p>Короткая формула, которую легко встроить в привычный день.</p></article>
          </div>
          <p className="inside-note fade">Мы не обещаем волшебства. Только продукт, прозрачную информацию и повод создать маленький ритуал заботы о себе.</p>
        </section>

        <Rhythm />

        <section className="manifesto shell fade">
          <p>03 — НАША МЫСЛЬ</p>
          <h2>Не нужно становиться<br/>лучшей версией себя.<br/><em>Достаточно быть с собой.</em></h2>
          <div className="manifesto-mark">✳</div>
        </section>

        <FAQ />

        <section className="choose shell" id="choose">
          <div className="choose-title fade"><p>05 — ВЫБОР</p><h2>Начни<br/><em>с малого</em></h2></div>
          <div className="choose-card fade">
            <div className="mini-pack"><b>тихая</b><span>ASHWA</span></div>
            <div className="choose-info">
              <span>ASHWAGANDHA / ROOT EXTRACT</span><h3>Тихая. Ритуал №01</h3><p>60 растительных капсул</p>
              <div className="options">
                <button className={choice === 'one' ? 'active' : ''} onClick={() => setChoice('one')}><span>1 баночка</span><b>2 490 ₽</b></button>
                <button className={choice === 'two' ? 'active' : ''} onClick={() => setChoice('two')}><span>2 баночки</span><b>4 480 ₽</b></button>
              </div>
              <button className="add-button" onClick={() => setAdded(true)}>{added ? 'Добавлено в ритуал ✓' : 'Добавить в ритуал'} <Arrow /></button>
              <small>Демо-страница: реальная покупка не совершается.</small>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer shell"><a className="logo" href="#top">ТИХАЯ<span>●</span></a><p>Живи в своём ритме.</p><p>© 2026 · ДЕМО-ПРОЕКТ</p></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
