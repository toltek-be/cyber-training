
const { init } = require('../app.js');

describe('Mode Examen (avec Timer)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <main id="app"></main>
      <footer id="global-footer">
        <div id="wcb"></div>
        <p id="footer-note"></p>
      </footer>
      <div id="toast-region"></div>
      <div id="confetti-layer"></div>
    `;

    window.scrollTo = jest.fn();

    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
        clear: jest.fn(() => { store = {}; }),
        removeItem: jest.fn(key => { delete store[key]; }),
        key: jest.fn(i => Object.keys(store)[i]),
        get length() { return Object.keys(store).length; }
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    global.fetch = jest.fn((url) => {
      let data = {};
      if (url.includes('questions.json')) {
        data = { 
          questions: [
            { id: 'q1', prompt: 'Q1', type: 'single', correct: 'a', options: [{id:'a', label:'R1'}], active: true, theme: 't1' },
            { id: 'q2', prompt: 'Q2', type: 'single', correct: 'b', options: [{id:'b', label:'R2'}], active: true, theme: 't1' }
          ],
          themes: { t1: { name: 'Thème 1', emoji: '🔍' } }
        };
      } else if (url.includes('test-modes.json')) {
        data = { testModes: [{ id: 'm1', title: 'Mode Exam', timer: 10, button: 'Start Exam', kind: 'random', count: 2 }] };
      } else if (url.includes('syntheses.json')) {
        data = { syntheses: [] };
      } else if (url.includes('organismes.json')) {
        data = { organismes: [] };
      } else if (url.includes('tools.json')) {
        data = { tools: [] };
      } else if (url.includes('ui.json')) {
        data = {
          common: { questions: 'questions', themes: 'thèmes' },
          home: {
            hero: { title: 'T', eyebrow: 'E', description: 'D', stats: { certification: 'C' } },
            resources: { title: 'R', syntheses: { badge: 'B', title: 'T', description: 'D', button: 'B' }, organismes: { title: 'T', description: 'D', button: 'B' }, tools: { title: 'T', description: 'D', button: 'B' } },
            test_modes: { title: 'TM', description: 'D' },
            grand_test: { title: 'GT', description: 'D', start: 'S', correction_directe: 'CD' },
            local_progression: { title: 'LP', description: 'D', badge: 'B' },
            themes: { title: 'T', subtitle: 'S', read_synthesis: 'RS', launch_count: 'LC' },
            reset: { title: 'R', button: 'B' }
          },
          quiz: {
            navigation: { home: 'Home', automatic_save: 'Save', streak: 'Streak' },
            question: { header: { number: 'Q{index}/{total}' } },
            controls: { previous: 'Précédent', next: 'Suivant', validate: 'Valider', skip: 'Passer' },
            sidebar: { title: 'Sidebar' },
            status: { completed: 'Done' }
          },
          footer: { text: 'F', credits: 'C' }
        };
      }

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data),
      });
    });
  });

  test('La sidebar et les boutons précédent/suivant sont masqués en mode timer', async () => {
    await init();
    
    // Trouver et cliquer sur le bouton de lancement du mode exam
    const startButton = Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Start Exam');
    expect(startButton).toBeDefined();
    startButton.click();

    const app = document.getElementById('app');
    
    // Vérifier que nous sommes sur le quiz
    expect(app.innerHTML).toContain('Q1/2');

    // Vérifier l'absence de la sidebar
    expect(app.querySelector('.quiz-sidebar')).toBeNull();
    expect(app.innerHTML).not.toContain('Sidebar');

    // Vérifier l'absence des boutons précédent/suivant
    const prevButton = Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Précédent');
    const nextButton = Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Suivant');
    
    expect(prevButton).toBeUndefined();
    expect(nextButton).toBeUndefined();
    
    // Vérifier que Valider est présent
    const validateButton = Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Valider');
    expect(validateButton).toBeDefined();

    // Vérifier la présence de la classe CSS
    const layout = app.querySelector('.quiz-layout');
    expect(layout.classList.contains('has-no-sidebar')).toBe(true);
  });
});
