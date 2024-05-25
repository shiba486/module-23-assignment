import{SaveListService,UpdateCartListService,RemoveCartListService,CartListService} from "../services/CartServices.js"

export const SaveList=async(req,res)=>{
    let result = await SaveListService(req)
    res.status(200).json(result)
}

export const UpdateCartList=async(req,res)=>{
    let result = await UpdateCartListService(req)
    res.status(200).json(result)
}

export const RemoveCartList=async(req,res)=>{
    let result = await RemoveCartListService(req)
    res.status(200).json(result)
}

export const CartList=async(req,res)=>{
    let result = await CartListService(req)
    res.status(200).json(result)
}

