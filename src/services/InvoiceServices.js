import{CartModel} from "./../models/CartModel.js"
import{InvoiceModel} from "./../models/InvoiceModel.js"
import{InvoiceProductModel} from "./../models/InvoiceProductModel.js"
import{ProfileModel} from "./../models/ProfileModel.js"
import{PaymentSettingModel} from "./../models/PaymentSettingModel.js"
import mongoose from "mongoose"
const ObjectID= mongoose.Types.ObjectId

export const CreateInvoiceService = async (req)=>{
    let user_id=new ObjectID(req.params.user_id)
    // let user_id=new ObjectID(req.header.user_id)
    let cus_email= req.header.email

    // =============Step 01: Calculate Total Payable & Vat=====================================================================================

    let matchStage= {$match:{userID: user_id}}
    let JoinWithProductStage={$lookup:{from: "products",localField:"productID", foreignField:"_id",as: "product"}}
    let UnwindStage={$unwind:"$product"}

    let cartproduct= await CartModel.aggregate([
        matchStage,JoinWithProductStage,UnwindStage
    ])

    let totalAmount=0;
    cartproduct.forEach((element)=>{
        let price;
        if(element["product"]["discount"]){
            price= parseFloat(element['product']['discountPrice'])
        }
        else{
            price= parseFloat(element['product']['price'])
        }
        totalAmount = totalAmount + parseFloat(element['qty'] * price) 
    })

    let vat = totalAmount * .5
    let payable= totalAmount + vat



    // =============Step 02: Prepare  Customer Details & Shipping Details=======================================
    let profile = await ProfileModel.aggregate([matchStage])

    let cus_Details= `Name: ${profile[0]['cus_name']} , Email: ${cus_email}, Address: ${profile[0]['cus_add']}, Phone: ${profile[0]['cus_phone']}, `
    let ship_Details= `Name: ${profile[0]['ship_name']} , City: ${profile[0]['ship_email']}, Address: ${profile[0]['ship_add']}, Phone: ${profile[0]['ship_phone']}, `

    // =============Step 03: Transaction & Other's ID=====================================================================================

    let tran_id = Math.floor(10000000 + Math.random()* 90000000)
    let val_id = 0
    let payment_status= "pending"
    let delivery_status= "pending"


    // =============Step 04: Create Invoice=====================================================================================

    let createInvoice= await InvoiceModel.create({
        userId: user_id,
          payable: payable,
          cust_details:cus_Details,
          ship_details: ship_Details,
          tran_id: tran_id,
          val_id: val_id,
          payment_status:payment_status,
          delivery_status:delivery_status,
          total:totalAmount,
          vat: vat,
    })


    // =============Step 05: Create Invoice Product===================================

    let invoice_id = createInvoice['_id'];

    cartproduct.forEach(async(element)=>{
        await InvoiceProductModel.create({
            userID:user_id,
            productID:element['productID'],
              invoiceID:invoice_id,
              qty: element["qty"],
              price:element["product"]["discount"]? element["product"]['discountPrice']: element["product"]['price'],
              color: element["color"],
              size: element["size"],

        })
    })



    //=============Step 06: Remove Carts========================================

    await CartModel.deleteMany({userID: user_id})

    //=============Step 07: Prepare SSL Payment====================================================================================

    // return {status: "success", data: cus_Details}
}

export const InvoiceListService = async (req)=>{
   try {
     let user_id = new ObjectID(req.params["user_id"])
     // let user_id = new ObjectID(req.user["user_id"])
    let invoice = await InvoiceModel.find({userID: user_id})
    return {status:"success", data: invoice}
   } catch (error) {
    return {status:"fail", message:"Something Went Wrong"}
   }
    
}
export const InvoiceProductListService = async (req)=>{
    try {
     
        let user_id = new ObjectID(req.user["user_id"])
        let invoice_id = new ObjectID(req.params["inovice_id"])

        let matchStage = {$match:{userID: user_id, invoiceID: invoice_id}}
        let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        let unwindStage={$unwind:"$product"}
        
       let products=await InvoiceProductModel.aggregate([
        matchStage,
        JoinStageProduct,
        unwindStage
    ])
    
       
       return {status:"success", data: products}
      } catch (error) {
        console.log(error)
       return {status:"fail", message:"Something Went Wrong"}
      }
       
}


export const PaymentSuccessService = async (req)=>{
   try {
    let TransactionId= req.params["trxID"]
     await InvoiceModel.updateOne({tran_id: TransactionId},{payment_status: "success"})
     return {status: "success"}
   } catch (error) {
    return {status:"fail", message:"Something Went Wrong"}
   }
}
export const PaymentCancelService = async (req)=>{
    try {
        let TransactionId= req.params["trxID"]
         await InvoiceModel.updateOne({tran_id: TransactionId},{payment_status: "cancel"})
         return {status: "success"}
       } catch (error) {
        return {status:"fail", message:"Something Went Wrong"}
       }
}
export const PaymentFailService = async (req)=>{
    try {
        let TransactionId= req.params["trxID"]
         await InvoiceModel.updateOne({tran_id: TransactionId},{payment_status: "fail"})
         return {status: "success"}
       } catch (error) {
        return {status:"fail", message:"Something Went Wrong"}
       }
}
export const PaymentIPNService = async (req)=>{
    try {
        let TransactionId= req.params["trxID"]
        let status= req.body["status"]
         await InvoiceModel.updateOne({tran_id: TransactionId},{payment_status: status})
         return {status: "success"}
       } catch (error) {
        return {status:"fail", message:"Something Went Wrong"}
       }
}
