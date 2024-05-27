import axios from "axios";

export const fetchReportData = async (page: number,name:string) => {
    try {
        const reports = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/report/getallreports?page=${page}&name=${name}`
        );
        return reports.data;
    } catch (error) {
        throw new Error("Error fetching user Reports");
    }
};

export const fetchLastPage = async (name:string): Promise<number> => {
    try {
        const lastPage = await axios.get<number>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/report/getlastpage?name=${name}`
        );
        return lastPage.data;
    } catch (error) {
        throw new Error("Error Fetching User Reports");
    }
};


// ------ Image Reports ---------------

export const fetchImageReportData = async (page: number,name:string) => {
    try {
        const reports = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/report/getallimagereports?page=${page}&name=${name}`
        );
        return reports.data;
    } catch (error) {
        throw new Error("Error fetching image reports users");
    }
};

export const fetchLastImageReportPage = async (name:string): Promise<number> => {
    try {
        const lastPage = await axios.get<number>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/report/getlastImageReportpage?name=${name}`
        );
        return lastPage.data;
    } catch (error) {
        throw new Error("Error Fetching User Reports");
    }
};
