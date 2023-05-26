import { useState } from "react";
import Modal from "./problem_2/Modal";
import DataTable from "./problem_2/DataTable";

const Problem2 = () => {

    const [showModalA, setShowModalA] = useState(false)
    const [showModalB, setShowModalB] = useState(false)
    const handleCloseA = () => setShowModalA(false)
    const handleCloseB = () => setShowModalB(false)

    const [baseURL,setBaseURL] = useState("")

    const handleModalOpen = (id) => {
        if (id === 'A') {
            setShowModalA(true)
            setShowModalB(false)
            setBaseURL("https://contact.mediusware.com/api/contacts/")
        } else {
            setShowModalB(true)
            setShowModalA(false)
            setBaseURL("https://contact.mediusware.com/api/country-contacts/United%20States/")
        }
    }
    return (

        <div className="container"  >

            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>


                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-lg text-light" type="button" onClick={()=>handleModalOpen("A")} style={{backgroundColor:"#46139f"}} >All Contacts</button>
                        <button className="btn btn-lg text-light" type="button" onClick={()=>handleModalOpen("B")} style={{backgroundColor:"#ff7f50"}}>US Contacts</button>
                    </div>
                </div>


                <Modal title="Modal A" handleClose={handleCloseA} show={showModalA} modalSwitcher={handleModalOpen}>
                    <DataTable baseURL={baseURL}/>
                </Modal>
                <Modal title="Modal B" handleClose={handleCloseB} show={showModalB} modalSwitcher={handleModalOpen}>
                <DataTable baseURL={baseURL}/>
                </Modal>
            </div>
        </div>
    );
};

export default Problem2;