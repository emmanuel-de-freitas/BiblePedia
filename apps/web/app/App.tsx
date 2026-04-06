import { Button } from "@heroui/react";
import { Provider } from "@react-spectrum/s2";

function App() {
  return (
    <Provider background="layer-1">
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-4xl font-bold">Hello from @biblepedia/web</h1>
        <p className="text-xl text-gray-600">Vite + React + HeroUI + React Spectrum 2</p>
        <div className="flex gap-2">
          <Button variant="primary">HeroUI Button</Button>
          {/* S2 Button requires specific setup, for now we just show a placeholder */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
             S2 Button (check docs)
          </button>
        </div>
      </div>
    </Provider>
  );
}

export default App;
