import React,{useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faCheck, faMagnifyingGlass, faXmark, faCircleXmark } from '@fortawesome/free-solid-svg-icons'; 
import FoodItem from './FoodItem';
import Search from './Search';
import Input from '../../../components/Input';
import NewFood from './NewFood';


const PopUp = ({setAddMeal,foodData,handleAddMeal, setNewFood,selection, setSelection}) => {

    const [searchFood, setSearchFood]=useState(foodData)
    const [addFodd, setAddFood]=useState(false)


    return (
    <div className="w-full h-screen absolute top-0 z-10 flex justify-center items-center bg-black/30">
        <div className="w-full flex flex-col justify-center shadow-lg items-center max-w-[600px] bg-healthyGray rounded-2xl px-8 pb-8 pt-4">
            <div className="w-full flex justify-end items-start mb-2">
                {selection && 
                <button onClick={handleAddMeal} className="font-quicksand text-sm px-3 py-1 flex items-center  rounded-xl bg-healthyOrange text-white font-bold mr-3 hover:cursor-pointer hover:bg-healthyDarkOrange "> <FontAwesomeIcon icon={faCheck} className="text-white text-lg mr-2"/> Save change</button>}
                <FontAwesomeIcon onClick={()=>setAddMeal(false)} icon={faCircleXmark} className="text-darkGray/20 hover:cursor-pointer hover:text-darkGray/40 text-3xl text-right "/>
            </div>
            <div className="flex flex-row  w-full ">
                <Search foodData={foodData} setSearchFood={setSearchFood}/>
                <div onClick={()=>setAddFood(true)} className="flex w-4/12 flex-row ml-3 justify-center items-center py-2 px-4 rounded-2xl font-semibold text-md  text-darkGray  font-quicksand hover:cursor-pointer bg-white/70 hover:bg-white/90">
                    <FontAwesomeIcon icon={faPlus} className="text-darkGray text-xl mr-2" />
                    <p className="text-center">Add food</p>
                </div>
            </div>
            {addFodd && <NewFood setAddFood={setAddFood} setNewFood={setNewFood}  />}
            {selection &&
                <div className="flex items-center justify-center w-full">
                    <div className="flex flex-row justify-center items-center font-quicksand text-darkGray text-sm bg-white/70 px-5 rounded-3xl py-2 mt-2">
                        <p className="font-semibold">{selection.name}</p>
                        <div className="flex justify-end items-center ml-4">
                            <p>{selection.amount}</p>
                            <p className="ml-1">{selection.measure}</p>
                        </div>
                        <FontAwesomeIcon icon={faXmark} className="text-darkGray text-xl hover:cursor-pointer hover:text-healthyDarkGray1 ml-4" onClick={()=>setSelection()}/>
                    </div>
                </div>
            }
            {searchFood.length>0 &&
            (<div className="bg-white/40 p-2 rounded-lg mt-4 w-full">
                {searchFood.map((food)=>(<FoodItem key={food.id_Food} food={food} setSelection={setSelection} />))}
            </div>)
            }
        </div>
    </div>
    )
}

export default PopUp