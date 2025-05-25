"use client";

import { ToastProps } from "@/utils/interfaces/toastInterfaces";
import { createContext } from "react";

import { toast } from "react-toastify";

export const ToastContext = createContext({} as ToastProps)

export function ToastProvider({ children } : { children: React.ReactNode }) {

    function showToastSuccess(message: string) {
        toast.success(message);
    }

    function showToastError(message: string) {
        toast.error(message);
    }

    return (
        <ToastContext.Provider value={{ showToastSuccess, showToastError }} >
            {children}
        </ToastContext.Provider>
    )
}