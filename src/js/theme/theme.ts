// 主题管理模块
export type Theme = 'light' | 'dark';

const THEME_KEY = 'bentopdf-theme';

export class ThemeManager {
  private static currentTheme: Theme;

  // 初始化主题
  static init(): void {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    this.applyTheme(this.currentTheme);

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // 获取当前主题
  static getTheme(): Theme {
    return this.currentTheme;
  }

  // 设置主题
  static setTheme(theme: Theme): void {
    this.currentTheme = theme;
    localStorage.setItem(THEME_KEY, theme);
    this.applyTheme(theme);
  }

  // 切换主题
  static toggleTheme(): void {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  // 应用主题到DOM
  private static applyTheme(theme: Theme): void {
    const root = document.documentElement;
    
    if (theme === 'light') {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    } else {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    }

    // 触发自定义事件，通知其他模块主题已更改
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }
}