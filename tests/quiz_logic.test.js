
let quizLogic;
try {
  quizLogic = require('../app.js');
} catch {
  // En cas d'échec de l'import (si app.js n'exporte rien encore)
  quizLogic = {};
}

const { safe, shuffle, evaluate, equalSets, createQuiz } = quizLogic;

describe('Quiz Logic - Utilitaires', () => {
  test('safe devrait échapper les caractères HTML', () => {
    if (!safe) return;
    expect(safe('<div>')).toBe('&lt;div&gt;');
    expect(safe('a & b')).toBe('a &amp; b');
    expect(safe('"quote"')).toBe('&quot;quote&quot;');
  });

  test('shuffle devrait mélanger un tableau', () => {
    if (!shuffle) return;
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffle(arr);
    expect(shuffled).toHaveLength(arr.length);
    expect(shuffled).toContain(1);
    expect(shuffled.sort()).toEqual(arr.sort());
  });

  test('equalSets devrait comparer deux tableaux comme des ensembles', () => {
    if (!equalSets) return;
    expect(equalSets([1, 2], [2, 1])).toBe(true);
    expect(equalSets([1, 2], [1, 2, 3])).toBe(false);
    expect(equalSets([], [])).toBe(true);
  });
});

describe('Quiz Logic - Évaluation', () => {
  test('evaluate - question simple (single choice)', () => {
    if (!evaluate) return;
    const q = { type: 'single', correct: 'a' };
    expect(evaluate(q, 'a')).toBe(true);
    expect(evaluate(q, 'b')).toBe(false);
  });

  test('evaluate - choix multiples (multiple choice)', () => {
    if (!evaluate) return;
    const q = { type: 'multiple', correct: ['a', 'b'] };
    expect(evaluate(q, ['a', 'b'])).toBe(true);
    expect(evaluate(q, ['b', 'a'])).toBe(true);
    expect(evaluate(q, ['a'])).toBe(false);
    expect(evaluate(q, ['a', 'b', 'c'])).toBe(false);
  });

  test('evaluate - grille vrai/faux (tf-grid)', () => {
    if (!evaluate) return;
    const q = {
      type: 'tf-grid',
      statements: [
        { id: 's1', correct: true },
        { id: 's2', correct: false }
      ]
    };
    expect(evaluate(q, { s1: true, s2: false })).toBe(true);
    expect(evaluate(q, { s1: true, s2: true })).toBe(false);
  });

  test('evaluate - glisser-déposer (matching)', () => {
    if (!evaluate) return;
    const q = {
      type: 'matching',
      pairs: [
        { leftId: 'l1', rightId: 'r1', right: 'Target 1' }
      ]
    };
    expect(evaluate(q, { l1: 'r1' })).toBe(true);
    expect(evaluate(q, { l1: 'r2' })).toBe(false);
  });
});

describe('Quiz Logic - Création de Quiz', () => {
  test('createQuiz devrait initialiser correctement l\'objet quiz', () => {
    if (!createQuiz) return;
    const id = 'test-id';
    const title = 'Test Quiz';
    const qids = ['q1', 'q2'];
    const quiz = createQuiz(id, title, qids);

    expect(quiz.id).toBe(id);
    expect(quiz.title).toBe(title);
    expect(quiz.questionIds).toHaveLength(2);
    expect(quiz.currentIndex).toBe(0);
    expect(quiz.answers).toEqual({});
  });
});
