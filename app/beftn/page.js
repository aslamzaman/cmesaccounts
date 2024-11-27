"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { getDataFromIndexDB } from "@/lib/Database";
import { BtnSubmit, TextDt, TextEn, DropdownEn, TextNum } from "@/components/Form";
import { formatedDate, formatedDateDot, inwordEnglish, numberWithComma, titleCamelCase } from "@/lib/utils";

const Beftn = () => {
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("");

    const [dt, setDt] = useState('');
    const [branch, setBranch] = useState('Satmasjid Road Branch');
    const [taka, setTaka] = useState('');
    const [senderId, setSenderId] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [staffId, setStaffId] = useState('');

    const [senders, setSenders] = useState([]);
    const [receivers, setReceivers] = useState([]);
    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const [responseSender, responseReceiver, responseStaff] = await Promise.all([
                    getDataFromIndexDB("sender"),
                    getDataFromIndexDB("receiver"),
                    getDataFromIndexDB("staff")
                ]);

                setSenders(responseSender);
                setReceivers(responseReceiver);
                setStaffs(responseStaff);

                console.log({ responseSender, responseReceiver, responseStaff })

            } catch (error) {
                console.log(error);
            }
        };
        load();
        setDt(formatedDate(new Date()));
    }, [msg]);


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            /*
              const [accounts, setAccounts] = useState([]);
    const [receivers, setReceivers] = useState([]);
    const [staffs, setStaffs] = useState([]);
            */
            const sender = senders.find(sender => parseInt(sender.id) === parseInt(senderId));
            const receiver = receivers.find(receiver => parseInt(receiver.id) === parseInt(receiverId));
            const staff = staffs.find(staff => parseInt(staff.id) === parseInt(staffId));
            console.log({ sender, receiver, staff, senderId, receiverId, staffId});


            const doc = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
                putOnlyUsedFonts: true,
                floatPrecision: 16 // or "smart", default is 16
            });

            const inW = `${titleCamelCase(inwordEnglish(taka))} Taka Only`;
            let y = 0;
            if(inW.length > 37){
                y =100;
            }else{
                y = 104;
            }
            setMsg("Please wait...");
            doc.setFontSize(14);
            doc.addImage(`/images/beftn.png`, "PNG", 0, 0, 210, 297 );
            doc.text(`${branch}`, 112, 37, null, null, "center"); 
            doc.text(`${formatedDateDot(dt,true)}`, 39, 50, null, null, "left"); 
            doc.text(`${sender.name}`, 61, 81, null, null, "left"); 
            doc.text(`${sender.number}`, 61, 88.5, null, null, "left"); 
            doc.text(`${numberWithComma(taka)}/-`, 61, 94.7, null, null, "left"); 
            doc.text(`${inW}`, 61, y, { maxWidth: 115, align: 'left' }); 


            doc.text(`${receiver.name}`, 61, 120, null, null, "left"); 
            doc.text(`${receiver.account}`, 61, 127, null, null, "left"); 
            doc.text(`${receiver.bank}`, 61, 134.8, null, null, "left"); 
            doc.text(`${receiver.branch}`, 61, 141.8, null, null, "left"); 
            doc.text(`${receiver.mobile}`, 149, 141.8, null, null, "left"); 
            doc.text(`${receiver.routing}`, 61, 147.5, null, null, "left"); 
            doc.text(`${receiver.thana}`, 61, 153.7, null, null, "left"); 
            doc.text(`${receiver.district}`, 122, 153.7, null, null, "left"); 


            doc.text(`${staff.name}`, 82, 197, null, null, "left"); 
            doc.text(`${staff.mobile}`, 62, 203.5, null, null, "left"); 
            doc.text(`${staff.adderss}`, 62, 211, null, null, "left"); 

            doc.save(Date.now() + ".pdf");

            setMsg(" ");
        } catch (error) {
            console.error("Error saving beftn data:", error);
        }
    }



    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Beftn</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
            </div>


            <div className="w-full lg:w-3/4 mx-auto border-2 p-4 shadow-md rounded-md">
                <div className="overflow-auto">
                    <div className="px-6 pb-6 text-black">
                        <form onSubmit={saveHandler}>
                            <div className="grid grid-cols-1 gap-4 my-4">
                                <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                <TextEn Title="Branch" Id="branch" Change={e => setBranch(e.target.value)} Value={branch} />
                                <TextNum Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />
                                <DropdownEn Title="Senders" Id="senderId" Change={e => setSenderId(e.target.value)} Value={senderId}>
                                    {senders.length ? senders.map(sender => <option value={sender.id} key={sender.id}>{sender.identify}</option>) : null}
                                </DropdownEn>
                                <DropdownEn Title="Receiver" Id="receiverId" Change={e => setReceiverId(e.target.value)} Value={receiverId}>
                                    {receivers.length ? receivers.map(receiver => <option value={receiver.id} key={receiver.id}>{receiver.identify}</option>) : null}
                                </DropdownEn>

                                <DropdownEn Title="Staff" Id="staffId" Change={e => setStaffId(e.target.value)} Value={staffId}>
                                    {staffs.length ? staffs.map(staff => <option value={staff.id} key={staff.id}>{staff.name}</option>) : null}
                                </DropdownEn>
                            </div>
                            <div className="w-full flex justify-start">
                                <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Beftn;

