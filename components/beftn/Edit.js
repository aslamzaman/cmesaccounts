import React, { useState } from "react";
import { BtnSubmit, TextEn } from "@/components/Form";
import { updateDataToIndexDB } from "@/lib/Database";

const Edit = ({ message, id, data  }) => {
    const [dt, setDt] = useState('');
    const [taka, setTaka] = useState('');
    const [accountId, setAccountId] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [staffId, setStaffId] = useState('');   
    const [show, setShow] = useState(false);


  const showEditForm = () => {
        message("Ready to edit");
        setShow(true);
        try {
            const { dt, taka, accountId, receiverId, staffId } = data;
            setDt(dt);
            setTaka(taka);
            setAccountId(accountId);
            setReceiverId(receiverId);
            setStaffId(staffId);
        } catch (err) {
            console.log(err);
        }
    };


    const closeEditForm = () => {
        setShow(false);
    };


    const createObject = () => {
        return {
            id: id,
            dt: dt,
            taka: taka,
            accountId: accountId,
            receiverId: receiverId,
            staffId: staffId            
        }
    }


    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const msg = await updateDataToIndexDB('beftn', id, newObject);
            message(msg);
        } catch (error) {
            console.error("Error updating beftn data:", error);
            message("Error updating beftn data.");
        } finally {
            setShow(false);
        }
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Edit Existing Data</h1>
                            <button onClick={closeEditForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                        </div>

                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={updateHandler} >
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextEn Title="Dt" Id="dt" Change={e => setDt(e.target.value)} Value={dt} Chr={150} />
                                    <TextEn Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} Chr={150} />
                                    <TextEn Title="AccountId" Id="accountId" Change={e => setAccountId(e.target.value)} Value={accountId} Chr={150} />
                                    <TextEn Title="ReceiverId" Id="receiverId" Change={e => setReceiverId(e.target.value)} Value={receiverId} Chr={150} />
                                    <TextEn Title="StaffId" Id="staffId" Change={e => setStaffId(e.target.value)} Value={staffId} Chr={150} />                                
                                </div>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeEditForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>


                    </div >
                </div >
            )}
            <button onClick={showEditForm} title="Edit" className="px-1 py-1 hover:bg-teal-300 rounded-md transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-black hover:stroke-blue-800 transition duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
        </>
    )
}
export default Edit;
  
