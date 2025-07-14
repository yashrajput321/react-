import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">React + Tailwind Theme Switcher</h1>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default App;
