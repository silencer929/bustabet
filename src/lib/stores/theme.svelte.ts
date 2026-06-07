import { browser } from '$app/environment';

function createThemeStore() {
  let current = $state<'dark' | 'light'>('dark');

  // Initialize theme from localStorage on client
  if (browser) {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      current = savedTheme;
    }
    applyThemeToDOM(current);
  }

  function applyThemeToDOM(theme: 'dark' | 'light') {
    if (!browser) return;
    const root = document.documentElement;
    // Dark is the default in :root, only add 'light' class if needed
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }

  function toggle() {
    current = current === 'dark' ? 'light' : 'dark';
    if (browser) {
      localStorage.setItem('theme', current);
      applyThemeToDOM(current);
    }
  }

  return { 
    get current() { 
      return current; 
    },
    toggle 
  };
}

export const theme = createThemeStore();