import { AdminProvider } from "./context/AdminContext";
import { CategoryProvider } from "./context/CategoryContext";
import { NoteProvider } from "./context/NoteContext";
import AppRoutes from "./routers/AppRoutes";

function App() {
  return (
    <AdminProvider>
      <CategoryProvider>
        <NoteProvider>
          <AppRoutes />
        </NoteProvider>
      </CategoryProvider>
    </AdminProvider>
  );
}

export default App;
