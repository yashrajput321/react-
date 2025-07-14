import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  console.log("theme: ",theme)

  console.log(window.matchMedia('(prefers-color-scheme: dark)').matches)

  const onSystem =()=>{
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        setTheme('dark')
    }else{
        setTheme('light')
    }
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => setTheme('light')} className={theme === 'light' ? 'font-bold underline' : ''}>Light</button>
      <button onClick={() => setTheme('dark')} className={theme === 'dark' ? 'font-bold underline' : ''}>Dark</button>
      <button onClick={() => onSystem()} className={theme === 'system' ? 'font-bold underline' : ''}>System</button>
    </div>
  );
}
