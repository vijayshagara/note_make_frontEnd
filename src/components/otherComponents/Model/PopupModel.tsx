import React from 'react';

interface PopupModelProps {
  setIsModalVisible:Function
  isModalVisible:boolean
}

const PopupModel: React.FC<PopupModelProps> = ({ isModalVisible,setIsModalVisible }) => {
  const closeModel=()=>{
    setIsModalVisible(!isModalVisible)
  }
  return (
    <div>
      <div className={`modal fade ${isModalVisible ? 'show' : 'hide'}`} style={{ display: isModalVisible ? 'block' : 'none' }} role="dialog">        
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
              <button type="button" onClick={closeModel}className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModel;
