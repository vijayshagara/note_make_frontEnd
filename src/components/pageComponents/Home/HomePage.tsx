import Nav from "../../otherComponents/Nav/Nav";
import BasicCard from "../../otherComponents/Card/Card";
import BasicPagination from "../../otherComponents/Pagination/Pagination";
import {useState,
  // useContext 
} from 'react';
// import PopupModel from "../../otherComponents/Model/PopupModel";
// import StateContext from "../../contexts/StateContext";
// import DispatchContext from "../../contexts/DispatchContext";
interface Note {
  _id: string; // Adjust this based on the actual property name from your API
  title: string;
  notes: string;
  isActive: boolean;
}

const HomePage: React.FC = () => {
  const [notesData, setNotesData] = useState<Note[]>([]);
  const [searchNotesData, setsearchNotesData] = useState('');
  // const appState = useContext(StateContext)
  // const appDispatch = useContext(DispatchContext)
  // console.log(appState);
  
  
  return (
    <div>
      <Nav setsearchNotesData={setsearchNotesData}/>
      <BasicCard data={notesData}/>
      <BasicPagination setNotesData={setNotesData} searchNotesData={searchNotesData}/>
    </div>
  );
}

export default HomePage;
