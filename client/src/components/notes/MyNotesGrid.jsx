import MyNoteCard from "./MyNoteCard";

const MyNotesGrid = ({ notes, onDelete, deletingId }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <MyNoteCard
          key={note._id}
          note={note}
          onDelete={onDelete}
          deleting={deletingId === note._id}
        />
      ))}
    </div>
  );
};

export default MyNotesGrid;