import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import data from "./data";

const Accordion = () => {
    const [selected, setSelected] = useState(null);
    const [multipleSelected, setMultipleSelected] = useState([]);
    const [isOn, setIsOn] = useState(false);
    function handleSingleSelection(getCurrentId) {
        setSelected(prevId => (prevId === getCurrentId ? null : getCurrentId));
    }
    function handleMultiSelection(getCurrentId) {
        let cpyMultipleSelected = [...multipleSelected];
        const findIndexOfCurrentId = cpyMultipleSelected.indexOf(getCurrentId);
        // console.log(findIndexOfCurrentId);

        if (findIndexOfCurrentId === -1) {
            cpyMultipleSelected.push(getCurrentId);
        }
        else {
            cpyMultipleSelected.splice(findIndexOfCurrentId, 1);
        }
        setMultipleSelected(cpyMultipleSelected);
    }
    // console.log(selected, multipleSelected);
    const handleToggle = () => {
        setIsOn(!isOn);
    }


    return (
        <div className="h-screen flex flex-col items-center justify-center bg-zinc-100 ">
            <div className="w-2/4 mb-4 flex flex-row items-center justify-end">
                <p className="text-xl mx-2">
                    Enable Multi Selection :
                </p>
                <span
                    onClick={handleToggle}
                    className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer
                        ${isOn ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                    {/* Circle that switches between positions */}
                    <div
                        className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out
                             ${isOn ? 'translate-x-6' : ''}`}
                    ></div>
                </span>
            </div>

            <div className="w-2/4">
                {
                    data && data.length > 0 ? (
                        data.map((dataItem) => (
                            <div
                                key={dataItem.id}
                                onClick={
                                    isOn ?
                                        () => handleMultiSelection(dataItem.id)
                                        : () => handleSingleSelection(dataItem.id)
                                }
                                className="w-full shadow-md border-2">
                                <div className="w-full p-4 flex flex-col">
                                    <div className="w-full flex items-center justify-between">
                                        <h3 className="font-semibold">{dataItem.question}</h3>
                                        <span>
                                            {
                                                isOn ?
                                                    (multipleSelected.indexOf(dataItem.id) !== -1 ?
                                                        <AiOutlineMinus />
                                                        : <AiOutlinePlus />) :
                                                    (selected === dataItem.id ?

                                                        <AiOutlineMinus />
                                                        : <AiOutlinePlus />)

                                            }
                                        </span>
                                    </div>
                                    {
                                        isOn ? multipleSelected.indexOf(dataItem.id) !== -1 && <div className="mt-4 ">{dataItem.answer}</div> : selected === dataItem.id && <div className="mt-4 ">{dataItem.answer}</div>


                                    }

                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No data found</p>
                    )
                }
            </div>
        </div>
    )
}

export default Accordion