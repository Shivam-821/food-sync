import { getAddressCoordinate, getAutoCompleteSuggestions, getDistanceTime} from "../services/maps.service.js"
import { validationResult } from "express-validator";

const getCoordinates = async (req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }


  const {address} = req.query;

  try{
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates); 
  } catch (error){
    res.status(404).json({message:"Coordinates not found"});
  }
}


 const getDistanceTime1 = async (req, res, next)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({errors: errors.array() })
    }
    const {origin, destination} = req.query;
    const distanceTime = await getDistanceTime(origin, destination);
    console.log(distanceTime)
    res.status(200).json(distanceTime);

  }catch(err){
    console.error(err);
    res.status(500).json({message: 'Internal server Error'});

  }
}

const getAutoCompleteSuggestions1 = async (req, res, next)=>{
 try{

  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
 
  const {input} = req.query;
  const suggestions = await getAutoCompleteSuggestions(input);

  res.status(200).json(suggestions);

  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Internal server Error'});
  }
}


export { getCoordinates, getDistanceTime1, getAutoCompleteSuggestions1 };