import notesStore from "../stores/notesStore";

export default function UpdateForm() {
    const store = notesStore();
  if (!store.updateForm._id) return <></>;

  return (
    <div>
      <h2>Update Note</h2>
      <form onSubmit={store.updateNote}>
        <input
          onChange={store.handleUpdate}
          value={store.updateForm.title}
          name="title"
        />
        <textarea
          onChange={store.handleUpdate}
          value={store.updateForm.body}
          name="body"
        />
        <button type="submit">Update Note</button>
      </form>
    </div>
  );
}
