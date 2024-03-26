'use server'

import axios from 'axios'
import {BankDetails, Photographer, PhotographerCategory, Report} from "@/app/lib/types";


export const fetchCategories = async() => {
    try {
        const res = await axios.get<PhotographerCategory[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/getallcategories`);
        return res.data;
    } catch (e) {
        console.log("Error fetching photographer categories");
        throw e;
    }
} 

export const updateCategories = async (selectedCategories:string[]  ,userId:string|string[]) => {
    try{
        const uppercaseCategories = selectedCategories.map(category => category.toUpperCase());
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/categories`, {
            category: uppercaseCategories,
        });
    }catch(e){
        console.log("Error updating photographer categories");
        throw e;
    }
}

export const fetchCategoryById = async(userId:string|string[]) => {
    try {
        const res = await axios.get<Photographer>(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}`);
        console.log(res.data.category);
        const sentenceCaseData = res.data.category.map(category => category.charAt(0).toUpperCase() + category.slice(1).toLowerCase());
        return sentenceCaseData;

    }catch(e){
        console.log("Error fetching user id");
        throw e;
    }
}

export const submitReport = async(userId:string|string[], val:Report) => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/report/${userId}`, val);

    }catch(e){
        console.log("Error sending report");
        throw e;
    }
}


export const updateBankDetails = async (values: Partial<BankDetails>,userId:string|string[]) => {
    try{
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/bankdetails/`, {userId:userId,...values})
        .then((res) => {
            return res;
        });

    }catch(e){
        console.log("Error updating photographer bank details");
        return new Error("Error updating photographer bank details");
    }
}

export const fetchBankDetails = async(userId:string|string[]) => {
    try {
        const res = await axios.get<BankDetails>(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/bankdetails/${userId}`);
        console.log(res.data);
        return res.data;

    }catch(e){
        console.log("Error fetching user bank details");
        throw e;
    }
}