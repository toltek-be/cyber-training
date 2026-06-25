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
  const QUESTION_BY_ID = new Map(DATA.questions.map(q => [q.id, q]));

  const ui = {
    view: 'home',
    quiz: null,
    modal: null,
    activeMatchLeft: null,
    reviewFilter: 'errors',
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
    [...Array(localStorage.length)].forEach((_, index) => {
      const key = localStorage.key(index);
      if (key?.startsWith(STORAGE_PREFIX)) localStorage.removeItem(key);
    });
    // The previous loop can skip keys after deletion, so make a second safe pass.
    Object.keys(localStorage).filter(k => k.startsWith(STORAGE_PREFIX)).forEach(k => localStorage.removeItem(k));
  }

  function createQuiz(id, title, questionIds, subtitle = '') {
    return {
      id,
      title,
      subtitle,
      questionIds,
      currentIndex: 0,
      answers: {},
      drafts: {},
      streak: 0,
      startedAt: Date.now(),
      updatedAt: Date.now(),
      completedAt: null,
    };
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
    return DATA.questions.filter(q => q.theme === themeId).map(q => q.id);
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

  function homeMarkup() {
    const saved = listSavedQuizzes();
    const incomplete = saved.find(q => !q.completedAt && completedCount(q) < q.questionIds.length);
    const generalSaved = readQuiz('general');
    const generalCompleted = generalSaved ? completedCount(generalSaved) : 0;
    const totalCertification = DATA.questions.filter(q => q.certification).length;

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
          <button class="btn" data-action="start-theme" data-theme="${safe(id)}">${safe(buttonText)}</button>
        </article>`;
    }).join('');

    return `
      <section class="hero nb-card">
        <span class="hero__eyebrow">Formation CyberCitizen · Révision TOSA</span>
        <h1>Cyber<br>Training</h1>
        <p>Un grand quiz complet et des entraînements par thème. Les corrections apparaissent immédiatement et chaque erreur devient une mini-fiche de révision.</p>
        <div class="hero__stats">
          <span class="stat-pill">${DATA.questions.length} questions</span>
          <span class="stat-pill">${Object.keys(DATA.themes).length} thèmes</span>
          <span class="stat-pill">${totalCertification} questions style certification</span>
        </div>
      </section>

      <section class="home-actions">
        <article class="action-card action-card--general nb-card">
          <h2>Le grand test</h2>
          <p>Toutes les questions, tous les thèmes, toutes les questions inspirées des captures de certification. La progression est sauvegardée automatiquement sur cet appareil.</p>
          <div class="action-card__meta">
            <span class="badge">${DATA.questions.length} questions</span>
            <span class="badge">Correction directe</span>
            ${generalCompleted ? `<span class="badge">Progression : ${generalCompleted}/${DATA.questions.length}</span>` : ''}
          </div>
          <button class="btn btn--dark" data-action="start-general">${generalSaved && !generalSaved.completedAt ? 'Reprendre le grand test' : 'Commencer le grand test'}</button>
        </article>

        ${incomplete ? `
          <article class="action-card action-card--continue nb-card">
            <h3>Continuer</h3>
            <p><strong>${safe(incomplete.title)}</strong><br>${completedCount(incomplete)} question(s) terminée(s) sur ${incomplete.questionIds.length}.</p>
            <button class="btn" data-action="resume-latest" data-id="${safe(incomplete.id)}">Reprendre là où j’en étais</button>
          </article>` : `
          <article class="action-card nb-card nb-card--soft">
            <h3>Progression locale</h3>
            <p>Aucun compte et aucune donnée envoyée : les réponses restent uniquement dans le navigateur.</p>
            <span class="badge">100 % local</span>
          </article>`}
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
    if (!ui.quiz.drafts[q.id]) {
      if (q.type === 'multiple') ui.quiz.drafts[q.id] = [];
      if (q.type === 'tf-grid' || q.type === 'fill' || q.type === 'matching') ui.quiz.drafts[q.id] = {};
      if (q.type === 'order') ui.quiz.drafts[q.id] = q.correctOrder.slice().reverse();
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
    return `<div class="options">${q.options.map(opt => {
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
    const answer = getAnswer(q);
    return `
      <div class="table-scroll">
        <table class="tf-table">
          <thead><tr><th>Affirmation</th><th>Vrai</th><th>Faux</th></tr></thead>
          <tbody>${q.statements.map(s => {
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
    const parts = q.template.split(/(\{\{[^}]+\}\})/g);
    const html = parts.map(part => {
      const match = part.match(/^\{\{([^}]+)\}\}$/);
      if (!match) return safe(part);
      const id = match[1];
      const blank = blankMap.get(id);
      const chosen = value?.[id] || '';
      const cls = locked ? (chosen === blank.correct ? 'is-correct' : 'is-wrong') : '';
      return `<select class="fill-select ${cls}" data-question-input="fill" data-blank="${safe(id)}" ${locked ? 'disabled' : ''} aria-label="Mot à sélectionner">
        <option value="">Choisir…</option>
        ${blank.choices.map(choice => `<option value="${safe(choice)}" ${chosen === choice ? 'selected' : ''}>${safe(choice)}</option>`).join('')}
      </select>`;
    }).join('');
    return `<div class="fill-text">${html}</div>`;
  }

  function rightItemsFor(q) {
    return q.pairs.map(p => ({ id: p.rightId, label: p.right })).reverse();
  }

  function renderMatching(q, locked, value) {
    const rightItems = rightItemsFor(q);
    const correctnessByLeft = {};
    q.pairs.forEach(p => {
      if (locked) correctnessByLeft[p.leftId] = value?.[p.leftId] === p.rightId;
    });
    return `
      <div class="match-board" data-match-board="${safe(q.id)}">
        <svg class="match-lines" aria-hidden="true"></svg>
        <div class="match-column">
          ${q.pairs.map(p => {
            const linked = Boolean(value?.[p.leftId]);
            const active = ui.activeMatchLeft === p.leftId;
            const resultClass = locked ? (correctnessByLeft[p.leftId] ? 'is-correct' : 'is-wrong') : '';
            return `<button type="button" class="match-item ${active ? 'is-active' : ''} ${linked ? 'is-linked' : ''} ${resultClass}" data-side="left" data-match-left="${safe(p.leftId)}" ${locked ? 'disabled' : ''}>${safe(p.left)}</button>`;
          }).join('')}
        </div>
        <div class="match-column">
          ${rightItems.map(r => {
            const linked = Object.values(value || {}).includes(r.id);
            return `<button type="button" class="match-item ${linked ? 'is-linked' : ''}" data-side="right" data-match-right="${safe(r.id)}" ${locked ? 'disabled' : ''}>${safe(r.label)}</button>`;
          }).join('')}
        </div>
      </div>
      ${!locked ? '<p><strong>Mode d’emploi :</strong> cliquez sur un élément à gauche, puis sur sa description à droite.</p>' : ''}`;
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
        const ok = chosenId === p.rightId;
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
        : ['Pas tout à fait…', 'Le piège était bien caché.', 'À retenir pour la prochaine fois !'][Math.abs(hashCode(q.id)) % 3];
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
            <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}"><div class="progress-fill" style="width:${percent}%"></div></div>
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
            <h3>Vue d’ensemble</h3>
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
    if (q.type === 'matching') return q.pairs.every(p => Boolean(draft?.[p.leftId])) && new Set(Object.values(draft)).size === q.pairs.length;
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
    if (q.type === 'matching') return q.pairs.every(p => value?.[p.leftId] === p.rightId);
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
      showToast('Correction affichée : prends le temps de lire l’explication.');
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
    if (pct >= 75) return 'Très solide : quelques révisions ciblées et c’est carré.';
    if (pct >= 60) return 'Bonne base. Les erreurs ci-dessous vont faire gagner les derniers points.';
    if (pct >= 40) return 'Ça progresse : refais d’abord les thèmes les plus faibles.';
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
      return `<div class="theme-result nb-card"><strong>${safe(theme.emoji)} ${safe(theme.name)}</strong><span>${ok}/${ids.length} · ${p}%</span><div class="theme-result__bar"><div class="theme-result__fill" style="width:${p}%"></div></div></div>`;
    }).join('');

    const filteredIds = ui.quiz.questionIds.filter(id => {
      const status = ui.quiz.answers[id]?.status;
      if (ui.reviewFilter === 'all') return true;
      if (ui.reviewFilter === 'errors') return status === 'incorrect' || status === 'skipped';
      return status === ui.reviewFilter;
    });

    const reviewItems = filteredIds.map((id, index) => {
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
          <button class="btn btn--dark" data-action="home">Retour à l’accueil</button>
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
    app.innerHTML = (ui.view === 'home' ? homeMarkup() : ui.view === 'quiz' ? quizMarkup() : resultsMarkup()) + modalMarkup();
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
      ui.activeMatchLeft = target.dataset.matchLeft;
      renderPreserveScroll();
      return;
    }
    if (target.dataset.matchRight) {
      if (!ui.activeMatchLeft) {
        showToast('Choisis d’abord un élément dans la colonne de gauche.');
        return;
      }
      const rightId = target.dataset.matchRight;
      Object.keys(draft).forEach(leftId => {
        if (draft[leftId] === rightId) delete draft[leftId];
      });
      draft[ui.activeMatchLeft] = rightId;
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
    if (action === 'previous' && ui.quiz.currentIndex > 0) {
      ui.quiz.currentIndex -= 1;
      ui.activeMatchLeft = null;
      saveQuiz();
      render(true);
    }
    if (action === 'next' && ui.quiz.currentIndex < ui.quiz.questionIds.length - 1) {
      ui.quiz.currentIndex += 1;
      ui.activeMatchLeft = null;
      saveQuiz();
      render(true);
    }
    if (action === 'go-question') {
      ui.quiz.currentIndex = Number(button.dataset.index);
      ui.activeMatchLeft = null;
      saveQuiz();
      render(true);
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
      resumeQuiz(ui.modal.existing);
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
      const ids = ui.quiz.questionIds.filter(id => ui.quiz.answers[id]?.status !== 'correct');
      const id = `retry-${Date.now()}`;
      ui.quiz = createQuiz(id, `Révision des ${ids.length} erreur(s)`, ids, 'Questions incorrectes ou passées');
      ui.view = 'quiz';
      saveQuiz();
      render(true);
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
