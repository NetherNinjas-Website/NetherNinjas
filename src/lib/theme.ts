export const THEME_STORAGE_KEY = "theme";

/**
 * Runs before the page paints (see app/layout.tsx) so there is no flash of the
 * wrong theme: saved choice first, otherwise the system preference.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`;
