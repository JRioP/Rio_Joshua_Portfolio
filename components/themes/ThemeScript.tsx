export const THEME_SCRIPT = `
  (function() {
    try {
      var stored = localStorage.getItem('joshua_rio_theme');
      if (stored === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    } catch (e) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export function ThemeScript() {
  return (
    <script
      id="theme-script"
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  );
}
