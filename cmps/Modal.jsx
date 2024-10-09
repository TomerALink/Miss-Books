import { BookDetails } from "../pages/BookDetails.jsx"
const { useState } = React

export function Modal({ bookId, onBack }) {

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }
    // const [selectedBookId, setSelectedBookId] = useState(null)

    return(
        <div>
        <button 
        onClick={toggleModal}
        className="btn-modal">
            Details
        </button>
        {modal && (
        <div className="modal">
            <div 
            onClick={toggleModal} 
            className="overlay"></div>
                <div className="modal-contenet">
                    <h2>{bookId}</h2>
                    
                     {/* <BookDetails onBack={onBack} bookId={bookId} /> */}
                    <button 
                    className="close-modal"
                    onClick={toggleModal}
                    >X</button>
                </div>
            </div>
        )}
        
        </div>
    )

}