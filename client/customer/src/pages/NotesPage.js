import { useEffect } from "react";
import CreateForm from "../components/CreateForm";
import Notes from "../components/Notes";
import UpdateForm from "../components/UpdateForm";
import notesStore from "../stores/notesStore";

export default function NotesPage() {
  const store = notesStore();
  useEffect(() => {
    store.fetchNotes();
  }, []);
  return (
    <div>
    
      <Notes />
      <UpdateForm />
      <CreateForm />
    </div>
  );
}
