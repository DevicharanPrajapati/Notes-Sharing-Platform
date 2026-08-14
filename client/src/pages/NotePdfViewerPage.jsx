import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useNotes } from "../context/NoteContext";

const NotePdfViewerPage = () => {
  const { id } = useParams();
  const { getNoteViewUrl } = useNotes();

  const pdfUrl = getNoteViewUrl(id);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="flex items-center border-b border-gray-200 bg-white px-4 py-4">
        <Link
          to={`/notes/${id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back to Note
        </Link>
      </div>

      <div className="h-[calc(100vh-65px)] w-full">
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          className="h-full w-full border-0"
        />
      </div>
    </main>
  );
};

export default NotePdfViewerPage;