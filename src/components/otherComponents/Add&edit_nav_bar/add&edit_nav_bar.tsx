import "./add&edit_nav_bar.css";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { addNotes, updateNotes, deleteNotes } from "../../../service/api/Notes";
import { useState, useEffect } from "react";
import PopupModel from "../Model/PopupModel";

interface Payload {
  title: string;
  notes: string;
  color: string
}

interface Note {
  id: string;
}

interface AddEditNavProps {
  notePayload: Payload;
  onDataFromChild: (data: Note) => void;
}

const AddEditNav: React.FC<AddEditNavProps> = ({ notePayload, onDataFromChild }) => {
  const navigation = useNavigate();
  const [conditionNav, setConditionNav] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [colorHideShow, setColorHideShow] = useState(false)

  const { id } = useParams()


  useEffect(() => {
    if (id) {
      setConditionNav(!conditionNav)
    }
  }, [])

  const goBack = () => {
    navigation(-1);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await updateNotes(id, notePayload)
        if (response) {
          setIsModalVisible(!isModalVisible)
        }
      } else {
        console.log('notePayload=======', notePayload);

        const response: any = await addNotes(notePayload);
        if (response) {
          const payloadToUpdateState: Note = {
            id: response.id,
          };
          onDataFromChild(payloadToUpdateState);
          setIsModalVisible(!isModalVisible)
        }
      }
    } catch (error) {
      console.error("Error adding notes:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (id) {
        const response = await deleteNotes(id);
        if (response) {
          setIsModalVisible(!isModalVisible)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleColor = () => {
    setColorHideShow(!colorHideShow)
  }

  const handleChangeColor = (color:string)=>{
  if(color === 'red' ){
    notePayload.color = 'red'
  }
  if(color === 'blue' ){
    notePayload.color = 'blue'
  }
  if(color === 'green' ){
    notePayload.color = 'green'
  }
  if(color === 'yellow' ){
    notePayload.color = 'yellow'
  } 
  }

  return (
    <div>
      <div>
        {conditionNav ? (
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <nav className="navbar navbar-light bg-dark add_edit_nav">
                <div>
                  <i
                    className="bi bi-arrow-left"
                    style={{ fontSize: "60px", color: "white" }}
                    onClick={goBack}
                  ></i>
                </div>
                <div className="nav_icon">
                  <div style={{ flex: 1 }}>
                    <i
                      className="bi bi-pin-angle"
                      style={{ fontSize: "60px", color: "white" }}
                    ></i>
                  </div>
                  <div style={{ flex: 1 }}>
                    <i
                      className="bi bi-palette"
                      style={{ fontSize: "60px", color: "white" }}
                      onClick={handleColor}
                    ></i>
                    {colorHideShow ? (
                      <div>
                        <div>
                        <div onClick={()=>handleChangeColor('red')} style={{ transform: "scale(1)", backgroundColor: "red", display: "inline-block", borderRadius: "50%", padding: "5px" }}>
                          <input type="radio" id="html"  name="fav_language" value="red" style={{ visibility: "hidden" }} />
                        </div>
                        <div onClick={()=>handleChangeColor('blue')} style={{ transform: "scale(1)", backgroundColor: "blue", display: "inline-block", borderRadius: "50%", padding: "5px" }}>
                          <input type="radio" id="html" name="fav_language" value="blue" style={{ visibility: "hidden" }} />
                        </div>
                        <div onClick={()=>handleChangeColor('green')} style={{ transform: "scale(1)", backgroundColor: "green", display: "inline-block", borderRadius: "50%", padding: "5px" }}>
                          <input type="radio" id="html" name="fav_language" value="green" style={{ visibility: "hidden" }} />
                        </div>
                        <div onClick={()=>handleChangeColor('yellow')} style={{ transform: "scale(1)", backgroundColor: "yellow", display: "inline-block", borderRadius: "50%", padding: "5px" }}>
                          <input type="radio" id="html" name="fav_language" value="yellow" style={{ visibility: "hidden" }} />
                        </div>
                        </div>
                      </div>
                    ) : (<></>)}
                  </div>
                  <div
                    style={{ flex: 1, cursor: "pointer" }}
                    onClick={(e) => handleSubmit(e)}
                  >
                    <i
                      className="bi bi-check-square"
                      style={{ fontSize: "60px", color: "white" }}
                    ></i>
                  </div>
                </div>
              </nav>
            </form>
          </div>
        ) : (
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <nav className="navbar navbar-light bg-dark add_edit_nav">
                <div>
                  <i
                    className="bi bi-arrow-left"
                    style={{ fontSize: "60px", color: "white" }}
                    onClick={goBack}
                  ></i>
                </div>
                <div className="nav_icon">
                  <div style={{ flex: 1 }}>
                    <i
                      className="bi bi-trash"
                      onClick={handleDelete}
                      style={{ fontSize: "60px", color: "white" }}
                    ></i>
                  </div>
                  <div
                    style={{ flex: 1, cursor: "pointer" }}
                    onClick={(e) => handleSubmit(e)}
                  >
                    <i
                      className="bi bi-pencil-square"
                      style={{ fontSize: "60px", color: "white" }}
                    ></i>
                  </div>
                </div>
              </nav>
            </form>
          </div>
        )}
      </div>
      <PopupModel isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  );
};

export default AddEditNav;
