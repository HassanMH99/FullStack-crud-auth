import { useState,useEffect, useCallback } from "react";
import axios from 'axios'
function App() {
  const [notes,setNotes] = useState('');
  const [createForm,setCreateForm] = useState({
    title:'',
    body:''
  })
  const [updateForm,setUpdateForm] = useState({
    _id:null,
    title:"",
    body:""
  })

  useEffect(()=>{
    fetchNotes();
  },[])
  const fetchNotes = async()=>{
    const res = await axios.get("http://localhost:5656/notes")
   
    setNotes(res.data.notes)
    
  }

  const updateCreateForm = async(e )=>{
      const {name,value} = e.target;
      setCreateForm({
        ...createForm,
        [name]:value,
      });
  }

  const createNode = async (e)=>{
    e.preventDefault()
    const res = await axios.post('http://localhost:5656/notes',createForm)
    setNotes(res.data.notes)
    setCreateForm({title:"",body:""})
  }
  const deleteNote = async (_id)=>{
    const res =await axios.delete(`http://localhost:5656/notes/${_id}`)
    const newNotes = [...notes].filter(note=>{
      return note._id !==_id;
    })
    setNotes(newNotes)
    console.log(res);
  }
  const handleUpdate = (e)=>{
    e.preventDefault()
    const {value,name}= e.target;
    setUpdateForm({
      ...updateForm,
      [name]:value
    })
  }
  const toogleUpdate= async(note)=>{
    
    setUpdateForm({title:note.title,body:note.body,_id:note._id});
  }
  const updateNote = async(e)=>{
    e.preventDefault()
    const {title,body} = updateForm;
    const res =await axios.put(`http://localhost:5656/notes/${updateForm._id}`,{title,body})
    const newNotes = [...notes];
    const noteIndex = notes.findIndex(note=>{
      return note._id === updateForm._id
    })
    newNotes[noteIndex] = res.data.note;
    setNotes(newNotes);

    setUpdateForm({
      _id:null,
      title:"",
      body:""
    })
  }

  return (
    <div className="App">
        <div>
          <h2>Notes:</h2>
          {notes && notes.map((note)=>{
            return(
              <div key={note._id}>
                <h3>{note.title}</h3>
                <button onClick={()=>deleteNote(note._id)}>Delete Note</button>
                <button onClick={()=>toogleUpdate(note )}>Update Note
                </button>
              </div>
            )
          })}
        </div>

        {!updateForm._id &&(<div>
          <h2>Create Note</h2>
          <form onSubmit={createNode}>
            <input onChange={updateCreateForm} value={createForm.title} name="title"/>
            <textarea onChange={updateCreateForm} value={createForm.body} name="body"/>
            <button type="submit">Create Note</button>
          </form>
        </div>)}

       {updateForm._id &&( 
       <div>
          <h2>Update Note</h2>
          <form  onSubmit={updateNote}>
            <input onChange={handleUpdate} value={updateForm.title} name="title"/>
            <textarea onChange={handleUpdate} value={updateForm.body} name="body"/>
            <button type="submit">Update Note</button>
            </form>
        </div>)}
    </div>
  );
}

export default App;
