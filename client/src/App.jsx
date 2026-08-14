import { NoteProvider } from "./context/NoteContext";
import AppRoutes from "./routers/AppRoutes";

function App() {
  return (
    <NoteProvider>
      <AppRoutes />
    </NoteProvider>
  );
}

export default App;