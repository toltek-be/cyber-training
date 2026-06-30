(() => {
  'use strict';

  const DATA = window.CYBER_TRAINING_DATA;
  if (!DATA) {
    document.getElementById('app').innerHTML = '<div class="nb-card empty-state"><h2>Erreur</h2><p>Le fichier questions.js est introuvable.</p></div>';
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
    reviewFilter: 'errors',
    synthesisId: null,
  };

  const safe = (value) => String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

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

  function createQuiz(id, title, questionIds, subtitle = '') {
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
      startedAt: Date.now(),
      updatedAt: Date.now(),
      completedAt: null,
    };
  }

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function launchQuiz(id, title, questionIds, subtitle = '') {
    const existing = readQuiz(id);
    if (existing && !existing.completedAt) {
      ui.modal = {
        type: 'resume',
        id,
        title,
        questionIds,
        subtitle,
        existing,
      };
      render();
      return;
    }
    ui.quiz = createQuiz(id, title, questionIds, subtitle);
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
    const colors = ['#ffd84d', '#ff6b9d', '#65dfff', '#7ee8b7', '#b69cff', '#ff7070'];
    for (let i = 0; i < amount; i += 1) {
      const piece = document.createElement('span');
      piece.className = 'confetti';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.top = `${-10 - Math.random() * 30}px`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = `${Math.random() * .45}s`;
      piece.style.animationDuration = `${1.35 + Math.random() * 1.2}s`;
      confettiLayer.appendChild(piece);
      setTimeout(() => piece.remove(), 3000);
    }
  }

  function themeQuestionIds(themeId) {
    return ACTIVE_QUESTIONS.filter(q => q.theme === themeId).map(q => q.id);
  }

  function activeQuestionIds() {
    return ACTIVE_QUESTIONS.map(q => q.id);
  }

  function questionsByTypes(types) {
    return ACTIVE_QUESTIONS.filter(q => types.includes(q.type)).map(q => q.id);
  }

  function isScenarioQuestion(q) {
    return Boolean(q.scenario)
        || /^(vous|un|une|après|des collègues|dans|avant de|sur un)/i.test(q.prompt || '')
        || ['order', 'matching'].includes(q.type);
  }

  function selectBalancedQuestions({ count, certificationFirst = false, scenarioOnly = false } = {}) {
    const source = ACTIVE_QUESTIONS.filter(q => {
      if (scenarioOnly && !q.scenario) return false;
      return true;
    });
    const byTheme = Object.keys(DATA.themes).map(themeId => {
      const items = source.filter(q => q.theme === themeId);
      const primary = certificationFirst ? items.filter(q => q.certification) : [];
      const secondary = items.filter(q => !primary.includes(q));
      return shuffle([...shuffle(primary), ...shuffle(secondary)]);
    });
    const picked = [];
    let cursor = 0;
    while (picked.length < count && byTheme.some(list => list.length)) {
      const bucket = byTheme[cursor % byTheme.length];
      const q = bucket.shift();
      if (q && !picked.includes(q.id)) picked.push(q.id);
      cursor += 1;
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

  function currentQuestion() {
    if (!ui.quiz) return null;
    return QUESTION_BY_ID.get(ui.quiz.questionIds[ui.quiz.currentIndex]);
  }

  function typeLabel(type) {
    return ({
      single: 'Choix unique',
      multiple: 'Choix multiples',
      'tf-grid': 'Vrai / Faux',
      fill: 'Texte à compléter',
      matching: 'Éléments à relier',
      order: 'Remise en ordre',
    })[type] || 'Question';
  }

  function modeCount(mode) {
    if (mode.kind === 'all') return ACTIVE_QUESTIONS.length;
    if (mode.kind === 'balanced') return Math.min(mode.count, ACTIVE_QUESTIONS.length);
    if (mode.kind === 'random') return Math.min(mode.count, ACTIVE_QUESTIONS.length);
    if (mode.kind === 'scenario') return Math.min(mode.count, ACTIVE_QUESTIONS.filter(isScenarioQuestion).length);
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
      const buttonText = existing && !existing.completedAt ? `Reprendre (${done}/${existing.questionIds.length})` : mode.button;
      return `
        <article class="mode-card nb-card accent-${safe(mode.accent || 'yellow')}">
          <div class="theme-card__icon" aria-hidden="true">${safe(mode.emoji || '★')}</div>
          <h3>${safe(mode.title)}</h3>
          <p>${safe(mode.description)}</p>
          <div class="action-card__meta">
            <span class="badge">${count} questions</span>
            <span class="badge">${safe(mode.meta || 'Aléatoire sauvegardé')}</span>
          </div>
          <button class="btn" data-action="start-mode" data-mode="${safe(mode.id)}">${safe(buttonText)}</button>
        </article>`;
    }).join('');

    const themeCards = Object.entries(DATA.themes).map(([id, theme]) => {
      const ids = themeQuestionIds(id);
      const existing = readQuiz(`theme-${id}`);
      const done = existing ? completedCount(existing) : 0;
      const buttonText = existing && !existing.completedAt ? `Reprendre (${done}/${ids.length})` : `Lancer ${ids.length} questions`;
      return `
        <article class="theme-card nb-card accent-${safe(theme.accent)}">
          <div class="theme-card__icon" aria-hidden="true">${safe(theme.emoji)}</div>
          <h3>${safe(theme.name)}</h3>
          <p>${safe(theme.description)}</p>
          <button class="btn btn--ghost btn--small" data-action="open-synthesis-theme" data-theme="${safe(id)}">Lire la synthèse</button>
          <button class="btn" data-action="start-theme" data-theme="${safe(id)}">${safe(buttonText)}</button>
        </article>`;
    }).join('');

    return `
      <section class="hero nb-card">
        <span class="hero__eyebrow">Formation CyberCitizen · Révision TOSA</span>
        <h1>Cyber<br>Training</h1>
        <p>Un grand quiz complet et des entraînements par thème. Les corrections apparaissent immédiatement et chaque erreur devient une mini-fiche de révision.</p>
        <div class="hero__stats">
          <span class="stat-pill">${ACTIVE_QUESTIONS.length} questions</span>
          <span class="stat-pill">${Object.keys(DATA.themes).length} thèmes</span>
          <span class="stat-pill">${totalCertification} questions style certification</span>
        </div>
      </section>

      <section class="home-actions">
        <article class="action-card action-card--general nb-card">
          <h2>Le grand test</h2>
          <p>Toutes les questions, tous les thèmes, toutes les questions inspirées des captures de certification. La progression est sauvegardée automatiquement sur cet appareil.</p>
          <div class="action-card__meta">
            <span class="badge">${ACTIVE_QUESTIONS.length} questions</span>
            <span class="badge">Correction directe</span>
            ${generalCompleted ? `<span class="badge">Progression : ${generalCompleted}/${ACTIVE_QUESTIONS.length}</span>` : ''}
          </div>
          <button class="btn btn--dark" data-action="start-general">${generalSaved && !generalSaved.completedAt ? 'Reprendre le grand test' : 'Commencer le grand test'}</button>
        </article>

        ${incomplete ? `
          <article class="action-card action-card--continue nb-card">
            <h3>Continuer</h3>
            <p><strong>${safe(incomplete.title)}</strong><br>${completedCount(incomplete)} question(s) terminée(s) sur ${incomplete.questionIds.length}.</p>
            <button class="btn" data-action="resume-latest" data-id="${safe(incomplete.id)}">Reprendre là où j'en étais</button>
          </article>` : `
          <article class="action-card nb-card nb-card--soft">
            <h3>Progression locale</h3>
            <p>Aucun compte et aucune donnée envoyée : les réponses restent uniquement dans le navigateur.</p>
            <span class="badge">100 % local</span>
          </article>`}
      </section>

      <div class="section-title">
        <div><h2>Modes de test</h2></div>
        <p>Des formats courts ou proches de l'esprit TOSA, avec un ordre conservé pendant toute la tentative.</p>
      </div>
      <section class="mode-grid">${modeCards}</section>

      <section class="synthesis-callout nb-card">
        <div>
          <span class="badge">Cours</span>
          <h2>Synthèses de cours</h2>
          <p>Réviser les notions clés, les pièges fréquents et les bons réflexes avant de passer aux quiz.</p>
        </div>
        <button class="btn btn--dark" data-action="syntheses">Ouvrir les synthèses</button>
      </section>

      <div class="section-title">
        <div><h2>Quiz par thème</h2></div>
        <p>Idéal pour revoir une matière précise avant de se lancer dans le test complet.</p>
      </div>
      <section class="theme-grid">${themeCards}</section>

      <div class="section-title">
        <div><h2>Réinitialisation</h2></div>
        <p>Efface uniquement la progression enregistrée dans ce navigateur.</p>
      </div>
      <button class="btn btn--red" data-action="ask-reset-all">Réinitialiser toute la progression</button>
      <p class="footer-note">Cyber Training fonctionne sans compte, sans serveur et sans collecte de données personnelles.</p>
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
      if (locked && isCorrect) mark = '<span class="option__mark" aria-label="Bonne réponse">✓</span>';
      if (locked && isSelected && !isCorrect) mark = '<span class="option__mark" aria-label="Mauvaise réponse">✕</span>';
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
          <thead><tr><th>Affirmation</th><th>Vrai</th><th>Faux</th></tr></thead>
          <tbody>${order.map(id => {
      const s = statementMap.get(id);
      const chosen = value?.[s.id];
      const rowCorrect = locked && chosen === s.correct;
      const rowWrong = locked && chosen !== undefined && chosen !== s.correct;
      return `
              <tr class="${rowCorrect ? 'is-correct' : rowWrong ? 'is-wrong' : ''}">
                <td>${safe(s.text)} ${locked ? `<strong>${s.correct ? '— Vrai' : '— Faux'}</strong>` : ''}</td>
                <td><input aria-label="Vrai" type="radio" name="tf-${safe(s.id)}" value="true" ${chosen === true ? 'checked' : ''} ${locked ? 'disabled' : ''} data-question-input="tf" data-statement="${safe(s.id)}"></td>
                <td><input aria-label="Faux" type="radio" name="tf-${safe(s.id)}" value="false" ${chosen === false ? 'checked' : ''} ${locked ? 'disabled' : ''} data-question-input="tf" data-statement="${safe(s.id)}"></td>
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

      return `<select class="fill-select ${cls}" data-question-input="fill" data-blank="${safe(id)}" ${locked ? 'disabled' : ''} aria-label="Mot à sélectionner">
        <option value="">Choisir...</option>
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
      <p><strong>Mode d'emploi :</strong> Cliquez sur un élément à gauche, puis sur sa description à droite. Recliquez pour modifier ou annuler une liaison.</p>`;
  }

  function renderOrder(q, locked, value) {
    const itemMap = new Map(q.items.map(([id, label]) => [id, label]));
    return `<div class="order-list" data-order-list="${safe(q.id)}">${(value || []).map((id, index) => {
      const correctAtPosition = q.correctOrder[index] === id;
      return `
        <div class="order-item ${locked ? (correctAtPosition ? 'is-correct' : 'is-wrong') : ''}" draggable="${locked ? 'false' : 'true'}" data-order-id="${safe(id)}">
          <span class="order-handle" aria-hidden="true">☰</span>
          <span><strong>${index + 1}.</strong> ${safe(itemMap.get(id))}</span>
          ${locked ? '' : `<span class="order-controls"><button type="button" aria-label="Monter" data-action="move-order" data-direction="up" data-id="${safe(id)}">↑</button><button type="button" aria-label="Descendre" data-action="move-order" data-direction="down" data-id="${safe(id)}">↓</button></span>`}
        </div>`;
    }).join('')}</div>`;
  }

  function questionBody(q, locked, value) {
    if (q.type === 'single' || q.type === 'multiple') return renderChoiceQuestion(q, locked, value);
    if (q.type === 'tf-grid') return renderTfQuestion(q, locked, value);
    if (q.type === 'fill') return renderFillTemplate(q, locked, value);
    if (q.type === 'matching') return renderMatching(q, locked, value);
    if (q.type === 'order') return renderOrder(q, locked, value);
    return '<p>Type de question inconnu.</p>';
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
        <div class="feedback-row"><strong>Bonnes réponses sélectionnées</strong><br>${selectedCorrect.length ? selectedCorrect.map(id => safe(optionMap.get(id))).join('<br>') : 'Aucune'}</div>
        <div class="feedback-row"><strong>Bonnes réponses oubliées</strong><br>${missed.length ? missed.map(id => safe(optionMap.get(id))).join('<br>') : 'Aucune'}</div>
        <div class="feedback-row"><strong>Mauvaises réponses sélectionnées</strong><br>${wrong.length ? wrong.map(id => safe(optionMap.get(id))).join('<br>') : 'Aucune'}</div>`;
    }
    if (q.type === 'tf-grid') {
      return q.statements.map(s => {
        const chosen = value?.[s.id];
        const ok = chosen === s.correct;
        return `<div class="feedback-row"><strong>${ok ? '✓' : '✕'} ${safe(s.text)}</strong><br>Réponse correcte : ${s.correct ? 'Vrai' : 'Faux'}. ${safe(s.explanation)}</div>`;
      }).join('');
    }
    if (q.type === 'fill') {
      return q.blanks.map(b => {
        const chosen = value?.[b.id] || 'Aucune réponse';
        return `<div class="feedback-row"><strong>${chosen === b.correct ? '✓' : '✕'} Votre choix : ${safe(chosen)}</strong><br>Réponse correcte : ${safe(b.correct)}</div>`;
      }).join('');
    }
    if (q.type === 'matching') {
      const rightMap = new Map(q.pairs.map(p => [p.rightId, p.right]));
      return q.pairs.map(p => {
        const chosenId = value?.[p.leftId];
        const chosen = chosenId ? rightMap.get(chosenId) : 'Aucune réponse';
        const ok = chosenId === p.rightId || rightMap.get(chosenId) === p.right;
        return `<div class="feedback-row"><strong>${ok ? '✓' : '✕'} ${safe(p.left)}</strong><br>Votre liaison : ${safe(chosen)}<br>Bonne liaison : ${safe(p.right)}</div>`;
      }).join('');
    }
    if (q.type === 'order') {
      const map = new Map(q.items);
      return `<div class="feedback-row"><strong>Ordre correct</strong><br>${q.correctOrder.map((id, i) => `${i + 1}. ${safe(map.get(id))}`).join('<br>')}</div>`;
    }
    return `<div class="feedback-row"><strong>Réponse attendue :</strong> ${safe(correctAnswerText(q))}</div>`;
  }

  function feedbackMarkup(q, answer) {
    if (!answer) return '';
    const cls = answer.status === 'correct' ? 'feedback--correct' : answer.status === 'skipped' ? 'feedback--skipped' : 'feedback--wrong';
    const title = answer.status === 'correct'
        ? ['Bien joué !', 'Pare-feu mental activé !', 'Bonne réponse !'][Math.abs(hashCode(q.id)) % 3]
        : answer.status === 'skipped'
            ? 'Langue donnée au chat'
            : ['Pas tout à fait...', 'Le piège était bien caché.', 'À retenir pour la prochaine fois !'][Math.abs(hashCode(q.id)) % 3];
    return `
      <section class="feedback ${cls}" aria-live="polite">
        <h3>${safe(title)}</h3>
        <p>${safe(q.explanation)}</p>
        <div class="feedback-detail">${feedbackDetails(q, answer.value)}</div>
      </section>`;
  }

  function hashCode(str) {
    let h = 0;
    for (let i = 0; i < str.length; i += 1) h = ((h << 5) - h) + str.charCodeAt(i) | 0;
    return h;
  }

  function quizMarkup() {
    const q = currentQuestion();
    if (!q) return '<div class="nb-card empty-state"><h2>Question introuvable</h2><button class="btn" data-action="home">Retour</button></div>';
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
      return `<button class="${classes.join(' ')}" data-action="go-question" data-index="${index}" aria-label="Question ${index + 1}${ans ? `, ${ans.status}` : ''}">${index + 1}</button>`;
    }).join('');

    return `
      <header class="topbar">
        <button class="btn btn--small" data-action="home">← Accueil</button>
        <div class="topbar__title"><strong>${safe(ui.quiz.title)}</strong><span>Sauvegarde automatique activée</span></div>
        <div class="streak" title="Série de bonnes réponses">🔥 Série ${ui.quiz.streak || 0}</div>
      </header>

      <div class="quiz-layout">
        <section class="quiz-main">
          <div class="progress-card nb-card">
            <div class="progress-meta"><span>${done} question(s) terminée(s)</span><span>${percent} %</span></div>
            <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}"><div class="progress-fill" style="width: ${percent}%"></div></div>
          </div>

          <article class="question-card nb-card">
            <div class="question-card__header">
              <div>
                <div class="question-card__meta">
                  <span class="badge question-number">Question ${ui.quiz.currentIndex + 1} / ${total}</span>
                  <span class="badge type-badge">${safe(typeLabel(q.type))}</span>
                  ${q.certification ? '<span class="badge cert-badge">Style certification</span>' : ''}
                </div>
                <p><strong>${safe(theme.emoji)} ${safe(theme.name)}</strong></p>
              </div>
              ${q.visual ? `<div class="question-visual" aria-hidden="true">${safe(q.visual)}</div>` : ''}
            </div>
            <h2>${safe(q.prompt)}</h2>
            ${q.type === 'multiple' ? '<p><strong>Plusieurs réponses peuvent être correctes.</strong></p>' : ''}
            ${questionBody(q, locked, value)}
            ${feedbackMarkup(q, answer)}

            <div class="question-actions">
              <div class="question-actions__main">
                <button class="btn" data-action="previous" ${ui.quiz.currentIndex === 0 ? 'disabled' : ''}>← Précédente</button>
                ${locked ? '' : '<button class="btn btn--pink" data-action="skip">🐱 Donner ma langue au chat</button>'}
              </div>
              <div class="question-actions__main">
                ${locked ? '' : '<button class="btn btn--dark" data-action="validate">Valider ma réponse</button>'}
                ${ui.quiz.currentIndex < total - 1 ? '<button class="btn btn--yellow" data-action="next">Suivante →</button>' : `<button class="btn btn--yellow" data-action="finish">${remaining === 0 ? 'Voir mon résultat' : `Encore ${remaining} à terminer`}</button>`}
              </div>
            </div>
          </article>
        </section>

        <aside class="quiz-sidebar">
          <div class="nav-card nb-card">
            <h3>Vue d'ensemble</h3>
            <p>Cliquez sur un numéro pour accéder directement à la question.</p>
            <div class="question-grid">${navButtons}</div>
            <div class="nav-legend">
              <span class="legend-item"><span class="legend-dot correct"></span>Correcte</span>
              <span class="legend-item"><span class="legend-dot wrong"></span>Incorrecte</span>
              <span class="legend-item"><span class="legend-dot skipped"></span>Passée</span>
              <span class="legend-item"><span class="legend-dot current"></span>Actuelle</span>
            </div>
            <div class="sidebar-actions">
              <button class="btn btn--dark" data-action="finish" ${remaining > 0 ? 'disabled' : ''}>Voir le résultat</button>
              <button class="btn btn--red" data-action="ask-reset-current">Recommencer ce quiz</button>
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

  function validateCurrent() {
    const q = currentQuestion();
    if (!q || getAnswer(q)) return;
    const draft = structuredClone(getDraft(q));
    if (!isDraftComplete(q, draft)) {
      showToast('Complète la question ou donne ta langue au chat.');
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
    if (correct) {
      showToast(ui.quiz.streak >= 3 ? `🔥 Série de ${ui.quiz.streak} bonnes réponses !` : 'Bonne réponse !');
      if (ui.quiz.streak > 0 && ui.quiz.streak % 5 === 0) launchConfetti(35);
    } else {
      showToast("Correction affichée : prends le temps de lire l'explication.");
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
    showToast('Pas de réponse au hasard : la correction est affichée.');
    renderPreserveScroll();
  }

  function finishQuiz() {
    if (remainingCount() > 0) {
      showToast(`Il reste ${remainingCount()} question(s). Utilise la grille pour les retrouver.`);
      return;
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
    if (pct >= 90) return 'Le cybercriminel a quitté la conversation.';
    if (pct >= 75) return "Très solide : quelques révisions ciblées et c'est carré.";
    if (pct >= 60) return 'Bonne base. Les erreurs ci-dessous vont faire gagner les derniers points.';
    if (pct >= 40) return "Ça progresse : refais d'abord les thèmes les plus faibles.";
    return 'Pas de panique : le récapitulatif est justement là pour transformer les erreurs en réflexes.';
  }

  function formatAnswer(q, value) {
    if (value === undefined || value === null) return 'Aucune réponse';
    if (q.type === 'single') return q.options.find(o => o.id === value)?.label || 'Aucune réponse';
    if (q.type === 'multiple') return value.length ? q.options.filter(o => value.includes(o.id)).map(o => o.label).join(' · ') : 'Aucune réponse';
    if (q.type === 'tf-grid') return q.statements.map(s => `${s.text} → ${value?.[s.id] === true ? 'Vrai' : value?.[s.id] === false ? 'Faux' : 'Non répondu'}`).join(' | ');
    if (q.type === 'fill') return q.blanks.map(b => value?.[b.id] || 'Non répondu').join(' · ');
    if (q.type === 'matching') {
      const rightMap = new Map(q.pairs.map(p => [p.rightId, p.right]));
      return q.pairs.map(p => `${p.left} → ${rightMap.get(value?.[p.leftId]) || 'Non relié'}`).join(' | ');
    }
    if (q.type === 'order') {
      const map = new Map(q.items);
      return (value || []).map((id, i) => `${i + 1}. ${map.get(id)}`).join(' → ');
    }
    return 'Réponse enregistrée';
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
      const label = answer.status === 'correct' ? 'Correcte' : answer.status === 'skipped' ? 'Passée' : 'Incorrecte';
      return `<details class="review-item nb-card is-${answer.status === 'incorrect' ? 'wrong' : answer.status}">
        <summary>Question ${originalIndex} — ${safe(label)} : ${safe(q.prompt)}</summary>
        <div class="review-body">
          <div class="review-answer"><strong>Votre réponse :</strong><br>${safe(formatAnswer(q, answer.value))}</div>
          <div class="review-answer"><strong>Réponse attendue :</strong><br>${safe(correctAnswerText(q))}</div>
          <p>${safe(q.explanation)}</p>
          <div class="feedback-detail">${feedbackDetails(q, answer.value)}</div>
        </div>
      </details>`;
    }).join('');

    const retryIds = ui.quiz.questionIds.filter(id => ui.quiz.answers[id]?.status !== 'correct');

    return `
      <section class="results-hero nb-card">
        <span class="badge">Résultat final</span>
        <h1>${safe(scoreMessage(pct))}</h1>
        <div class="results-score">${pct}%</div>
        <p><strong>${safe(ui.quiz.title)}</strong> · ${total} questions terminées.</p>
        <div class="btn-row">
          <button class="btn btn--dark" data-action="home">Retour à l'accueil</button>
          <button class="btn" data-action="syntheses">Revenir aux synthèses</button>
          <button class="btn" data-action="restart-finished">Refaire tout le quiz</button>
          ${retryIds.length ? `<button class="btn btn--pink" data-action="retry-errors">Refaire mes ${retryIds.length} erreur(s)</button>` : ''}
        </div>
      </section>

      <section class="results-grid">
        <div class="result-stat nb-card accent-mint"><strong>${correct}</strong>Correctes</div>
        <div class="result-stat nb-card accent-red"><strong>${incorrect}</strong>Incorrectes</div>
        <div class="result-stat nb-card accent-yellow"><strong>${skipped}</strong>Passées</div>
        <div class="result-stat nb-card accent-cyan"><strong>${total}</strong>Total</div>
      </section>

      <div class="section-title"><div><h2>Résultat par thème</h2></div><p>Commence par retravailler les thèmes où le pourcentage est le plus faible.</p></div>
      <section class="theme-results">${themeStats}</section>

      <div class="section-title"><div><h2>Récapitulatif</h2></div><p>Ouvre une question pour relire la réponse et son explication détaillée.</p></div>
      <div class="filter-row">
        ${[['errors','Erreurs et questions passées'],['all','Toutes'],['correct','Correctes'],['incorrect','Incorrectes'],['skipped','Passées']].map(([id,label]) => `<button class="btn btn--small ${ui.reviewFilter === id ? 'is-active' : ''}" data-action="filter-review" data-filter="${id}">${label}</button>`).join('')}
      </div>
      <section class="review-list">${reviewItems || '<div class="nb-card empty-state"><h2>Rien à afficher ici 🎉</h2></div>'}</section>
      <p class="footer-note">Les résultats restent enregistrés uniquement dans ce navigateur.</p>`;
  }

  function synthesisById(id) {
    return (DATA.syntheses || []).find(s => s.id === id) || null;
  }

  function synthesisForTheme(themeId) {
    return (DATA.syntheses || []).find(s => (s.themeIds || []).includes(themeId)) || (DATA.syntheses || [])[0] || null;
  }

  function synthesesIndexMarkup() {
    const cards = (DATA.syntheses || []).map((chapter, index) => `
      <article class="synthesis-card nb-card">
        <span class="badge">Chapitre ${index + 1}</span>
        <h3>${safe(chapter.title)}</h3>
        <p>${safe(chapter.intro)}</p>
        <button class="btn" data-action="open-synthesis" data-synthesis="${safe(chapter.id)}">Lire</button>
      </article>
    `).join('');

    return `
      <header class="topbar">
        <button class="btn btn--small" data-action="home">← Accueil</button>
        <div class="topbar__title"><strong>Synthèses de cours</strong><span>Réviser avant les tests</span></div>
        <button class="btn btn--small" data-action="start-general">Grand test</button>
      </header>
      <section class="hero nb-card hero--compact">
        <span class="hero__eyebrow">Cours CyberCitizen</span>
        <h1>Synthèses</h1>
        <p>Des rappels courts, structurés et orientés bons réflexes. Chaque chapitre renvoie vers un quiz lié.</p>
      </section>
      <section class="synthesis-grid">${cards}</section>`;
  }

  function synthesisDetailMarkup() {
    const chapters = DATA.syntheses || [];
    const chapter = synthesisById(ui.synthesisId) || chapters[0];
    if (!chapter) return '<div class="nb-card empty-state"><h2>Aucune synthèse disponible</h2><button class="btn" data-action="home">Accueil</button></div>';
    const index = chapters.findIndex(s => s.id === chapter.id);
    const quizTheme = (chapter.themeIds || [])[0];
    const sectionList = (title, items) => items?.length ? `
      <section class="lesson-section">
        <h2>${safe(title)}</h2>
        <ul>${items.map(item => `<li>${safe(item)}</li>`).join('')}</ul>
      </section>` : '';

    return `
      <header class="topbar">
        <button class="btn btn--small" data-action="syntheses">← Index</button>
        <div class="topbar__title"><strong>${safe(chapter.title)}</strong><span>Chapitre ${index + 1} / ${chapters.length}</span></div>
        <button class="btn btn--small" data-action="home">Accueil</button>
      </header>
      <article class="lesson nb-card">
        <span class="badge">Synthèse</span>
        <h1>${safe(chapter.title)}</h1>
        <p class="lesson-lead">${safe(chapter.intro)}</p>
        ${sectionList('Définitions principales', chapter.definitions)}
        ${sectionList('Notions importantes', chapter.keyPoints)}
        ${sectionList('Bonnes pratiques', chapter.goodPractices)}
        ${sectionList('Erreurs fréquentes', chapter.commonMistakes)}
        ${chapter.scenario ? `<section class="lesson-section lesson-scenario"><h2>Situation concrète</h2><p>${safe(chapter.scenario)}</p></section>` : ''}
        ${chapter.remember ? `<aside class="lesson-box lesson-box--remember"><strong>À retenir</strong><p>${safe(chapter.remember)}</p></aside>` : ''}
        ${chapter.trap ? `<aside class="lesson-box lesson-box--trap"><strong>Attention au piège</strong><p>${safe(chapter.trap)}</p></aside>` : ''}
        ${sectionList('Vocabulaire', chapter.vocabulary)}
        <div class="btn-row lesson-actions">
          ${index > 0 ? `<button class="btn" data-action="open-synthesis" data-synthesis="${safe(chapters[index - 1].id)}">← Chapitre précédent</button>` : ''}
          ${quizTheme ? `<button class="btn btn--dark" data-action="start-theme" data-theme="${safe(quizTheme)}">Tester mes connaissances</button>` : ''}
          ${index < chapters.length - 1 ? `<button class="btn btn--yellow" data-action="open-synthesis" data-synthesis="${safe(chapters[index + 1].id)}">Chapitre suivant →</button>` : ''}
        </div>
      </article>`;
  }

  function modalMarkup() {
    if (!ui.modal) return '';
    if (ui.modal.type === 'resume') {
      const done = completedCount(ui.modal.existing);
      return `<div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal nb-card">
        <h2 id="modal-title">Quiz déjà commencé</h2>
        <p>Tu as déjà terminé ${done} question(s) sur ${ui.modal.questionIds.length}. Tu peux reprendre ou recommencer à zéro.</p>
        <div class="btn-row"><button class="btn btn--dark" data-action="confirm-resume">Reprendre</button><button class="btn btn--red" data-action="confirm-restart-launch">Recommencer</button><button class="btn" data-action="close-modal">Annuler</button></div>
      </div></div>`;
    }
    if (ui.modal.type === 'reset-current') {
      return `<div class="modal-backdrop" role="dialog" aria-modal="true"><div class="modal nb-card"><h2>Recommencer ce quiz ?</h2><p>Toutes les réponses enregistrées pour ce quiz seront effacées.</p><div class="btn-row"><button class="btn btn--red" data-action="confirm-reset-current">Oui, recommencer</button><button class="btn" data-action="close-modal">Annuler</button></div></div></div>`;
    }
    if (ui.modal.type === 'reset-all') {
      return `<div class="modal-backdrop" role="dialog" aria-modal="true"><div class="modal nb-card"><h2>Tout réinitialiser ?</h2><p>La progression de tous les quiz sera supprimée de ce navigateur.</p><div class="btn-row"><button class="btn btn--red" data-action="confirm-reset-all">Oui, tout effacer</button><button class="btn" data-action="close-modal">Annuler</button></div></div></div>`;
    }
    return '';
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
                        : homeMarkup();
    app.innerHTML = viewMarkup + modalMarkup();
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
        showToast("Choisis d'abord un élément dans la colonne de gauche.");
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
    svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
    svg.innerHTML = '';
    Object.entries(value).forEach(([leftId, rightId]) => {
      const left = board.querySelector(`[data-match-left="${CSS.escape(leftId)}"]`);
      const right = board.querySelector(`[data-match-right="${CSS.escape(rightId)}"]`);
      if (!left || !right) return;
      const lr = left.getBoundingClientRect();
      const rr = right.getBoundingClientRect();
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', lr.right - rect.left + 9);
      line.setAttribute('y1', lr.top - rect.top + lr.height / 2);
      line.setAttribute('x2', rr.left - rect.left - 9);
      line.setAttribute('y2', rr.top - rect.top + rr.height / 2);
      svg.appendChild(line);
    });
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
  }

  function attachDynamicEvents() {
    attachOrderDrag();
  }

  app.addEventListener('change', event => {
    const target = event.target.closest('[data-question-input]');
    if (target) updateDraftFromInput(target);
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
      launchQuiz('general', 'Grand test Cyber Training', activeQuestionIds(), 'Tous les thèmes');
      return;
    }
    if (action === 'start-mode') {
      const mode = (DATA.testModes || []).find(item => item.id === button.dataset.mode);
      if (mode) launchQuiz(mode.id, mode.title, modeQuestionIds(mode), mode.description);
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

    if (action === 'start-general') {
      launchQuiz('general', 'Grand test Cyber Training', DATA.questions.map(q => q.id), 'Tous les thèmes');
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
      const { id, title, subtitle, questionIds } = ui.quiz;
      deleteQuiz(id);
      ui.quiz = createQuiz(id, title, questionIds, subtitle);
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
      showToast('Toute la progression a été supprimée.');
      render(true);
    }
    if (action === 'close-modal') {
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
      ui.quiz = createQuiz(modal.id, modal.title, modal.questionIds, modal.subtitle);
      ui.view = 'quiz';
      ui.modal = null;
      saveQuiz();
      render(true);
    }
    if (action === 'restart-finished') {
      const { id, title, subtitle, questionIds } = ui.quiz;
      deleteQuiz(id);
      ui.quiz = createQuiz(id, title, questionIds, subtitle);
      ui.view = 'quiz';
      saveQuiz();
      render(true);
    }
    if (action === 'retry-errors') {
      if (ui.quiz) {
        const ids = ui.quiz.questionIds.filter(id => ui.quiz.answers[id]?.status !== 'correct');
        const id = `retry-${Date.now()}`;
        ui.quiz = createQuiz(id, `Révision des ${ids.length} erreur(s)`, ids, 'Questions incorrectes ou passées');
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

  window.addEventListener('resize', () => {
    if (ui.view === 'quiz' && currentQuestion()?.type === 'matching') drawMatchLines();
  });

  render(true);
})();