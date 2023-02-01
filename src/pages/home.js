import { useEffect, useState } from "react";
import Cards from "../components/cards/cards";
import Paragraph from "../components/paragraph/paragraph";
import Spinner from "../components/spinner/spinner";
import { getServices } from "../services/api";


const Home = () => {

  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    async function getCardsData(){
      try{
        setLoading(true)
        const services = await getServices();
        if(services.status === 200){
          setCardsData(services.data)
        }
        else{
          console.log(services)
        }
        setLoading(false)
      } catch(error){
        console.log(error)
        setLoading(false)
      }
    }
    getCardsData()
  }, [])

  return (
    <>
    <Cards cardsList={cardsData}/>
    <Paragraph />
    {loading && <Spinner global />}
    </>
  );
};
export default Home;
