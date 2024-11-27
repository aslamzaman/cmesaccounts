"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/staff/Add";
import Edit from "@/components/staff/Edit";
import Delete from "@/components/staff/Delete";
import { getDataFromIndexDB } from "@/lib/Database";


const Staff = () => {
    const [staffs, setStaffs] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("");


    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await getDataFromIndexDB("staff");
                const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? 1 : -1);
                setStaffs(result);
                setWaitMsg('');
            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Staff</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
            </div>


            <div className="w-full lg:w-3/4 mx-auto border-2 p-4 shadow-md rounded-md">
                <div className="overflow-auto">
                      <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Mobile</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Adderss</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end items-center pr-2.5 font-normal">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                staffs.length ? staffs.map(staff => {
                                    return (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={staff.id}>
                                                <td className="text-center py-2 px-4">{staff.name}</td>
                                                <td className="text-center py-2 px-4">{staff.mobile}</td>
                                                <td className="text-center py-2 px-4">{staff.adderss}</td>                                            
                                            <td className="flex justify-end items-center mt-1">
                                                <Edit message={messageHandler} id={staff.id} data={staff} />
                                                <Delete message={messageHandler} id={staff.id} data={staff} />
                                            </td>
                                        </tr>
                                    )
                                })
                                    : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Staff;
  
