'use server'

import axios from 'axios'
import {BankDetails, Photographer, PhotographerCategory, Report} from "@/lib/types";


export const fetchCategories = async() => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/getallcategories`);
        return res.data;
    } catch (e) {
        throw new Error("Error fetching photographer categories");
    }
} 

export const updateCategories = async (selectedCategories:string[]  ,userId:string|string[]) => {
    try{
        const uppercaseCategories = selectedCategories.map(category => category.toUpperCase());
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/categories`, {
            category: uppercaseCategories,
        });
    }catch(e){
        throw new Error("Error updating photographer categories");
    }
}

export const fetchCategoryById = async(userId:string|string[]) => {
    try {
        const res = await axios.get<Photographer>(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/getcategory`);
        const sentenceCaseData = res.data.category.map(category => category.charAt(0).toUpperCase() + category.slice(1).toLowerCase());
        return sentenceCaseData;
    }catch(e){
        throw new Error("Error fetching user id");
    }
}

export const submitReport = async(userId:string|string[], val:Report) => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/report/${userId}`, val);
    }catch(e){
        throw new Error("Error sending report");
    }
}


export const updateBankDetails = async (values:BankDetails,userId:string|string[]) => {
    try{
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/bankdetails/${userId}`, values)
        .then((respond) => {
            return respond;
        });
    }catch(e){
        return new Error("Error updating photographer bank details");
    }
}

export const fetchBankDetails = async(userId:string|string[]) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/bankdetails/${userId}`);
        return res.data;
    }catch(e){
        throw new Error("Error fetching user bank details");
    }
}