import { CreateInvoiceService, InvoiceListService,InvoiceProductListService,PaymentSuccessService,PaymentCancelService,PaymentFailService,PaymentIPNService } from "../services/InvoiceServices.js"

export const CreateInvoice = async (req,res)=>{
    let result = await CreateInvoiceService(req)
    res.status(200).json(result)
}

export const InvoiceList = async (req,res)=>{
    let result = await InvoiceListService(req)
    res.status(200).json(result)
}

export const InvoiceProductList = async (req,res)=>{
    let result = await InvoiceProductListService(req)
    res.status(200).json(result)
}

export const PaymentSuccess = async (req,res)=>{
    let result = await PaymentSuccessService(req)
    res.status(200).json(result)
}


export const PaymentCancel = async (req,res)=>{
    let result = await PaymentCancelService(req)
    res.status(200).json(result)
}

export const PaymentFail = async (req,res)=>{
    let result = await PaymentFailService(req)
    res.status(200).json(result)
}

export const PaymentIPN = async (req,res)=>{
    let result = await PaymentIPNService(req)
    res.status(200).json(result)
}


