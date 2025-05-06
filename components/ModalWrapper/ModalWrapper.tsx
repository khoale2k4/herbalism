"use client";
import { useEffect } from "react";
import ReactDOM from "react-dom";

type ModalWrapperProps = {
    children: React.ReactNode;
    onClose?: () => void;
};

export default function ModalWrapper({ children, onClose }: ModalWrapperProps) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    if (typeof window === "undefined") return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center overflow-y-auto p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
                {children}
            </div>
        </div>,
        document.body
    );
}