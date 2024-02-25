import AddEditNav from "../../otherComponents/Add&edit_nav_bar/add&edit_nav_bar"
import AddEditFrom from "../../otherComponents/Add&edit_form/AddEditFrom"
import './AddEdit.css'
import { useState } from "react"

const AddEdit = () => {
  interface Payload {
    title: string;
    notes: string;
    color:string
  }

  interface Data {
    id: string
  }

  interface Note {
    id: string;
  }

  const initialdata: Data = {
    id: ''
  };

  const [notePayload, setNotePayload] = useState<Payload>({
    title: '',
    notes: '',
    color:''
  });
  const [dataFromChild, setDataFromChild] = useState<Data>(initialdata);
  const handleDataFromChild = (data: Note) => {
    setDataFromChild(data);
  };

  return (
    <div className='add_edit_page'>
      <AddEditNav notePayload={notePayload} onDataFromChild={(data) => handleDataFromChild(data)} />
      <AddEditFrom setNotePayload={setNotePayload} notePayload={notePayload} dataFromChild={dataFromChild} />
    </div>
  )
}

export default AddEdit;
