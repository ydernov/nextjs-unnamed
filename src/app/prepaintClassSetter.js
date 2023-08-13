export const init = `
    const themeValue = localStorage?.theme;
    if (typeof window !== "undefined") {
        if (
        themeValue === "dark" ||
        ((themeValue === "system" || !themeValue) &&
        window?.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {

            document.documentElement.classList.add("dark");
        } else {
             document.documentElement.classList.remove("dark");
        }
    }`;
