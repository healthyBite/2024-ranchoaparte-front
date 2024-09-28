import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import bgImage from '../../assets/imgHome.jpg'
import Calendar from "./components/Calendar";
import NavBar from "../../components/NavBar";
import Calories from "./components/Calories";
import FoodConsumed from "./components/FoodConsumed";
import PopUp from "./components/PopUp";
import { addNewFood, addUserFood, fetchAllFoods, fetchUserFoods, deleteUserFood , fetchFoodByID, editUserFood} from "../../firebaseService";

function Home() {
    const [foodData, setFoodData] = useState([]); // datos de tabla Food
    const [userFood, setUserFood] = useState([]); // datos de tabla UserFood
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState();
    const [selection, setSelection] = useState();
    const [addMeal, setAddMeal] = useState(false);
    const [newFood, setNewFood] = useState();
    const [foodEdition,setFoodEdition]=useState(false)

    const fetchFoods = async () => {
        try {
            // Validate the 'date' before using it
            if (isNaN(new Date(date).getTime())) {
                throw new Error('Invalid date value');
            }
    
            // Fetch user foods and all foods
            const userFood = await fetchUserFoods(date);
            const food = await fetchAllFoods();
            setFoodData(food);
    
            // Fetch food details for each user food using Promise.all
            const userFoodDetails = await Promise.all(userFood.map(async (item) => {
                const foodDetails = await fetchFoodByID(item.id_Food);
    
                return {
                    ...item,
                    name: foodDetails?.name || 'Unknown',
                    measure: foodDetails?.measure || '',
                    measure_portion: foodDetails?.measure_portion || null,
                    calories_portion: Math.round(foodDetails?.calories_portion) || 0
                };
            }));
    
            // Set user food with the resolved details
            setUserFood(userFoodDetails);
            setFoodEdition(false)
        } catch (err) {
            console.log('Error al obtener los datos: ' + err.message);
        }
    };
    

    useEffect(()=>{
        fetchFoods();
    },[])

    useEffect(() => {
        fetchFoods();
    }, [date, selection,foodEdition]);

    const handleAddMeal = async () => {
        try {
            await addUserFood(selection, date, amount);
            setAmount(null);
            setSelection(null);
            setAddMeal(false);
            console.log('Comida consumida agregada a UserFood > Firestore con éxito');
        } catch (error) {
            console.error('Error al agregar la comida consumida en UserFood > Firestore:', error);
        }
    }

    useEffect(() => {
        console.log('cambio la comidaaaaaa')
        newFood && addNewFood(newFood).then(() => {
            setNewFood(null);
        })
        fetchFoods();
    }, [newFood]);

    const handleDeleteMeal = async (idDoc_user_food) => {
        try {
            await deleteUserFood(idDoc_user_food); // This will delete the food from the Firebase backend
            setUserFood((prevUserFood) => prevUserFood.filter((food) => food.id !== idDoc_user_food)); // Update the local state
            console.log('Comida eliminada de UserFood > Firestore con éxito');
        } catch (err) {
            console.log('Error al eliminar la comida: ' + err.message);
        }
    };

    const handleEditFoodConsumed = async  (idDoc_user_food, data) => {
        try {
            await editUserFood(idDoc_user_food, data); 
            setFoodEdition(true)
            console.log('Comida editada de UserFood > Firestore con éxito');
        } catch (err) {
            console.log('Error al editar la comida: ' + err.message);
        }
    };

    return (
        <div className="h-screen w-full">
            <NavBar />
            <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:h-screen">
                <div className="w-full sm:w-11/12 lg:w-9/12 sm:h-screen lg:h-full pt-8 sm:pt-24 flex flex-col sm:flex-row justify-start items-start px-8">
                    <div className="sticky top-0 w-full sm:w-1/4 pb-4 sm:pb-12 flex flex-col h-full justify-start sm:justify-between items-center">
                        <Calendar value={date} onChange={e => setDate(new Date(e))} />
                        <Calories userFood={userFood} />
                    </div>
                    <div className="w-full sm:w-3/4 flex flex-col items-center justify-start pl-0 sm:pl-12">
                        <div className="flex flex-col w-full">
                            {userFood.map((usfood) => (
                                <FoodConsumed
                                    key={usfood.id}
                                    usfood={usfood}
                                    handleDeleteMeal={handleDeleteMeal} // Pass the delete function here
                                    handleEditFoodConsumed={handleEditFoodConsumed}
                                />
                            ))}
                            <div className="flex w-full items-center justify-center bg-white sticky bottom-0">
                                <div onClick={() => setAddMeal(true)} className="flex w-full mb-2 flex-row justify-start items-center py-2 px-4 mt-2 sm:mt-4 rounded-2xl font-semibold text-lg text-darkGray bg-healthyGreen/30 font-quicksand hover:cursor-pointer hover:bg-healthyGreen/50">
                                    <FontAwesomeIcon icon={faPlus} className="text-darkGray text-xl mr-3" />
                                    <p>Add food</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {window.innerWidth > '1024' && (
                    <div className="w-full lg:w-4/12 lg:h-screen flex justify-start">
                        <img src={bgImage} alt='Bakground image' className="w-full h-full object-cover" />
                    </div>
                )}
            </div>
            {addMeal &&
                <PopUp setAddMeal={setAddMeal} foodData={foodData} handleAddMeal={handleAddMeal} setNewFood={setNewFood} setSelection={setSelection} selection={selection} />
            }
        </div>
    );
}

export default Home;

