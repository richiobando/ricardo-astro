import React from "react";
//3:14
export default function ChangeTheme() {
  
  const setTheme = (themeName) => {
    localStorage.setItem('theme', themeName)
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    document.querySelector('html').setAttribute("data-theme", themeName)
  }
  
  const toggleTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('light')
      setDarkTheme('light')
    }
    else {
      setTheme('dark')
      setDarkTheme('dark')
    }
  }


  const [darkTheme, setDarkTheme] = useState("dark");
  
  return (
    <div onClick={toggleTheme}>
      {darkTheme?<span>🌚 </span>: <span>🌞</span>}
    </div>
  );
}
