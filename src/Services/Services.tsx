import axios from "axios"
import { IEmployee } from "../models/IEmployee"
import { IUser } from "../models/IUser"

const baseURLPrefix = 'http://localhost:3004'

const configPost = axios.create({
    baseURL : baseURLPrefix + "/posts",
    timeout : 25000
})

const configUser = axios.create({
    baseURL : baseURLPrefix + "/users",
    timeout : 25000
})

const employeeConfig = axios.create({
    baseURL: baseURLPrefix + '/employees', 
   timeout: 25000,
})
export const postService = async (parameter:string) => {
    var url = parameter;
    const params = {

    }
    return await configPost.get(url, {params})
}

export const userServiceByUserName = async (username:string) => {
    var url = "";
    const params = new URLSearchParams([['username', username]]);
    
    return await configUser.get(url, {params})
}

export const saveUserService = async (user:IUser) => {
    var url = "";
    return await configUser.post(url, user);
}

export const getEmployeeList = async (parameter:string) => {

    var url = parameter;
    const params = {
    }
   
    return await employeeConfig.get(url, { params })
}


export const saveEmployee = async (employee:IEmployee) => {

    var url = "";
    return await employeeConfig.post(url, employee) 
}