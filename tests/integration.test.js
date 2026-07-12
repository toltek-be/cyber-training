
const { init } = require('../app.js');

describe('Test d\'intégration Quiz', () => {
  beforeEach(() => {
    // Initialisation du DOM
    document.body.innerHTML = `
      <main id="app"></main>
      <footer id="global-footer">
        <div id="wcb"></div>
        <p id="footer-note"></p>
      </footer>
      <div id="toast-region"></div>
      <div id="confetti-layer"></div>
    `;

    // Mock de window.scrollTo (non implémenté par JSDOM)
    window.scrollTo = jest.fn();

    // Mock de localStorage
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

    // Mock de fetch pour les 6 appels de données
    global.fetch = jest.fn((url) => {
      let data = {};
      if (url.includes('questions.json')) {
        data = { 
          questions: [{ id: 'q1', prompt: 'Question Test', type: 'single', correct: 'a', options: [{id:'a', label:'R1'}], active: true, theme: 't1' }],
          themes: { t1: { name: 'Thème Test', emoji: '🔍' } }
        };
      } else if (url.includes('test-modes.json')) {
        data = { testModes: [] };
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
            hero: { title: 'Cyber<br>Training', eyebrow: 'eyebrow', description: 'description', stats: { certification: 'certification' } },
            resources: { title: 'title', syntheses: { badge: 'badge', title: 'title', description: 'description', button: 'button' }, organismes: { title: 'title', description: 'description', button: 'button' }, tools: { title: 'title', description: 'description', button: 'button' } },
            test_modes: { title: 'title', description: 'description' },
            grand_test: { title: 'title', description: 'description', start: 'start', correction_directe: 'correction_directe' },
            local_progression: { title: 'title', description: 'description', badge: 'badge' },
            themes: { title: 'title', subtitle: 'subtitle', read_synthesis: 'read_synthesis', launch_count: 'launch_count' },
            reset: { title: 'title', button: 'button' }
          },
          footer: { text: 'text', credits: 'credits' }
        };
      }

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data),
      });
    });
  });

  test('L\'application devrait démarrer et afficher le titre', async () => {
    await init();
    
    const app = document.getElementById('app');
    // Vérifie que le titre principal est présent
    expect(app.innerHTML).toContain('Cyber');
    expect(app.innerHTML).toContain('Training');
    
    // Vérifie que le thème mocké est affiché
    expect(app.innerHTML).toContain('Thème Test');
  });

  test('L\'application devrait afficher une erreur si fetch échoue', async () => {
    // Espionner console.error pour éviter de polluer la sortie du test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
    
    await init();
    
    const app = document.getElementById('app');
    expect(app.innerHTML).toContain('Erreur');
    expect(app.innerHTML).toContain('données sont introuvables');
    
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
