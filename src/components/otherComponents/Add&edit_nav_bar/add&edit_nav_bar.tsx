import "./add&edit_nav_bar.css";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { addNotes, updateNotes, deleteNotes } from "../../../service/api/Notes";
import { useState, useEffect } from "react";
import PopupModel from "../Model/PopupModel";

interface Payload {
  title: string;
  notes: string;
  color: string;
}

interface Note {
  id: string;
}

interface AddEditNavProps {
  notePayload: Payload;
  onDataFromChild: (data: Note) => void;
}

const AddEditNav: React.FC<AddEditNavProps> = ({
  notePayload,
  onDataFromChild,
}) => {
  const navigation = useNavigate();
  const [conditionNav, setConditionNav] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [colorHideShow, setColorHideShow] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setConditionNav(!conditionNav);
    }
  }, []);

  const goBack = () => {
    navigation(-1);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await updateNotes(id, notePayload);
        if (response) {
          setIsModalVisible(!isModalVisible);
        }
      } else {
        const response: any = await addNotes(notePayload);
        if (response) {
          const payloadToUpdateState: Note = {
            id: response.id,
          };
          onDataFromChild(payloadToUpdateState);
          setIsModalVisible(!isModalVisible);
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
          setIsModalVisible(!isModalVisible);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleColor = () => {
    setColorHideShow(!colorHideShow);
  };

  const handleChangeColor = (color: string) => {
    if (color === "#ffa186") {
      notePayload.color = "#ffa186";
    }
    if (color === "#7bff84") {
      notePayload.color = "#7bff84";
    }
    if (color === "#e2eb90") {
      notePayload.color = "#e2eb90";
    }
    if (color === "#af5982") {
      notePayload.color = "#af5982";
    }
    if (color === "#ffc575") {
      notePayload.color = "#ffc575";
    }
    if (color === "#75d9e7") {
      notePayload.color = "#75d9e7";
    }
    if (color === "#e775da") {
      notePayload.color = "#e775da";
    }
  };

  return (
    <div>
      <div>
        {conditionNav ? (
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <nav className="navbar navbar-light bg-dark">
                <div className="nav_cont">
                  <div>
                    <i
                      className="bi bi-arrow-left"
                      style={{ fontSize: "40px", color: "white" }}
                      onClick={goBack}
                    ></i>
                  </div>
                  <div className="nav_icon">
                    <div style={{ flex: 1 }}>
                      <i
                        className="bi bi-pin-angle"
                        style={{ fontSize: "40px", color: "white" }}
                      ></i>
                    </div>
                    <div style={{ flex: 1 }}>
                      <i
                        className="bi bi-palette"
                        style={{ fontSize: "40px", color: "white" }}
                        onClick={handleColor}
                      ></i>
                    </div>
                    <div
                      style={{ flex: 1, cursor: "pointer" }}
                      onClick={(e) => handleSubmit(e)}
                    >
                      <i
                        className="bi bi-check-square"
                        style={{ fontSize: "40px", color: "#7bff84",}}
                      ></i>
                    </div>
                  </div>
                </div>
                {colorHideShow ? (
                      <div className="color_div">
                        <div
                          onClick={() => handleChangeColor("#ffa186")}
                          style={{
                            transform: "scale(1)",
                            backgroundColor: "#ffa186",
                            display: "inline-block",
                            borderRadius: "100%",
                            padding: "5px",
                          }}
                        >
                          <input
                            type="radio"
                            id="html"
                            name="fav_language"
                            value="#ffa186"
                            style={{ visibility: "hidden" }}
                          />
                        </div>
                        <div
                          onClick={() => handleChangeColor("#7bff84")}
                          style={{
                            transform: "scale(1)",
                            backgroundColor: "#7bff84",
                            display: "inline-block",
                            borderRadius: "50%",
                            padding: "5px",
                          }}
                        >
                          <input
                            type="radio"
                            id="html"
                            name="fav_language"
                            value="#7bff84"
                            style={{ visibility: "hidden" }}
                          />
                        </div>
                        <div
                          onClick={() => handleChangeColor("#ffc575")}
                          style={{
                            transform: "scale(1)",
                            backgroundColor: "#ffc575",
                            display: "inline-block",
                            borderRadius: "50%",
                            padding: "5px",
                          }}
                        >
                          <input
                            type="radio"
                            id="html"
                            name="fav_language"
                            value="#ffc575"
                            style={{ visibility: "hidden" }}
                          />
                        </div>
                        <div
                          onClick={() => handleChangeColor("#e2eb90")}
                          style={{
                            transform: "scale(1)",
                            backgroundColor: "#e2eb90",
                            display: "inline-block",
                            borderRadius: "50%",
                            padding: "5px",
                          }}
                        >
                          <input
                            type="radio"
                            id="html"
                            name="fav_language"
                            value="#e2eb90"
                            style={{ visibility: "hidden" }}
                          />
                        </div>
                        <div
                          onClick={() => handleChangeColor("#af5982")}
                          style={{
                            transform: "scale(1)",
                            backgroundColor: "#af5982",
                            display: "inline-block",
                            borderRadius: "50%",
                            padding: "5px",
                          }}
                        >
                          <input
                            type="radio"
                            id="html"
                            name="fav_language"
                            value="#af5982"
                            style={{ visibility: "hidden" }}
                          />
                        </div>
                        <div
                          onClick={() => handleChangeColor("#75d9e7")}
                          style={{
                            transform: "scale(1)",
                            backgroundColor: "#75d9e7",
                            display: "inline-block",
                            borderRadius: "50%",
                            padding: "5px",
                          }}
                        >
                          <input
                            type="radio"
                            id="html"
                            name="fav_language"
                            value="#75d9e7"
                            style={{ visibility: "hidden" }}
                          />
                        </div>
                        <div
                          onClick={() => handleChangeColor("#e775da")}
                          style={{
                            transform: "scale(1)",
                            backgroundColor: "#e775da",
                            display: "inline-block",
                            borderRadius: "50%",
                            padding: "5px",
                          }}
                        >
                          <input
                            type="radio"
                            id="html"
                            name="fav_language"
                            value="#e775da"
                            style={{ visibility: "hidden" }}
                          />
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
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
                    style={{ fontSize: "40px", color: "white" }}
                    onClick={goBack}
                  ></i>
                </div>
                <div className="nav_icon">
                  <div style={{ flex: 1 }}>
                    <i
                      className="bi bi-trash"
                      onClick={handleDelete}
                      style={{ fontSize: "40px", color: "white" }}
                    ></i>
                  </div>
                  <div
                    style={{ flex: 1, cursor: "pointer" }}
                    onClick={(e) => handleSubmit(e)}
                  >
                    <i
                      className="bi bi-pencil-square"
                      style={{ fontSize: "40px", color: "#7bff84" }}
                    ></i>
                  </div>
                </div>
              </nav>
            </form>
          </div>
        )}
      </div>
      <PopupModel
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
};

export default AddEditNav;
