import { CategoryProvider } from "./context/CategoryContext";
import { NoteProvider } from "./context/NoteContext";
import AppRoutes from "./routers/AppRoutes";

function App() {
  return (
    <CategoryProvider>
      <NoteProvider>
        <AppRoutes />
      </NoteProvider>
    </CategoryProvider>
  );
}

export default App;
