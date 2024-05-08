'use server'

import axios from 'axios'
import { BankDetails, Photographer, Report } from "@/app/lib/types";



export const fetchCategories = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/getallcategories`);
        return res.data;
    } catch (e) {
        throw new Error("Error fetching photographer categories");
    }
}

export const updateCategories = async (selectedCategories: string[], userId: string | string[]) => {
    try {
        const uppercaseCategories = selectedCategories.map(category => category.toUpperCase());
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/categories`, {
            category: uppercaseCategories,
        });
    } catch (e) {
        throw new Error("Error updating photographer categories");
    }
}

export const fetchCategoryById = async (userId: string | string[]) => {
    try {
        const res = await axios.get<Photographer>(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/getcategory`);
        return res.data;
    } catch (e) {
        throw new Error("Error fetching user id");
    }
}
