(() => {
  'use strict';

  const safe = (value) => String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function hashCode(str) {
    if (!str) return 0;
    let h = 0;
    for (let i = 0; i < str.length; i += 1) h = ((h << 5) - h) + str.charCodeAt(i) | 0;
    return h;
  }

  function equalSets(a, b) {
    if (a.length !== b.length) return false;
    const bs = new Set(b);
    return a.every(x => bs.has(x));
  }

  function evaluate(q, value) {
    if (q.type === 'single') return value === q.correct;
    if (q.type === 'multiple') return equalSets(value || [], q.correct || []);
    if (q.type === 'tf-grid') return q.statements.every(s => value?.[s.id] === s.correct);
    if (q.type === 'fill') return q.blanks.every(b => value?.[b.id] === b.correct);
    if (q.type === 'matching') {
      const rightMap = new Map(q.pairs.map(p => [p.rightId, p.right]));
      return q.pairs.every(p => {
        const chosenRightId = value?.[p.leftId];
        if (!chosenRightId) return false;
        if (chosenRightId === p.rightId) return true;
        // Si l'ID est différent mais que le texte affiché est exactement le même, on accepte
        return rightMap.get(chosenRightId) === p.right;
      });
    }
    if (q.type === 'order') return q.correctOrder.every((id, i) => value?.[i] === id);
    return false;
  }

  let UI = {};
  const t = (key, params = {}) => {
    const parts = key.split('.');
    let val = UI;
    for (const p of parts) {
      val = val?.[p];
    }
    if (Array.isArray(val)) {
      return val;
    }
    if (typeof val === 'string') {
      let res = val;
      Object.entries(params).forEach(([k, v]) => {
        res = res.replaceAll(`{${k}}`, v);
      });
      return res;
    }
    return val || key;
  };

  function createQuiz(id, title, questionIds, subtitle = '', timer = null) {
    return {
      id,
      title,
      subtitle,
      questionIds: shuffle(questionIds),
      currentIndex: 0,
      answers: {},
      drafts: {},
      shuffled: {},
      streak: 0,
      timer,
      startedAt: Date.now(),
      updatedAt: Date.now(),
      completedAt: null,
    };
  }

  async function init() {
    let DATA;
    try {
      const v = '2026-07-12-2300';
      const lang = 'fr';
      const [q, tm, s, o, tools, ui_json] = await Promise.all([
        fetch(`data/lang/${lang}/questions.json?v=${v}`).then(r => r.json()),
        fetch(`data/lang/${lang}/test-modes.json?v=${v}`).then(r => r.json()),
        fetch(`data/lang/${lang}/syntheses.json?v=${v}`).then(r => r.json()),
        fetch(`data/lang/${lang}/organismes.json?v=${v}`).then(r => r.json()),
        fetch(`data/lang/${lang}/tools.json?v=${v}`).then(r => r.json()),
        fetch(`data/lang/${lang}/ui.json?v=${v}`).then(r => r.json())
      ]);
      DATA = { ...q, ...tm, ...s, ...o, ...tools };
      UI = ui_json;
    } catch (e) {
      console.error('Failed to load data', e);
      const errTitle = UI?.common?.error || 'Erreur';
      const errMsg = UI?.common?.loading_error || 'Les fichiers de données sont introuvables ou invalides.';
      document.getElementById('app').innerHTML = `<div class="nb-card empty-state"><h2>${errTitle}</h2><p>${errMsg}</p></div>`;
      return;
    }


    const app = document.getElementById('app');
    const toastRegion = document.getElementById('toast-region');
    const confettiLayer = document.getElementById('confetti-layer');
    const STORAGE_PREFIX = 'cyberTraining:v1:quiz:';
    const ACTIVE_QUESTIONS = DATA.questions.filter(q => q.active !== false);
    const QUESTION_BY_ID = new Map(DATA.questions.map(q => [q.id, q]));

    const ui = {
      view: 'home',
      quiz: null,
      modal: null,
      activeMatchLeft: null,
      touchDraggingId: null,
      reviewFilter: 'errors',
      synthesisId: null,
    };


    function quizKey(id) {
      return `${STORAGE_PREFIX}${id}`;
    }

    function saveQuiz() {
      if (!ui.quiz) return;
      ui.quiz.updatedAt = Date.now();
      localStorage.setItem(quizKey(ui.quiz.id), JSON.stringify(ui.quiz));
    }

    function readQuiz(id) {
      try {
        const raw = localStorage.getItem(quizKey(id));
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed.questionIds) || !parsed.answers) return null;
        return parsed;
      } catch {
        return null;
      }
    }

    function listSavedQuizzes() {
      const quizzes = [];
      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith(STORAGE_PREFIX)) continue;
        try {
          const quiz = JSON.parse(localStorage.getItem(key));
          if (quiz?.questionIds?.length) quizzes.push(quiz);
        } catch { /* ignore invalid storage */ }
      }
      return quizzes.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    }

    function deleteQuiz(id) {
      localStorage.removeItem(quizKey(id));
    }

    function resetAllProgress() {
      Object.keys(localStorage)
          .filter(k => k.startsWith(STORAGE_PREFIX))
          .forEach(k => localStorage.removeItem(k));
    }



    function launchQuiz(id, title, questionIds, subtitle = '', timer = null) {
      const existing = readQuiz(id);
      if (existing && !existing.completedAt) {
        ui.modal = {
          type: 'resume',
          id,
          title,
          questionIds,
          subtitle,
          timer,
          existing,
        };
        render();
        return;
      }
      ui.quiz = createQuiz(id, title, questionIds, subtitle, timer);
      ui.view = 'quiz';
      ui.modal = null;
      ui.activeMatchLeft = null;
      saveQuiz();
      render(true);
    }

    function resumeQuiz(quiz) {
      ui.quiz = quiz;
      ui.view = quiz.completedAt ? 'results' : 'quiz';
      ui.modal = null;
      ui.activeMatchLeft = null;
      render(true);
    }

    function showToast(message) {
      const el = document.createElement('div');
      el.className = 'toast';
      el.textContent = message;
      toastRegion.appendChild(el);
      setTimeout(() => el.remove(), 3100);
    }

    function launchConfetti(amount = 70) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!confettiLayer) return;

      const colors = ['#ffd84d', '#ff6b9d', '#65dfff', '#7ee8b7', '#b69cff', '#ff7070'];
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < amount; i += 1) {
        const piece = document.createElement('span');
        piece.className = 'confetti';

        const delay = Math.random() * 0.45;
        const duration = 1.35 + Math.random() * 1.2;
        const rotation = Math.random() * 360;
        const drift = (Math.random() - 0.5) * 80; // dérive horizontale en px

        piece.style.left = `${Math.random() * 100}%`;
        piece.style.top = `${-10 - Math.random() * 30}px`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = `${delay}s`;
        piece.style.animationDuration = `${duration}s`;
        piece.style.setProperty('--rotate', `${rotation}deg`);
        piece.style.setProperty('--drift', `${drift}px`);

        const cleanup = () => piece.remove();
        piece.addEventListener('animationend', cleanup, { once: true });
        setTimeout(cleanup, (delay + duration) * 1000 + 200);

        fragment.appendChild(piece);
      }

      confettiLayer.appendChild(fragment);
    }

    function themeQuestionIds(themeId) {
      return ACTIVE_QUESTIONS.filter(q => q.theme === themeId).map(q => q.id);
    }

    function activeQuestionIds() {
      return ACTIVE_QUESTIONS.map(q => q.id);
    }

    function isScenarioQuestion(q) {
      const regexStr = t('quiz.question.scenario_detection_regex');
      const scenarioRegex = new RegExp(regexStr, 'i');
      return Boolean(q.scenario)
          || (regexStr !== 'quiz.question.scenario_detection_regex' && scenarioRegex.test(q.prompt || ''))
          || ['order', 'matching'].includes(q.type);
    }

    function selectBalancedQuestions({ count, certificationFirst = false, scenarioOnly = false } = {}) {
      const source = ACTIVE_QUESTIONS.filter(q => !scenarioOnly || q.scenario);

      const byTheme = Object.keys(DATA.themes)
          .map(themeId => {
            const items = source.filter(q => q.theme === themeId);
            const primary = certificationFirst ? new Set(items.filter(q => q.certification)) : new Set();
            const secondary = items.filter(q => !primary.has(q));
            return shuffle([...shuffle([...primary]), ...shuffle(secondary)]);
          })
          .filter(list => list.length > 0); // on retire d'emblée les thèmes vides

      const picked = [];
      let cursor = 0;
      while (picked.length < count && byTheme.length > 0) {
        const bucketIndex = cursor % byTheme.length;
        const bucket = byTheme[bucketIndex];
        const q = bucket.shift();
        if (q) picked.push(q.id);

        if (bucket.length === 0) {
          byTheme.splice(bucketIndex, 1); // bucket épuisé, on le retire
        } else {
          cursor += 1;
        }
      }
      return picked;
    }

    function completedCount(quiz = ui.quiz) {
      return quiz ? Object.keys(quiz.answers || {}).length : 0;
    }

    function correctCount(quiz = ui.quiz) {
      return quiz ? Object.values(quiz.answers || {}).filter(a => a.status === 'correct').length : 0;
    }

    function remainingCount(quiz = ui.quiz) {
      return quiz ? quiz.questionIds.length - completedCount(quiz) : 0;
    }

    function goToNextOrFinish() {
      if (ui.quiz.currentIndex < ui.quiz.questionIds.length - 1) {
        ui.quiz.currentIndex += 1;
        ui.activeMatchLeft = null;
        saveQuiz();
        render(true);
      } else {
        finishQuiz();
      }
    }

    function updateTimer() {
      const timerEl = document.getElementById('quiz-timer');
      if (!timerEl || !ui.quiz || !ui.quiz.timer || ui.quiz.completedAt) return;

      const totalMs = ui.quiz.timer * 60 * 1000;
      const elapsed = Date.now() - ui.quiz.startedAt;
      const remaining = totalMs - elapsed;

      if (remaining <= 0) {
        timerEl.textContent = "00:00";
        timerEl.classList.add('is-expired');
        finishQuiz(true);
        return;
      }

      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      if (remaining < 60000) {
        timerEl.classList.add('is-urgent');
      }
    }

    function currentQuestion() {
      if (!ui.quiz) return null;
      return QUESTION_BY_ID.get(ui.quiz.questionIds[ui.quiz.currentIndex]);
    }

    function typeLabel(type) {
      return t(`quiz.types.labels.${type}`) || t('quiz.types.labels.default');
    }

    function questionsByDifficulty(level) {
      return ACTIVE_QUESTIONS.filter(q => q.difficulty === level);
    }

    function modeCount(mode) {
      if (mode.kind === 'all') return ACTIVE_QUESTIONS.length;
      if (mode.kind === 'balanced') return Math.min(mode.count, ACTIVE_QUESTIONS.length);
      if (mode.kind === 'random') return Math.min(mode.count, ACTIVE_QUESTIONS.length);
      if (mode.kind === 'scenario') return Math.min(mode.count, ACTIVE_QUESTIONS.filter(isScenarioQuestion).length);
      if (mode.kind === 'difficulty') {
        const available = questionsByDifficulty(mode.level).length;
        return mode.count ? Math.min(mode.count, available) : available;
      }
      return 0;
    }

    function modeQuestionIds(mode) {
      if (mode.kind === 'all') return activeQuestionIds();
      if (mode.kind === 'balanced') return selectBalancedQuestions({ count: mode.count, certificationFirst: true });
      if (mode.kind === 'random') return shuffle(activeQuestionIds()).slice(0, mode.count);
      if (mode.kind === 'scenario') {
        const ids = ACTIVE_QUESTIONS.filter(isScenarioQuestion).map(q => q.id);
        return shuffle(ids).slice(0, mode.count);
      }
      if (mode.kind === 'difficulty') {
        const ids = questionsByDifficulty(mode.level).map(q => q.id);
        const shuffled = shuffle(ids);
        return mode.count ? shuffled.slice(0, mode.count) : shuffled;
      }
      return [];
    }

    function homeMarkup() {
      const saved = listSavedQuizzes();
      const incomplete = saved.find(q => !q.completedAt && completedCount(q) < q.questionIds.length);
      const generalSaved = readQuiz('general');
      const generalCompleted = generalSaved ? completedCount(generalSaved) : 0;
      const totalCertification = ACTIVE_QUESTIONS.filter(q => q.certification).length;

      const modeCards = (DATA.testModes || []).map(mode => {
        const existing = readQuiz(mode.id);
        const count = modeCount(mode);
        const done = existing ? completedCount(existing) : 0;
        const buttonText = existing && !existing.completedAt ? t('common.resume') + ` (${done}/${existing.questionIds.length})` : mode.button;
        return `
        <article class="mode-card nb-card accent-${safe(mode.accent || 'yellow')}">
          <div class="theme-card__icon" aria-hidden="true">${safe(mode.emoji || '★')}</div>
          <h3>${safe(mode.title)}</h3>
          <p>${safe(mode.description)}</p>
          <div class="action-card__meta">
            <span class="badge">${count} ${t('common.questions')}</span>
            ${mode.timer ? `<span class="badge" title="${t('home.test_modes.description')}">⏱️ ${safe(mode.timer)} ${t('common.minutes_short')}</span>` : ''}
          </div>
          <button class="btn" data-action="start-mode" data-mode="${safe(mode.id)}">${safe(buttonText)}</button>
        </article>`;
      }).join('');

      const themeCards = Object.entries(DATA.themes).map(([id, theme]) => {
        const ids = themeQuestionIds(id);
        const existing = readQuiz(`theme-${id}`);
        const done = existing ? completedCount(existing) : 0;
        const buttonText = existing && !existing.completedAt ? t('common.resume') + ` (${done}/${ids.length})` : t('home.themes.launch_count', { count: ids.length });
        return `
        <article class="theme-card nb-card accent-${safe(theme.accent)}">
          <div class="theme-card__icon" aria-hidden="true">${safe(theme.emoji)}</div>
          <h3>${safe(theme.name)}</h3>
          <p>${safe(theme.description)}</p>
          <button class="btn btn--ghost btn--small" data-action="open-synthesis-theme" data-theme="${safe(id)}">${t('home.themes.read_synthesis')}</button>
          <button class="btn" data-action="start-theme" data-theme="${safe(id)}">${safe(buttonText)}</button>
        </article>`;
      }).join('');

      return `

      <section class="hero nb-card">
        <span class="hero__eyebrow">${t('home.hero.eyebrow')}</span>
        <h1>${t('home.hero.title')}</h1>
        <p>${t('home.hero.description')}</p>
        <div class="hero__stats">
          <span class="stat-pill">${ACTIVE_QUESTIONS.length} ${t('common.questions')}</span>
          <span class="stat-pill">${Object.keys(DATA.themes).length} ${t('common.themes')}</span>
          <span class="stat-pill">${totalCertification} ${t('home.hero.stats.certification')}</span>
        </div>
      </section>

      <div class="section-title">
        <div><h2>${t('home.resources.title')}</h2></div>
      </div>
      <section class="synthesis-callout nb-card">
        <div>
          <span class="badge">${t('home.resources.syntheses.badge')}</span>
          <h2>${t('home.resources.syntheses.title')}</h2>
          <p>${t('home.resources.syntheses.description')}</p>
        </div>
        <button class="btn btn--dark" data-action="syntheses">${t('home.resources.syntheses.button')}</button>
      </section>
      <section class="home-actions home-actions--equal">
        <article class="action-card nb-card">
          <h2>${t('home.resources.organismes.title')}</h2>
          <p>${t('home.resources.organismes.description')}</p>
          <button class="btn" data-action="organismes">${t('home.resources.organismes.button')}</button>
        </article>
        <article class="action-card nb-card">
          <h2>${t('home.resources.tools.title')}</h2>
          <p>${t('home.resources.tools.description')}</p>
          <button class="btn" data-action="tools">${t('home.resources.tools.button')}</button>
        </article>
      </section>
     
      
      <div class="section-title">
        <div><h2>${t('home.test_modes.title')}</h2></div>
      </div>
      <p>${t('home.test_modes.description')}</p>
      
      <section class="home-actions">
        <article class="action-card action-card--general nb-card">
          <h2>${t('home.grand_test.title')}</h2>
          <p>${t('home.grand_test.description')}</p>
          <div class="action-card__meta">
            <span class="badge">${ACTIVE_QUESTIONS.length} ${t('common.questions')}</span>
            <span class="badge">${t('home.grand_test.correction_directe')}</span>
            ${generalCompleted ? `<span class="badge">${t('home.grand_test.progression', { done: generalCompleted, total: ACTIVE_QUESTIONS.length })}</span>` : ''}
          </div>
          <button class="btn btn--ghost " data-action="start-general">${generalSaved && !generalSaved.completedAt ? t('home.grand_test.resume') : t('home.grand_test.start')}</button>
        </article>

        ${incomplete ? `
          <article class="action-card action-card--continue nb-card">
            <h3>${t('home.continue.title')}</h3>
            <p><strong>${safe(incomplete.title)}</strong><br>${t('home.continue.status', { done: completedCount(incomplete), total: incomplete.questionIds.length })}</p>
            <button class="btn" data-action="resume-latest" data-id="${safe(incomplete.id)}">${t('home.continue.button')}</button>
          </article>` : `
          <article class="action-card nb-card nb-card--soft">
            <h3>${t('home.local_progression.title')}</h3>
            <p>${t('home.local_progression.description')}</p>
            <span class="badge">${t('home.local_progression.badge')}</span>
          </article>`}
      </section>
      
      <section class="mode-grid">${modeCards}</section>

      <div class="section-title">
        <div><h2>${t('home.themes.title')}</h2></div>
        <p>${t('home.themes.subtitle')}</p>
      </div>
      <section class="theme-grid">${themeCards}</section>

      <div class="section-title">
        <div><h2>${t('home.reset.title')}</h2></div>
      </div>
      <button class="btn btn--red" data-action="ask-reset-all">${t('home.reset.button')}</button>
    `;

    }

    function getDraft(q) {
      if (!ui.quiz.shuffled[q.id]) {
        if (q.type === 'single' || q.type === 'multiple') {
          ui.quiz.shuffled[q.id] = q.shuffleOptions === false ? q.options.map(o => o.id) : shuffle(q.options.map(o => o.id));
        } else if (q.type === 'tf-grid') {
          ui.quiz.shuffled[q.id] = q.shuffleStatements === false ? q.statements.map(s => s.id) : shuffle(q.statements.map(s => s.id));
        } else if (q.type === 'matching') {
          ui.quiz.shuffled[q.id] = {
            left: q.shuffleLeft === false ? q.pairs.map(p => p.leftId) : shuffle(q.pairs.map(p => p.leftId)),
            right: q.shuffleRight === false ? q.pairs.map(p => p.rightId) : shuffle(q.pairs.map(p => p.rightId)),
          };
        } else if (q.type === 'order') {
          ui.quiz.shuffled[q.id] = q.shuffleItems === false ? q.items.map(it => it[0]) : shuffle(q.items.map(it => it[0]));
        } else if (q.type === 'fill') {
          ui.quiz.shuffled[q.id] = {};
          q.blanks.forEach(b => {
            ui.quiz.shuffled[q.id][b.id] = b.shuffleChoices === false ? [...b.choices] : shuffle(b.choices);
          });
        }
      }

      if (!ui.quiz.drafts[q.id]) {
        if (q.type === 'multiple') ui.quiz.drafts[q.id] = [];
        if (q.type === 'tf-grid' || q.type === 'fill' || q.type === 'matching') ui.quiz.drafts[q.id] = {};
        if (q.type === 'order') ui.quiz.drafts[q.id] = [...ui.quiz.shuffled[q.id]];
      }
      return ui.quiz.drafts[q.id];
    }

    function getAnswer(q) {
      return ui.quiz.answers[q.id] || null;
    }

    function effectiveValue(q) {
      return getAnswer(q)?.value ?? getDraft(q);
    }

    function renderChoiceQuestion(q, locked, value) {
      const selected = q.type === 'multiple' ? new Set(value || []) : new Set(value ? [value] : []);
      const correct = new Set(Array.isArray(q.correct) ? q.correct : [q.correct]);
      const inputType = q.type === 'multiple' ? 'checkbox' : 'radio';
      const optionMap = new Map(q.options.map(opt => [opt.id, opt]));
      const order = ui.quiz.shuffled[q.id] || q.options.map(o => o.id);

      return `<div class="options">${order.map(id => {
        const opt = optionMap.get(id);
        const isSelected = selected.has(opt.id);
        const isCorrect = correct.has(opt.id);
        const classes = ['option'];
        if (isSelected) classes.push('is-selected');
        if (locked) classes.push('is-locked');
        if (locked && isCorrect) classes.push('is-correct');
        if (locked && isSelected && !isCorrect) classes.push('is-wrong');
        let mark = '';
        if (locked && isCorrect) mark = `<span class="option__mark" aria-label="${t('quiz.types.choice.correct_mark')}">✓</span>`;
        if (locked && isSelected && !isCorrect) mark = `<span class="option__mark" aria-label="${t('quiz.types.choice.wrong_mark')}">✕</span>`;
        return `
        <label class="${classes.join(' ')}">
          <input type="${inputType}" name="choice-${safe(q.id)}" value="${safe(opt.id)}" ${isSelected ? 'checked' : ''} ${locked ? 'disabled' : ''} data-question-input="choice">
          <span>${safe(opt.label)}</span>${mark}
        </label>`;
      }).join('')}</div>`;
    }

    function renderTfQuestion(q, locked, value) {
      const statementMap = new Map(q.statements.map(s => [s.id, s]));
      const order = ui.quiz.shuffled[q.id] || q.statements.map(s => s.id);

      return `
      <div class="table-scroll">
        <table class="tf-table">
          <thead><tr><th>${t('quiz.types.tf.statement')}</th><th>${t('quiz.types.tf.vrai')}</th><th>${t('quiz.types.tf.faux')}</th></tr></thead>
          <tbody>${order.map(id => {
        const s = statementMap.get(id);
        const chosen = value?.[s.id];
        const rowCorrect = locked && chosen === s.correct;
        const rowWrong = locked && chosen !== undefined && chosen !== s.correct;
        return `
              <tr class="${rowCorrect ? 'is-correct' : rowWrong ? 'is-wrong' : ''}">
                <td>${safe(s.text)} ${locked ? `<strong>— ${s.correct ? t('quiz.types.tf.vrai') : t('quiz.types.tf.faux')}</strong>` : ''}</td>
                <td><input aria-label="${t('quiz.types.tf.vrai')}" type="radio" name="tf-${safe(s.id)}" value="true" ${chosen === true ? 'checked' : ''} ${locked ? 'disabled' : ''} data-question-input="tf" data-statement="${safe(s.id)}"></td>
                <td><input aria-label="${t('quiz.types.tf.faux')}" type="radio" name="tf-${safe(s.id)}" value="false" ${chosen === false ? 'checked' : ''} ${locked ? 'disabled' : ''} data-question-input="tf" data-statement="${safe(s.id)}"></td>
              </tr>`;
      }).join('')}</tbody>
        </table>
      </div>`;
    }

    function renderFillTemplate(q, locked, value) {
      const blankMap = new Map(q.blanks.map(b => [b.id, b]));
      const parts = q.template.split(/({{[^}]+}})/g);
      const html = parts.map(part => {
        const match = part.match(/^{{([^}]+)}}$/);
        if (!match) return safe(part);
        const id = match[1];
        const blank = blankMap.get(id);
        const chosen = value?.[id] || '';
        const cls = locked ? (chosen === blank.correct ? 'is-correct' : 'is-wrong') : '';
        const shuffledChoices = ui.quiz.shuffled[q.id]?.[id] || blank.choices;

        return `<select class="fill-select ${cls}" data-question-input="fill" data-blank="${safe(id)}" ${locked ? 'disabled' : ''} aria-label="${t('quiz.types.fill.aria_label')}">
        <option value="">${t('quiz.types.fill.choose')}</option>
        ${shuffledChoices.map(choice => `<option value="${safe(choice)}" ${chosen === choice ? 'selected' : ''}>${safe(choice)}</option>`).join('')}
      </select>`;
      }).join('');
      return `<div class="fill-text">${html}</div>`;
    }

    function renderMatching(q, locked, value) {
      const leftOrder = ui.quiz.shuffled[q.id]?.left || q.pairs.map(p => p.leftId);
      const rightOrder = ui.quiz.shuffled[q.id]?.right || q.pairs.map(p => p.rightId);
      const leftMap = new Map(q.pairs.map(p => [p.leftId, p]));
      const rightMap = new Map(q.pairs.map(p => [p.rightId, p.right]));

      const correctnessByLeft = {};
      q.pairs.forEach(p => {
        if (locked) correctnessByLeft[p.leftId] = value?.[p.leftId] === p.rightId || rightMap.get(value?.[p.leftId]) === p.right;
      });
      return `
      <div class="match-board" data-match-board="${safe(q.id)}">
        <svg class="match-lines" aria-hidden="true"></svg>
        <div class="match-column">
          ${leftOrder.map(lId => {
        const p = leftMap.get(lId);
        const linked = Boolean(value?.[p.leftId]);
        const active = ui.activeMatchLeft === p.leftId;
        const resultClass = locked ? (correctnessByLeft[p.leftId] ? 'is-correct' : 'is-wrong') : '';
        return `<button type="button" class="match-item ${active ? 'is-active' : ''} ${linked ? 'is-linked' : ''} ${resultClass}" data-side="left" data-match-left="${safe(p.leftId)}" ${locked ? 'disabled' : ''}>${safe(p.left)}</button>`;
      }).join('')}
        </div>
        <div class="match-column">
          ${rightOrder.map(rId => {
        const rLabel = rightMap.get(rId);
        const linked = Object.values(value || {}).includes(rId);
        return `<button type="button" class="match-item ${linked ? 'is-linked' : ''}" data-side="right" data-match-right="${safe(rId)}" ${locked ? 'disabled' : ''}>${safe(rLabel)}</button>`;
      }).join('')}
        </div>
      </div>
      <p><strong>${t('quiz.types.matching.instructions')}</strong></p>`;
    }

    function renderOrder(q, locked, value) {
      const itemMap = new Map(q.items.map(([id, label]) => [id, label]));
      return `<div class="order-list" data-order-list="${safe(q.id)}">${(value || []).map((id, index) => {
        const correctAtPosition = q.correctOrder[index] === id;
        const isDragging = ui.touchDraggingId === id;
        return `
        <div class="order-item ${isDragging ? 'is-dragging' : ''} ${locked ? (correctAtPosition ? 'is-correct' : 'is-wrong') : ''}" draggable="${locked ? 'false' : 'true'}" data-order-id="${safe(id)}">
          <span class="order-handle" aria-hidden="true">☰</span>
          <span><strong>${index + 1}.</strong> ${safe(itemMap.get(id))}</span>
          ${locked ? '' : `<span class="order-controls"><button type="button" aria-label="${t('quiz.types.order.aria_up')}" data-action="move-order" data-direction="up" data-id="${safe(id)}">↑</button><button type="button" aria-label="${t('quiz.types.order.aria_down')}" data-action="move-order" data-direction="down" data-id="${safe(id)}">↓</button></span>`}
        </div>`;
      }).join('')}</div>`;
    }

    function questionBody(q, locked, value) {
      if (q.type === 'single' || q.type === 'multiple') return renderChoiceQuestion(q, locked, value);
      if (q.type === 'tf-grid') return renderTfQuestion(q, locked, value);
      if (q.type === 'fill') return renderFillTemplate(q, locked, value);
      if (q.type === 'matching') return renderMatching(q, locked, value);
      if (q.type === 'order') return renderOrder(q, locked, value);
      return `<p>${t('quiz.types.unknown')}</p>`;
    }

    function renderMedia(q) {
      if (!q || !q.media) return '';
      const m = q.media;
      const type = safe(m.type);
      const src = safe(m.src);
      const alt = safe(m.alt || '');
      const caption = m.caption ? `<figcaption>${safe(m.caption)}</figcaption>` : '';

      if (type === 'image') {
        return `<figure class="question-media"><img src="${src}" alt="${alt}" data-action="zoom-image" data-caption="${safe(m.caption || '')}">${caption}</figure>`;
      }
      if (type === 'video') {
        return `<figure class="question-media"><video src="${src}" controls></video>${caption}</figure>`;
      }
      return '';
    }

    function correctAnswerText(q) {
      if (q.type === 'single' || q.type === 'multiple') {
        const ids = new Set(Array.isArray(q.correct) ? q.correct : [q.correct]);
        return q.options.filter(o => ids.has(o.id)).map(o => o.label).join(' · ');
      }
      if (q.type === 'tf-grid') return q.statements.map(s => `${s.text} → ${s.correct ? 'Vrai' : 'Faux'}`).join(' | ');
      if (q.type === 'fill') return q.blanks.map(b => b.correct).join(' · ');
      if (q.type === 'matching') return q.pairs.map(p => `${p.left} → ${p.right}`).join(' | ');
      if (q.type === 'order') {
        const map = new Map(q.items);
        return q.correctOrder.map((id, index) => `${index + 1}. ${map.get(id)}`).join(' → ');
      }
      return '';
    }

    function feedbackDetails(q, value) {
      if (q.type === 'multiple') {
        const selected = new Set(value || []);
        const correct = new Set(q.correct || []);
        const optionMap = new Map(q.options.map(o => [o.id, o.label]));
        const selectedCorrect = [...correct].filter(id => selected.has(id));
        const missed = [...correct].filter(id => !selected.has(id));
        const wrong = [...selected].filter(id => !correct.has(id));
        return `
        <div class="feedback-row"><strong>${t('quiz.feedback.details.correct_selected')}</strong><br>${selectedCorrect.length ? selectedCorrect.map(id => safe(optionMap.get(id))).join('<br>') : t('quiz.feedback.details.none')}</div>
        <div class="feedback-row"><strong>${t('quiz.feedback.details.correct_missed')}</strong><br>${missed.length ? missed.map(id => safe(optionMap.get(id))).join('<br>') : t('quiz.feedback.details.none')}</div>
        <div class="feedback-row"><strong>${t('quiz.feedback.details.wrong_selected')}</strong><br>${wrong.length ? wrong.map(id => safe(optionMap.get(id))).join('<br>') : t('quiz.feedback.details.none')}</div>`;
      }
      if (q.type === 'tf-grid') {
        return q.statements.map(s => {
          const chosen = value?.[s.id];
          const ok = chosen === s.correct;
          return `<div class="feedback-row"><strong>${ok ? '✓' : '✕'} ${safe(s.text)}</strong><br>${t('quiz.feedback.details.correct_answer')} ${s.correct ? t('quiz.types.tf.vrai') : t('quiz.types.tf.faux')}. ${safe(s.explanation)}</div>`;
        }).join('');
      }
      if (q.type === 'fill') {
        return q.blanks.map(b => {
          const chosen = value?.[b.id] || t('results.review.item.your_answer_none');
          return `<div class="feedback-row"><strong>${chosen === b.correct ? '✓' : '✕'} ${t('quiz.feedback.details.your_choice')} ${safe(chosen)}</strong><br>${t('quiz.feedback.details.correct_answer')} ${safe(b.correct)}</div>`;
        }).join('');
      }
      if (q.type === 'matching') {
        const rightMap = new Map(q.pairs.map(p => [p.rightId, p.right]));
        return q.pairs.map(p => {
          const chosenId = value?.[p.leftId];
          const chosen = chosenId ? rightMap.get(chosenId) : t('results.review.item.your_answer_none');
          const ok = chosenId === p.rightId || rightMap.get(chosenId) === p.right;
          return `<div class="feedback-row"><strong>${ok ? '✓' : '✕'} ${safe(p.left)}</strong><br>${t('quiz.feedback.details.your_link')} ${safe(chosen)}<br>${t('quiz.feedback.details.correct_link')} ${safe(p.right)}</div>`;
        }).join('');
      }
      if (q.type === 'order') {
        const map = new Map(q.items);
        return `<div class="feedback-row"><strong>${t('quiz.feedback.details.correct_order')}</strong><br>${q.correctOrder.map((id, i) => `${i + 1}. ${safe(map.get(id))}`).join('<br>')}</div>`;
      }
      return `<div class="feedback-row"><strong>${t('quiz.feedback.details.expected')}</strong> ${safe(correctAnswerText(q))}</div>`;
    }

    function feedbackMarkup(q, answer) {
      if (!answer) return '';
      const cls = answer.status === 'correct' ? 'feedback--correct' : answer.status === 'skipped' ? 'feedback--skipped' : 'feedback--wrong';
      const titles = answer.status === 'correct'
          ? t('quiz.feedback.correct')
          : answer.status === 'skipped'
              ? [t('quiz.feedback.skipped')]
              : t('quiz.feedback.wrong');
      const title = titles[Math.abs(hashCode(q.id)) % titles.length];
      return `
      <section class="feedback ${cls}" aria-live="polite">
        <h3>${safe(title)}</h3>
        <p>${safe(q.explanation)}</p>
        <div class="feedback-detail">${feedbackDetails(q, answer.value)}</div>
      </section>`;
    }


    function quizMarkup() {
      const q = currentQuestion();
      if (!q) return `<div class="nb-card empty-state"><h2>${t('quiz.status.not_found')}</h2><button class="btn" data-action="home">${t('common.back')}</button></div>`;
      const answer = getAnswer(q);
      const locked = Boolean(answer);
      const value = effectiveValue(q);
      const done = completedCount();
      const total = ui.quiz.questionIds.length;
      const percent = Math.round((done / total) * 100);
      const remaining = total - done;
      const theme = DATA.themes[q.theme];

      const navButtons = ui.quiz.questionIds.map((id, index) => {
        const ans = ui.quiz.answers[id];
        const classes = ['q-nav'];
        if (index === ui.quiz.currentIndex) classes.push('is-current');
        if (ans?.status === 'correct') classes.push('is-correct');
        if (ans?.status === 'incorrect') classes.push('is-wrong');
        if (ans?.status === 'skipped') classes.push('is-skipped');
        const qLabel = t('results.review.item.question', { index: index + 1, label: ans ? t(`results.review.item.label_${ans.status}`) : '', prompt: '' }).split(':')[0].trim();
        return `<button class="${classes.join(' ')}" data-action="go-question" data-index="${index}" aria-label="${qLabel}${ans ? `, ${ans.status}` : ''}">${index + 1}</button>`;
      }).join('');

      return `
      <header class="topbar">
        <button class="btn btn--small" data-action="home">${t('quiz.navigation.home')}</button>
        <div class="topbar__title"><strong>${safe(ui.quiz.title)}</strong><span>${t('quiz.navigation.automatic_save')}</span></div>
        <div class="topbar__actions">
          ${ui.quiz.timer ? `<div class="quiz-timer" id="quiz-timer" title="${t('quiz.navigation.time_remaining')}">--:--</div>` : ''}
          <div class="streak" title="Série de bonnes réponses">${t('quiz.navigation.streak', { count: ui.quiz.streak || 0 })}</div>
        </div>
      </header>

      <div class="quiz-layout">
        <section class="quiz-main">
          <div class="progress-card nb-card">
            <div class="progress-meta"><span>${t('quiz.status.completed', { done })}</span><span>${percent} %</span></div>
            <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}"><div class="progress-fill" style="width: ${percent}%"></div></div>
          </div>

          <article class="question-card nb-card">
            <div class="question-card__header">
              <div>
                <div class="question-card__meta">
                  <span class="badge question-number">${t('quiz.question.header.number', { index: ui.quiz.currentIndex + 1, total })}</span>
                  <span class="badge type-badge">${safe(typeLabel(q.type))}</span>
                  ${q.certification ? `<span class="badge cert-badge">${t('quiz.question.header.certification')}</span>` : ''}
                </div>
                <p><strong>${safe(theme.emoji)} ${safe(theme.name)}</strong></p>
              </div>
              ${q.visual ? `<div class="question-visual" aria-hidden="true">${safe(q.visual)}</div>` : ''}
            </div>
            <h2>${safe(q.prompt)}</h2>
            ${renderMedia(q)}
            ${q.type === 'multiple' ? `<p><strong>${t('quiz.question.multiple_notice')}</strong></p>` : ''}
            ${questionBody(q, locked, value)}
            ${feedbackMarkup(q, answer)}

            <div class="question-actions">
              <div class="question-actions__main">
                <button class="btn" data-action="previous" ${ui.quiz.currentIndex === 0 ? 'disabled' : ''}>${t('quiz.controls.previous')}</button>
                ${locked ? '' : `<button class="btn btn--pink" data-action="skip">${t('quiz.controls.skip')}</button>`}
              </div>
              <div class="question-actions__main">
                ${locked ? '' : `<button class="btn btn--dark" data-action="validate">${t('quiz.controls.validate')}</button>`}
                ${ui.quiz.currentIndex < total - 1 ? `<button class="btn btn--yellow" data-action="next">${t('quiz.controls.next')}</button>` : `<button class="btn btn--yellow" data-action="finish">${remaining === 0 ? t('quiz.status.see_result') : t('quiz.status.remaining_count', { count: remaining })}</button>`}
              </div>
            </div>
          </article>
        </section>

        <aside class="quiz-sidebar">
          <div class="nav-card nb-card">
            <h3>${t('quiz.sidebar.title')}</h3>
            <p>${t('quiz.sidebar.description')}</p>
            <div class="question-grid">${navButtons}</div>
            <div class="nav-legend">
              <span class="legend-item"><span class="legend-dot correct"></span>${t('quiz.sidebar.legend.correct')}</span>
              <span class="legend-item"><span class="legend-dot wrong"></span>${t('quiz.sidebar.legend.wrong')}</span>
              <span class="legend-item"><span class="legend-dot skipped"></span>${t('quiz.sidebar.legend.skipped')}</span>
              <span class="legend-item"><span class="legend-dot current"></span>${t('quiz.sidebar.legend.current')}</span>
            </div>
            <div class="sidebar-actions">
              <button class="btn btn--dark" data-action="finish" ${remaining > 0 ? 'disabled' : ''}>${t('quiz.status.view_result_btn')}</button>
              <button class="btn btn--red" data-action="ask-reset-current">${t('quiz.controls.restart')}</button>
            </div>
          </div>
        </aside>
      </div>`;
    }

    function isDraftComplete(q, draft) {
      if (q.type === 'single') return Boolean(draft);
      if (q.type === 'multiple') return Array.isArray(draft) && draft.length > 0;
      if (q.type === 'tf-grid') return q.statements.every(s => typeof draft?.[s.id] === 'boolean');
      if (q.type === 'fill') return q.blanks.every(b => Boolean(draft?.[b.id]));
      if (q.type === 'matching') {
        const rightMap = new Map(q.pairs.map(p => [p.rightId, p.right]));
        const pairsComplete = q.pairs.every(p => Boolean(draft?.[p.leftId]));
        if (!pairsComplete) return false;

        const chosenRights = Object.values(draft);
        const chosenLabels = new Set(chosenRights.map(id => rightMap.get(id)));
        const requiredLabels = new Set(q.pairs.map(p => p.right));

        return chosenLabels.size === requiredLabels.size;
      }
      if (q.type === 'order') return Array.isArray(draft) && draft.length === q.items.length;
      return false;
    }



    function validateCurrent() {
      const q = currentQuestion();
      if (!q || getAnswer(q)) return;
      const draft = structuredClone(getDraft(q));
      if (!isDraftComplete(q, draft)) {
        showToast(t('toasts.complete_question'));
        return;
      }
      const correct = evaluate(q, draft);
      ui.quiz.answers[q.id] = {
        status: correct ? 'correct' : 'incorrect',
        value: draft,
        completedAt: Date.now(),
      };
      ui.quiz.streak = correct ? (ui.quiz.streak || 0) + 1 : 0;
      saveQuiz();

      if (ui.quiz.timer) {
        goToNextOrFinish();
        return;
      }

      if (correct) {
        showToast(ui.quiz.streak >= 3 ? t('toasts.streak', { count: ui.quiz.streak }) : t('toasts.streak_simple'));
        if (ui.quiz.streak > 0 && ui.quiz.streak % 5 === 0) launchConfetti(35);
      } else {
        showToast(t('toasts.feedback_correction'));
      }
      renderPreserveScroll();
    }

    function skipCurrent() {
      const q = currentQuestion();
      if (!q || getAnswer(q)) return;
      ui.quiz.answers[q.id] = {
        status: 'skipped',
        value: structuredClone(getDraft(q)),
        completedAt: Date.now(),
      };
      ui.quiz.streak = 0;
      saveQuiz();

      if (ui.quiz.timer) {
        goToNextOrFinish();
        return;
      }

      showToast(t('toasts.skip_feedback'));
      renderPreserveScroll();
    }

    function finishQuiz(force = false) {
      if (!force && remainingCount() > 0) {
        showToast(t('toasts.remaining_questions', { count: remainingCount() }));
        return;
      }

      if (force) {
        ui.quiz.questionIds.forEach(id => {
          if (!ui.quiz.answers[id]) {
            const q = QUESTION_BY_ID.get(id);
            ui.quiz.answers[id] = {
              status: 'skipped',
              value: structuredClone(getDraft(q)),
              completedAt: Date.now(),
            };
          }
        });
      }

      ui.quiz.completedAt = Date.now();
      saveQuiz();
      ui.view = 'results';
      ui.reviewFilter = 'errors';
      const pct = Math.round((correctCount() / ui.quiz.questionIds.length) * 100);
      if (pct >= 75) launchConfetti(pct >= 90 ? 120 : 70);
      render(true);
    }

    function scoreMessage(pct) {
      if (pct >= 90) return t('results.score_messages.top');
      if (pct >= 75) return t('results.score_messages.high');
      if (pct >= 60) return t('results.score_messages.medium');
      if (pct >= 40) return t('results.score_messages.low');
      return t('results.score_messages.default');
    }

    function formatAnswer(q, value) {
      if (value === undefined || value === null) return t('results.review.item.your_answer_none');
      if (q.type === 'single') return q.options.find(o => o.id === value)?.label || t('results.review.item.your_answer_none');
      if (q.type === 'multiple') return value.length ? q.options.filter(o => value.includes(o.id)).map(o => o.label).join(' · ') : t('results.review.item.your_answer_none');
      if (q.type === 'tf-grid') return q.statements.map(s => `${s.text} → ${value?.[s.id] === true ? t('quiz.types.tf.vrai') : value?.[s.id] === false ? t('quiz.types.tf.faux') : t('results.review.item.not_answered')}`).join(' | ');
      if (q.type === 'fill') return q.blanks.map(b => value?.[b.id] || t('results.review.item.not_answered')).join(' · ');
      if (q.type === 'matching') {
        const rightMap = new Map(q.pairs.map(p => [p.rightId, p.right]));
        return q.pairs.map(p => `${p.left} → ${rightMap.get(value?.[p.leftId]) || t('results.review.item.not_linked')}`).join(' | ');
      }
      if (q.type === 'order') {
        const map = new Map(q.items);
        return (value || []).map((id, i) => `${i + 1}. ${map.get(id)}`).join(' → ');
      }
      return t('results.review.item.answer_saved');
    }

    function resultsMarkup() {
      const total = ui.quiz.questionIds.length;
      const correct = correctCount();
      const incorrect = Object.values(ui.quiz.answers).filter(a => a.status === 'incorrect').length;
      const skipped = Object.values(ui.quiz.answers).filter(a => a.status === 'skipped').length;
      const pct = Math.round((correct / total) * 100);

      const themeStats = Object.entries(DATA.themes).map(([id, theme]) => {
        const ids = ui.quiz.questionIds.filter(qid => QUESTION_BY_ID.get(qid)?.theme === id);
        if (!ids.length) return '';
        const ok = ids.filter(qid => ui.quiz.answers[qid]?.status === 'correct').length;
        const p = Math.round((ok / ids.length) * 100);
        return `<div class="theme-result nb-card"><strong>${safe(theme.emoji)} ${safe(theme.name)}</strong><span>${ok}/${ids.length} · ${p}%</span><div class="theme-result__bar"><div class="theme-result__fill" style="width: ${p}%"></div></div></div>`;
      }).join('');

      const filteredIds = ui.quiz.questionIds.filter(id => {
        const status = ui.quiz.answers[id]?.status;
        if (ui.reviewFilter === 'all') return true;
        if (ui.reviewFilter === 'errors') return status === 'incorrect' || status === 'skipped';
        return status === ui.reviewFilter;
      });

      const reviewItems = filteredIds.map((id) => {
        const q = QUESTION_BY_ID.get(id);
        const answer = ui.quiz.answers[id];
        const originalIndex = ui.quiz.questionIds.indexOf(id) + 1;
        const labelKey = `results.review.item.label_${answer.status === 'incorrect' ? 'incorrect' : answer.status}`;
        const label = t(labelKey);
        const qSummary = t('results.review.item.question', { index: originalIndex, label: safe(label), prompt: safe(q.prompt) });
        return `<details class="review-item nb-card is-${answer.status === 'incorrect' ? 'wrong' : answer.status}">
        <summary>${qSummary}</summary>
        <div class="review-body">
          ${renderMedia(q)}
          <div class="review-answer"><strong>${t('results.review.item.your_answer')}</strong><br>${safe(formatAnswer(q, answer.value))}</div>
          <div class="review-answer"><strong>${t('results.review.item.expected_answer')}</strong><br>${safe(correctAnswerText(q))}</div>
          <p>${safe(q.explanation)}</p>
          <div class="feedback-detail">${feedbackDetails(q, answer.value)}</div>
        </div>
      </details>`;
      }).join('');

      const retryIds = ui.quiz.questionIds.filter(id => ui.quiz.answers[id]?.status !== 'correct');

      return `
      <section class="results-hero nb-card">
        <span class="badge">${t('results.hero.eyebrow')}</span>
        <h1>${safe(scoreMessage(pct))}</h1>
        <div class="results-score">${pct}%</div>
        <p><strong>${safe(ui.quiz.title)}</strong> ${t('results.hero.status', { total })}</p>
        <div class="btn-row">
          <button class="btn btn--dark" data-action="home">${t('results.hero.home')}</button>
          <button class="btn btn--yellow" data-action="syntheses">${t('results.hero.syntheses')}</button>
          <button class="btn btn--yellow" data-action="restart-finished">${t('results.hero.restart')}</button>
          ${retryIds.length ? `<button class="btn btn--pink" data-action="retry-errors">${t('results.hero.retry_errors', { count: retryIds.length })}</button>` : ''}
        </div>
      </section>

      <section class="results-grid">
        <div class="result-stat nb-card accent-mint"><strong>${correct}</strong>${t('results.stats.correct')}</div>
        <div class="result-stat nb-card accent-red"><strong>${incorrect}</strong>${t('results.stats.incorrect')}</div>
        <div class="result-stat nb-card accent-yellow"><strong>${skipped}</strong>${t('results.stats.skipped')}</div>
        <div class="result-stat nb-card accent-cyan"><strong>${total}</strong>${t('results.stats.total')}</div>
      </section>

      <div class="section-title"><div><h2>${t('results.themes.title')}</h2></div><p>${t('results.themes.description')}</p></div>
      <section class="theme-results">${themeStats}</section>

      <div class="section-title"><div><h2>${t('results.review.title')}</h2></div><p>${t('results.review.description')}</p></div>
      <div class="filter-row">
        ${[['errors',t('results.review.filters.errors_and_skipped')],['all',t('results.review.filters.all')],['correct',t('results.review.filters.correct')],['incorrect',t('results.review.filters.incorrect')],['skipped',t('results.review.filters.skipped')]].map(([id,label]) => `<button class="btn btn--small ${ui.reviewFilter === id ? 'is-active' : ''}" data-action="filter-review" data-filter="${id}">${label}</button>`).join('')}
      </div>
      <section class="review-list">${reviewItems || `<div class="nb-card empty-state"><h2>${t('results.review.empty')}</h2></div>`}</section>
      <p class="footer-note">${t('results.footer_note')}</p>`;
    }

    function synthesisById(id) {
      return (DATA.syntheses || []).find(s => s.id === id) || null;
    }

    function synthesisForTheme(themeId) {
      const chapters = DATA.syntheses || [];
      const candidates = chapters.filter(s => (s.themeIds || []).includes(themeId));
      if (candidates.length === 0) return chapters[0] || null;

      // Priorité 1 : Le thème est le sujet principal (en première position)
      const primaryMatch = candidates.find(s => (s.themeIds || [])[0] === themeId);
      if (primaryMatch) return primaryMatch;

      // Par défaut : la première synthèse qui mentionne le thème
      return candidates[0];
    }

    function synthesesIndexMarkup() {
      const cards = (DATA.syntheses || []).map((chapter, index) => `
      <article class="synthesis-card nb-card">
        <span class="badge">${t('syntheses.index.card.badge', { index: index + 1 })}</span>
        <h3>${safe(chapter.title)}</h3>
        <p>${safe(chapter.intro)}</p>
        <button class="btn" data-action="open-synthesis" data-synthesis="${safe(chapter.id)}">${t('syntheses.index.card.button')}</button>
      </article>
    `).join('');

      return `
      <header class="topbar">
        <button class="btn btn--small" data-action="home">${t('quiz.navigation.home')}</button>
        <div class="topbar__title"><strong>${t('syntheses.index.header.title')}</strong><span>${t('syntheses.index.header.subtitle')}</span></div>
        <button class="btn btn--small" data-action="start-general">${t('syntheses.index.header.grand_test')}</button>
      </header>
      <section class="hero nb-card hero--compact">
        <span class="hero__eyebrow">${t('syntheses.index.hero.eyebrow')}</span>
        <h1>${t('syntheses.index.hero.title')}</h1>
        <p>${t('syntheses.index.hero.description')}</p>
      </section>
      <section class="synthesis-grid">${cards}</section>`;
    }

    function synthesisDetailMarkup() {
      const chapters = DATA.syntheses || [];
      const chapter = synthesisById(ui.synthesisId) || chapters[0];
      if (!chapter) return `<div class="nb-card empty-state"><h2>${t('syntheses.detail.empty')}</h2><button class="btn" data-action="home">${t('common.home')}</button></div>`;
      const index = chapters.findIndex(s => s.id === chapter.id);
      const quizTheme = (chapter.themeIds || [])[0];
      const sectionList = (title, items) => items?.length ? `
      <section class="lesson-section">
        <h2>${safe(title)}</h2>
        <ul>${items.map(item => `<li>${safe(item)}</li>`).join('')}</ul>
      </section>` : '';

      return `
      <header class="topbar">
        <button class="btn btn--small" data-action="syntheses">${t('syntheses.detail.header.syntheses')}</button>
        <div class="topbar__title"><strong>${safe(chapter.title)}</strong><span>${t('syntheses.detail.header.status', { index: index + 1, total: chapters.length })}</span></div>
        <button class="btn btn--small" data-action="home">${t('syntheses.detail.header.home')}</button>
      </header>
      <article class="lesson nb-card">
        <span class="badge">${t('syntheses.detail.badge')}</span>
        <h1>${safe(chapter.title)}</h1>
        <p class="lesson-lead">${safe(chapter.intro)}</p>
        ${sectionList(t('syntheses.detail.sections.definitions'), chapter.definitions)}
        ${sectionList(t('syntheses.detail.sections.key_points'), chapter.keyPoints)}
        ${sectionList(t('syntheses.detail.sections.good_practices'), chapter.goodPractices)}
        ${sectionList(t('syntheses.detail.sections.common_mistakes'), chapter.commonMistakes)}
        ${chapter.scenario ? `<section class="lesson-section lesson-scenario"><h2>${t('syntheses.detail.sections.scenario')}</h2><p>${safe(chapter.scenario)}</p></section>` : ''}
        ${chapter.remember ? `<aside class="lesson-box lesson-box--remember"><strong>${t('syntheses.detail.boxes.remember')}</strong><p>${safe(chapter.remember)}</p></aside>` : ''}
        ${chapter.trap ? `<aside class="lesson-box lesson-box--trap"><strong>${t('syntheses.detail.boxes.trap')}</strong><p>${safe(chapter.trap)}</p></aside>` : ''}
        ${sectionList(t('syntheses.detail.sections.vocabulary'), chapter.vocabulary)}
        <div class="btn-row lesson-actions">
          ${index > 0 ? `<button class="btn" data-action="open-synthesis" data-synthesis="${safe(chapters[index - 1].id)}">${t('syntheses.detail.actions.previous')}</button>` : ''}
          ${quizTheme ? `<button class="btn btn--dark" data-action="start-theme" data-theme="${safe(quizTheme)}">${t('syntheses.detail.actions.test')}</button>` : ''}
          ${index < chapters.length - 1 ? `<button class="btn btn--yellow" data-action="open-synthesis" data-synthesis="${safe(chapters[index + 1].id)}">${t('syntheses.detail.actions.next')}</button>` : ''}
        </div>
      </article>`;
    }

    function organismesMarkup() {
      const categories = DATA.organismes || [];
      const sections = categories.map(cat => {
        const cards = (cat.entries || []).map(e => `
        <article class="nb-card org-card">
          <div class="theme-card__icon" aria-hidden="true">${safe(e.flag || '')}</div>
          <h3><a href="${safe(e.url)}" target="_blank" rel="noopener">${safe(e.name)}</a></h3>
          <p><strong>${t('organismes.card.role')}</strong> ${safe(e.role)}</p>
          <p><strong>${t('organismes.card.public')}</strong> ${safe(e.public)}</p>
          <p><strong>${t('organismes.card.situations')}</strong> ${safe(e.situations)}</p>
          <p><strong>${t('organismes.card.contact')}</strong> ${safe(e.contact)}</p>
          <p><strong>${t('organismes.card.signaler')}</strong> ${safe(e.signaler)}</p>
        </article>`).join('');
        return `
        <section class="lesson-section">
          <h2>${safe(cat.title)}</h2>
          <div class="org-grid">${cards}</div>
        </section>`;
      }).join('');

      return `
      <header class="topbar">
        <button class="btn btn--small" data-action="home">${t('common.home')}</button>
        <div class="topbar__title"><strong>${t('organismes.hero.title')}</strong><span>${t('organismes.header.subtitle')}</span></div>
        <button class="btn btn--small" data-action="tools">${t('organismes.header.tools')}</button>
      </header>
      <section class="hero nb-card hero--compact">
        <span class="hero__eyebrow">${t('organismes.hero.eyebrow')}</span>
        <h1>${t('organismes.hero.title')}</h1>
        <p>${t('organismes.hero.description')}</p>
      </section>
      ${sections}`;
    }

    function toolsMarkup() {
      const categories = DATA.tools || [];
      const chips = categories.map(cat => `<a class="btn btn--ghost btn--small" href="#tools-${safe(cat.id)}">${safe(cat.title)}</a>`).join('');
      const sections = categories.map(cat => {
        const items = (cat.items || []).map(item => {
          const extraLinks = item.links?.length
              ? `<div class="tool-links">${item.links.map(l => `<a href="${safe(l.url)}" target="_blank" rel="noopener">${safe(l.label)}</a>`).join(' · ')}</div>`
              : '';
          const titleMarkup = item.url
              ? `<a href="${safe(item.url)}" target="_blank" rel="noopener">${safe(item.name)}</a>`
              : safe(item.name);
          return `
          <article class="nb-card tool-item" data-tool-search="${safe((item.name + ' ' + item.description).toLowerCase())}">
            <h4>${titleMarkup}</h4>
            <p>${safe(item.description)}</p>
            ${extraLinks}
          </article>`;
        }).join('');
        return `
        <section class="lesson-section" id="tools-${safe(cat.id)}">
          <h2>${safe(cat.title)}</h2>
          <div class="tool-grid">${items}</div>
        </section>`;
      }).join('');

      return `
      <header class="topbar">
        <button class="btn btn--small" data-action="home">${t('common.home')}</button>
        <div class="topbar__title"><strong>${t('tools.hero.title')}</strong><span>${t('tools.header.subtitle')}</span></div>
        <button class="btn btn--small" data-action="organismes">${t('tools.header.organismes')}</button>
      </header>
      <section class="hero nb-card hero--compact">
        <span class="hero__eyebrow">${t('tools.hero.eyebrow')}</span>
        <h1>${t('tools.hero.title')}</h1>
        <p>${t('tools.hero.description', { count: categories.reduce((n, c) => n + (c.items?.length || 0), 0) })}</p>
        <input type="search" class="tool-search-input" data-tools-search placeholder="${t('tools.hero.search_placeholder')}" aria-label="${t('tools.hero.search_aria_label')}">
        <div class="tool-chips">${chips}</div>
      </section>
      ${sections}`;
    }

    function modalMarkup() {
      if (!ui.modal) return '';
      if (ui.modal.type === 'resume') {
        const done = completedCount(ui.modal.existing);
        return `<div class="modal-backdrop" data-action="close-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal nb-card">
        <h2 id="modal-title">${t('modals.resume.title')}</h2>
        <p>${t('modals.resume.description', { done, total: ui.modal.questionIds.length })}</p>
        <div class="btn-row"><button class="btn btn--dark" data-action="confirm-resume">${t('common.resume')}</button><button class="btn btn--red" data-action="confirm-restart-launch">${t('common.restart')}</button><button class="btn" data-action="close-modal">${t('common.cancel')}</button></div>
      </div></div>`;
      }
      if (ui.modal.type === 'reset-current') {
        return `<div class="modal-backdrop" data-action="close-modal" role="dialog" aria-modal="true"><div class="modal nb-card"><h2>${t('modals.reset_current.title')}</h2><p>${t('modals.reset_current.description')}</p><div class="btn-row"><button class="btn btn--red" data-action="confirm-reset-current">${t('modals.reset_current.confirm')}</button><button class="btn" data-action="close-modal">${t('common.cancel')}</button></div></div></div>`;
      }
      if (ui.modal.type === 'reset-all') {
        return `<div class="modal-backdrop" data-action="close-modal" role="dialog" aria-modal="true"><div class="modal nb-card"><h2>${t('modals.reset_all.title')}</h2><p>${t('modals.reset_all.description')}</p><div class="btn-row"><button class="btn btn--red" data-action="confirm-reset-all">${t('modals.reset_all.confirm')}</button><button class="btn" data-action="close-modal">${t('common.cancel')}</button></div></div></div>`;
      }
      if (ui.modal.type === 'zoom-image') {
        return `<div class="modal-backdrop" data-action="close-modal" role="dialog" aria-modal="true">
        <div class="modal modal--large nb-card">
          <img src="${safe(ui.modal.src)}" alt="${safe(ui.modal.alt)}" class="modal-image" data-action="close-modal">
          ${ui.modal.caption ? `<p style="text-align:center; margin-bottom:16px; font-weight:650;">${safe(ui.modal.caption)}</p>` : ''}
          <div class="btn-row" style="justify-content:center"><button class="btn btn--dark" data-action="close-modal">${t('common.close')}</button></div>
        </div></div>`;
      }
      return '';
    }

    function globalFooterMarkup() {
      const year = new Date().getFullYear();
      return `<hr><p class="footer-note">
        ${t('footer.text')}
        <br>${t('footer.credits', { year })}
      </p>`;
    }

    function render(scrollTop = false) {
      const viewMarkup = ui.view === 'home'
          ? homeMarkup()
          : ui.view === 'quiz'
              ? quizMarkup()
              : ui.view === 'results'
                  ? resultsMarkup()
                  : ui.view === 'syntheses'
                      ? synthesesIndexMarkup()
                      : ui.view === 'synthesis'
                          ? synthesisDetailMarkup()
                          : ui.view === 'organismes'
                              ? organismesMarkup()
                              : ui.view === 'tools'
                                  ? toolsMarkup()
                                  : homeMarkup();
      app.innerHTML = viewMarkup + globalFooterMarkup() + modalMarkup();
      attachDynamicEvents();
      if (ui.view === 'quiz' && currentQuestion()?.type === 'matching') requestAnimationFrame(drawMatchLines);
      if (scrollTop) window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderPreserveScroll() {
      const y = window.scrollY;
      render(false);
      requestAnimationFrame(() => window.scrollTo(0, y));
    }

    function updateDraftFromInput(target) {
      const q = currentQuestion();
      if (!q || getAnswer(q)) return;
      const draft = getDraft(q);
      const kind = target.dataset.questionInput;
      if (kind === 'choice') {
        if (q.type === 'single') ui.quiz.drafts[q.id] = target.value;
        else {
          const set = new Set(draft || []);
          target.checked ? set.add(target.value) : set.delete(target.value);
          ui.quiz.drafts[q.id] = [...set];
        }
      }
      if (kind === 'tf') draft[target.dataset.statement] = target.value === 'true';
      if (kind === 'fill') draft[target.dataset.blank] = target.value;
      saveQuiz();
    }

    function handleMatchClick(target) {
      const q = currentQuestion();
      if (!q || q.type !== 'matching' || getAnswer(q)) return;
      const draft = getDraft(q);
      if (target.dataset.matchLeft) {
        if (ui.activeMatchLeft === target.dataset.matchLeft) {
          ui.activeMatchLeft = null;
        } else {
          ui.activeMatchLeft = target.dataset.matchLeft;
        }
        renderPreserveScroll();
        return;
      }
      if (target.dataset.matchRight) {
        if (!ui.activeMatchLeft) {
          showToast(t('toasts.match_instructions'));
          return;
        }
        const rightId = target.dataset.matchRight;

        // Si déjà lié à cet élément précis, on supprime la liaison (toggle)
        if (draft[ui.activeMatchLeft] === rightId) {
          delete draft[ui.activeMatchLeft];
        } else {
          // Sinon, on lie (en déliant d'abord cet élément de droite s'il était ailleurs)
          Object.keys(draft).forEach(leftId => {
            if (draft[leftId] === rightId) delete draft[leftId];
          });
          draft[ui.activeMatchLeft] = rightId;
        }

        ui.activeMatchLeft = null;
        saveQuiz();
        renderPreserveScroll();
      }
    }

    function drawMatchLines() {
      const q = currentQuestion();
      if (!q || q.type !== 'matching') return;
      
      const board = document.querySelector(`[data-match-board="${CSS.escape(q.id)}"]`);
      const svg = board?.querySelector('.match-lines');
      if (!board || !svg) return;

      const value = effectiveValue(q) || {};
      const rect = board.getBoundingClientRect();
      
      // Mise à jour de la viewBox pour correspondre exactement au conteneur
      svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
      svg.innerHTML = '';

      Object.entries(value).forEach(([leftId, rightId]) => {
        const leftEl = board.querySelector(`[data-match-left="${CSS.escape(leftId)}"]`);
        const rightEl = board.querySelector(`[data-match-right="${CSS.escape(rightId)}"]`);
        
        if (!leftEl || !rightEl) return;

        const lr = leftEl.getBoundingClientRect();
        const rr = rightEl.getBoundingClientRect();

        // Calcul des points de départ et d'arrivée (relatifs au board)
        // On part du bord droit de l'élément gauche
        const x1 = lr.right - rect.left;
        const y1 = lr.top - rect.top + (lr.height / 2);
        
        // On arrive au bord gauche de l'élément droit
        const x2 = rr.left - rect.left;
        const y2 = rr.top - rect.top + (rr.height / 2);

        // Calcul des points de contrôle pour la courbe de Bézier
        // On crée une courbe en "S" doux. 
        // La distance horizontale influence la "pente" de la courbe.
        const deltaX = x2 - x1;
        const controlOffset = Math.max(Math.abs(deltaX) * 0.5, 50); // Minimum 50px pour éviter les courbes trop serrées

        const cp1x = x1 + controlOffset; // Point de contrôle 1 (sortie gauche)
        const cp1y = y1;
        const cp2x = x2 - controlOffset; // Point de contrôle 2 (entrée droite)
        const cp2y = y2;

        // Création du chemin SVG
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Commande : M (Move to) -> C (Curve to with 2 control points)
        const d = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
        
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#65dfff'); // Couleur cohérente avec votre thème
        path.setAttribute('stroke-width', '3');
        path.setAttribute('stroke-linecap', 'round');
        
        // Optionnel : Ajouter une ombre ou un effet de lueur
        path.style.filter = 'drop-shadow(0 0 2px rgba(101, 223, 255, 0.6))';

        svg.appendChild(path);
      });
    }

    // Gestionnaire de redimensionnement optimisé
    let matchResizeObserver = null;

    function setupMatchResizeObserver() {
      // Nettoyer l'observateur précédent s'il existe
      if (matchResizeObserver) {
        matchResizeObserver.disconnect();
      }

      const q = currentQuestion();
      if (!q || q.type !== 'matching') return;

      const board = document.querySelector(`[data-match-board="${CSS.escape(q.id)}"]`);
      if (!board) return;

      matchResizeObserver = new ResizeObserver(() => {
        // On utilise requestAnimationFrame pour éviter de dessiner trop souvent pendant le redimensionnement
        requestAnimationFrame(drawMatchLines);
      });

      matchResizeObserver.observe(board);
    }

    function moveOrder(id, direction) {
      const q = currentQuestion();
      if (!q || q.type !== 'order' || getAnswer(q)) return;
      const arr = getDraft(q);
      const index = arr.indexOf(id);
      const next = direction === 'up' ? index - 1 : index + 1;
      if (index < 0 || next < 0 || next >= arr.length) return;
      [arr[index], arr[next]] = [arr[next], arr[index]];
      saveQuiz();
      renderPreserveScroll();
    }

    function attachOrderDrag() {
      const list = document.querySelector('.order-list');
      if (!list) return;
      let draggedId = null;
      
      // Gestion Souris (Desktop)
      list.querySelectorAll('.order-item[draggable="true"]').forEach(item => {
        item.addEventListener('dragstart', () => {
          draggedId = item.dataset.orderId;
          item.classList.add('is-dragging');
        });
        item.addEventListener('dragend', () => item.classList.remove('is-dragging'));
        item.addEventListener('dragover', event => event.preventDefault());
        item.addEventListener('drop', event => {
          event.preventDefault();
          const targetId = item.dataset.orderId;
          if (!draggedId || draggedId === targetId) return;
          const q = currentQuestion();
          const arr = getDraft(q);
          const from = arr.indexOf(draggedId);
          const to = arr.indexOf(targetId);
          arr.splice(to, 0, arr.splice(from, 1)[0]);
          saveQuiz();
          renderPreserveScroll();
        });
      });

      // Gestion Tactile (Mobile) - Plus fluide via manipulation directe du DOM
      let touchDraggedEl = null;

      list.addEventListener('touchstart', e => {
        const item = e.target.closest('.order-item');
        if (item && !e.target.closest('button')) {
          touchDraggedEl = item;
          item.classList.add('is-dragging');
          ui.touchDraggingId = item.dataset.orderId;
        }
      }, { passive: true });

      list.addEventListener('touchmove', e => {
        if (!touchDraggedEl) return;
        if (e.cancelable) e.preventDefault();
        
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.order-item');
        
        if (target && target !== touchDraggedEl) {
          const rect = target.getBoundingClientRect();
          const next = (touch.clientY - rect.top) / (rect.height) > 0.5;
          list.insertBefore(touchDraggedEl, next ? target.nextSibling : target);
          
          // Mise à jour visuelle immédiate des numéros
          list.querySelectorAll('.order-item').forEach((it, idx) => {
            const num = it.querySelector('strong');
            if (num) num.textContent = `${idx + 1}.`;
          });
        }
      }, { passive: false });

      list.addEventListener('touchend', () => {
        if (touchDraggedEl) {
          const q = currentQuestion();
          if (q) {
            ui.quiz.drafts[q.id] = [...list.querySelectorAll('.order-item')].map(it => it.dataset.orderId);
            saveQuiz();
          }
          touchDraggedEl.classList.remove('is-dragging');
          renderPreserveScroll();
        }
        touchDraggedEl = null;
        ui.touchDraggingId = null;
      }, { passive: true });
    }

    function attachMatchTouch() {
      const board = document.querySelector('.match-board');
      if (!board) return;

      let startLeftId = null;

      board.addEventListener('touchstart', e => {
        const item = e.target.closest('[data-match-left]');
        if (item) {
          startLeftId = item.dataset.matchLeft;
          ui.activeMatchLeft = startLeftId;
          renderPreserveScroll();
        }
      }, { passive: true });

      board.addEventListener('touchend', e => {
        if (!startLeftId) return;
        const touch = e.changedTouches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('[data-match-right]');
        
        if (target) {
          handleMatchClick(target);
        }
        startLeftId = null;
      }, { passive: true });
    }

    function attachDynamicEvents() {
      attachOrderDrag();
      attachMatchTouch();
      setupMatchResizeObserver(); // Ajout de l'observateur
    }


    app.addEventListener('change', event => {
      const target = event.target.closest('[data-question-input]');
      if (target) updateDraftFromInput(target);
    });

    app.addEventListener('input', event => {
      const searchInput = event.target.closest('[data-tools-search]');
      if (!searchInput) return;
      const query = searchInput.value.trim().toLowerCase();
      document.querySelectorAll('[data-tool-search]').forEach(card => {
        const match = !query || card.dataset.toolSearch.includes(query);
        card.style.display = match ? '' : 'none';
      });
      document.querySelectorAll('.lesson-section[id^="tools-"]').forEach(section => {
        const visible = section.querySelectorAll('.tool-item:not([style*="display: none"])').length;
        section.style.display = visible ? '' : 'none';
      });
    });

    app.addEventListener('click', event => {
      const matchTarget = event.target.closest('[data-match-left], [data-match-right]');
      if (matchTarget) {
        handleMatchClick(matchTarget);
        return;
      }

      const button = event.target.closest('[data-action]');
      if (!button) return;
      const action = button.dataset.action;

      if (action === 'start-general') {
        launchQuiz('general', t('home.grand_test.launch_title'), activeQuestionIds(), t('home.grand_test.launch_subtitle'));
        return;
      }
      if (action === 'start-mode') {
        const mode = (DATA.testModes || []).find(item => item.id === button.dataset.mode);
        if (mode) launchQuiz(mode.id, mode.title, modeQuestionIds(mode), mode.description, mode.timer);
        return;
      }
      if (action === 'organismes') {
        ui.view = 'organismes';
        render(true);
        return;
      }
      if (action === 'tools') {
        ui.view = 'tools';
        render(true);
        return;
      }
      if (action === 'syntheses') {
        ui.view = 'syntheses';
        ui.quiz = null;
        ui.modal = null;
        render(true);
        return;
      }
      if (action === 'open-synthesis') {
        ui.synthesisId = button.dataset.synthesis;
        ui.view = 'synthesis';
        ui.quiz = null;
        render(true);
        return;
      }
      if (action === 'open-synthesis-theme') {
        const chapter = synthesisForTheme(button.dataset.theme);
        if (chapter) {
          ui.synthesisId = chapter.id;
          ui.view = 'synthesis';
          ui.quiz = null;
          render(true);
        }
        return;
      }

      if (action === 'start-theme') {
        const id = button.dataset.theme;
        const theme = DATA.themes[id];
        launchQuiz(`theme-${id}`, theme.name, themeQuestionIds(id), theme.description);
      }
      if (action === 'resume-latest') {
        const quiz = readQuiz(button.dataset.id);
        if (quiz) resumeQuiz(quiz);
      }
      if (action === 'home') {
        ui.view = 'home';
        ui.quiz = null;
        ui.modal = null;
        render(true);
      }

      if (action === 'zoom-image') {
        ui.modal = {
          type: 'zoom-image',
          src: button.src || button.dataset.src,
          alt: button.alt || button.dataset.alt,
          caption: button.dataset.caption
        };
        render();
      }
      if (action === 'previous' && ui.quiz && ui.quiz.currentIndex > 0) {
        ui.quiz.currentIndex -= 1;
        ui.activeMatchLeft = null;
        saveQuiz();
        render(true);
      }
      if (action === 'next' && ui.quiz && ui.quiz.currentIndex < ui.quiz.questionIds.length - 1) {
        ui.quiz.currentIndex += 1;
        ui.activeMatchLeft = null;
        saveQuiz();
        render(true);
      }
      if (action === 'go-question') {
        if (ui.quiz) {
          ui.quiz.currentIndex = Number(button.dataset.index);
          ui.activeMatchLeft = null;
          saveQuiz();
          render(true);
        }
      }
      if (action === 'validate') validateCurrent();
      if (action === 'skip') skipCurrent();
      if (action === 'finish') finishQuiz();
      if (action === 'move-order') moveOrder(button.dataset.id, button.dataset.direction);

      if (action === 'ask-reset-current') {
        ui.modal = { type: 'reset-current' };
        render();
      }
      if (action === 'confirm-reset-current') {
        const { id, title, subtitle, questionIds, timer } = ui.quiz;
        deleteQuiz(id);
        ui.quiz = createQuiz(id, title, questionIds, subtitle, timer);
        ui.modal = null;
        saveQuiz();
        render(true);
      }
      if (action === 'ask-reset-all') {
        ui.modal = { type: 'reset-all' };
        render();
      }
      if (action === 'confirm-reset-all') {
        resetAllProgress();
        ui.modal = null;
        showToast(t('toasts.reset_all_success'));
        render(true);
      }
      if (action === 'close-modal') {
        if (button.classList.contains('modal-backdrop') && event.target !== button) return;
        ui.modal = null;
        render();
      }
      if (action === 'confirm-resume') {
        const modal = ui.modal;
        if (modal?.type === 'resume' && modal.existing) {
          resumeQuiz(modal.existing);
        }
      }
      if (action === 'confirm-restart-launch') {
        const modal = ui.modal;
        deleteQuiz(modal.id);
        ui.quiz = createQuiz(modal.id, modal.title, modal.questionIds, modal.subtitle, modal.timer);
        ui.view = 'quiz';
        ui.modal = null;
        saveQuiz();
        render(true);
      }
      if (action === 'restart-finished') {
        const { id, title, subtitle, questionIds, timer } = ui.quiz;
        deleteQuiz(id);
        ui.quiz = createQuiz(id, title, questionIds, subtitle, timer);
        ui.view = 'quiz';
        saveQuiz();
        render(true);
      }
      if (action === 'retry-errors') {
        if (ui.quiz) {
          const ids = ui.quiz.questionIds.filter(id => ui.quiz.answers[id]?.status !== 'correct');
          const id = `retry-${Date.now()}`;
          ui.quiz = createQuiz(id, t('quiz.retry_errors.title', { count: ids.length }), ids, t('quiz.retry_errors.subtitle'));
          ui.view = 'quiz';
          saveQuiz();
          render(true);
        }
      }
      if (action === 'filter-review') {
        ui.reviewFilter = button.dataset.filter;
        renderPreserveScroll();
      }
    });

    setInterval(() => {
      if (ui.view === 'quiz') updateTimer();
    }, 1000);

    render(true);
  }

  if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
    init();
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { safe, shuffle, hashCode, equalSets, evaluate, createQuiz, init };
  }
})();