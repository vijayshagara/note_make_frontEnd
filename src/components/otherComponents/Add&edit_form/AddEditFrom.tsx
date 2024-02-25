import React, { ChangeEvent, useRef,useEffect} from 'react';
import { useParams, } from 'react-router-dom';
import './AddEditFrom.css'
import { singleNotes } from '../../../service/api/Notes';

interface Payload {
  title: string;
  notes: string;
  color:string
}

interface Note {
  id: string;

}

interface AddEditFromProps {
  setNotePayload: React.Dispatch<React.SetStateAction<Payload>>;
  notePayload: Payload;
  dataFromChild:Note
}

const AddEditFrom: React.FC<AddEditFromProps> = ({ setNotePayload,notePayload,dataFromChild }) => {
  const inputRefTitle = useRef<HTMLInputElement>(null);
  const inputRefNotes = useRef<HTMLTextAreaElement>(null);
  const params = useParams()

  const handleChange = ({ e, type }: { e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>; type: keyof Payload }) => {    
    setNotePayload((prevNotePayloads) => {
      const updatedNotePayloads = { ...prevNotePayloads };
      if (type === 'title') {
        updatedNotePayloads.title = e.target.value;
      }

      if (type === 'notes') {
        updatedNotePayloads.notes = e.target.value;
      }
      return updatedNotePayloads;
    });
  };

  const clearInputValues = () => {
    if (inputRefTitle.current) {
      inputRefTitle.current.value = '';
    }
  
    if (inputRefNotes.current) {
      inputRefNotes.current.value = '';
    }
  };
  
  useEffect(() => {
   if(dataFromChild && dataFromChild.id){
     clearInputValues()
    }
  }, [dataFromChild]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (params && params.id) {
        const response:any = await singleNotes(params.id);
        setNotePayload(response)
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div>
      {notePayload ? ( <div>
      <input
        name="title"
        ref={inputRefTitle}
        className="form-control form-control-input form-control-lg"
        onChange={(e) => handleChange({ e, type: "title" })}
        style={{ fontSize: '50px' }}
        type="text"
        placeholder="Enter your title"
        value={notePayload.title}
      />
      <textarea
        ref={inputRefNotes}
        name="notes"
        className="form-control form-control-text form-control-sm"
        onChange={(e) => handleChange({ e, type: "notes" })}
        style={{ fontSize: '35px', height: '50vh' }}
        placeholder="Enter your notes"
        value={notePayload.notes}
      ></textarea>
    </div>) : ( <div>
      <input
        name="title"
        ref={inputRefTitle}
        className="form-control form-control-input form-control-lg"
        onChange={(e) => handleChange({ e, type: "title" })}
        style={{ fontSize: '50px' }}
        type="text"
        placeholder="Enter your title"
      />
      <textarea
        ref={inputRefNotes}
        name="notes"
        className="form-control form-control-text form-control-sm"
        onChange={(e) => handleChange({ e, type: "notes" })}
        style={{ fontSize: '35px', height: '50vh' }}
        placeholder="Enter your notes"
      ></textarea>
    </div>)}
     
    </div>
  );
};

export default AddEditFrom;
