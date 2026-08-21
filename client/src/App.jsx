import { AdminProvider } from "./context/AdminContext";
import { CategoryProvider } from "./context/CategoryContext";
import { NoteProvider } from "./context/NoteContext";
import { SavedNoteProvider } from "./context/SavedNoteContext";
import AppRoutes from "./routers/AppRoutes";

function App() {
  return (
    <AdminProvider>
      <SavedNoteProvider >
      <CategoryProvider>
        <NoteProvider>
          <AppRoutes />
        </NoteProvider>
      </CategoryProvider>
      </SavedNoteProvider>
    </AdminProvider>
  );
}

export default App;
