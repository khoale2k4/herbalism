import { useState, useEffect, useCallback } from "react";
import { ShoppingCart, CheckCircle, AlertCircle, Info, X } from "lucide-react";

// Types
export type NotificationType = "success" | "error" | "info" | "cart";

export type NotificationProps = {
    show: boolean;
    message: string;
    type: NotificationType;
    duration: number;
    onClose: () => void;
};

// Component
export const NotificationPopup = ({
    show,
    message,
    type,
    duration,
    onClose,
}: NotificationProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            setIsLeaving(false);

            if (duration > 0) {
                const timer = setTimeout(() => {
                    handleClose();
                }, duration);

                return () => clearTimeout(timer);
            }
        }
    }, [show, duration]);

    const handleClose = () => {
        setIsLeaving(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 300);
    };

    if (!isVisible) return null;

    const getIconAndColor = () => {
        switch (type) {
            case "success":
                return {
                    icon: <CheckCircle size={20} />,
                    bgColor: "bg-green-600",
                    borderColor: "border-green-700",
                };
            case "error":
                return {
                    icon: <AlertCircle size={20} />,
                    bgColor: "bg-red-600",
                    borderColor: "border-red-700",
                };
            case "info":
                return {
                    icon: <Info size={20} />,
                    bgColor: "bg-blue-600",
                    borderColor: "border-blue-700",
                };
            case "cart":
                return {
                    icon: <ShoppingCart size={20} />,
                    bgColor: "bg-green-600",
                    borderColor: "border-green-700",
                };
            default:
                return {
                    icon: <Info size={20} />,
                    bgColor: "bg-gray-700",
                    borderColor: "border-gray-800",
                };
        }
    };

    const { icon, bgColor, borderColor } = getIconAndColor();

    return (
        <div
            className={`fixed bottom-4 right-4 md:bottom-10 md:right-10 flex items-center max-w-xs sm:max-w-sm shadow-lg rounded-lg border-l-4 ${borderColor} overflow-hidden transform transition-all duration-300 ease-in-out ${isLeaving ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
                }`}
            role="alert"
        >
            <div className={`${bgColor} p-3 flex items-center justify-center text-white`}>
                {icon}
            </div>
            < div className="bg-white p-3 pl-4 pr-8 flex-grow" >
                <p className="text-gray-800 text-sm" > {message} </p>
            </div>
            < button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close notification"
            >
                <X size={16} />
            </button>
            {
                duration > 0 && (
                    <div
                        className={`absolute bottom-0 left-0 h-1 ${bgColor} transition-all duration-linear`}
                        style={{
                            width: "100%",
                            animation: `shrinkWidth ${duration / 1000}s linear forwards`,
                        }
                        }
                    />
                )
            }
            <style jsx > {`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
        </div >
    );
};

// Custom Hook
export function useNotification(defaultDuration = 3000) {
    const [notification, setNotification] = useState<{
        show: boolean;
        message: string;
        type: NotificationType;
        duration: number;
    }>({
        show: false,
        message: "",
        type: "success",
        duration: defaultDuration,
    });

    const showNotification = useCallback(
        (
            message: string,
            type: NotificationType = "success",
            duration: number = defaultDuration
        ) => {
            setNotification({
                show: true,
                message,
                type,
                duration,
            });
        },
        [defaultDuration]
    );

    const hideNotification = useCallback(() => {
        setNotification((prev) => ({ ...prev, show: false }));
    }, []);

    // Success shorthand
    const showSuccess = useCallback(
        (message: string, duration?: number) => {
            showNotification(message, "success", duration);
        },
        [showNotification]
    );

    // Error shorthand
    const showError = useCallback(
        (message: string, duration?: number) => {
            showNotification(message, "error", duration);
        },
        [showNotification]
    );

    // Info shorthand
    const showInfo = useCallback(
        (message: string, duration?: number) => {
            showNotification(message, "info", duration);
        },
        [showNotification]
    );

    // Cart shorthand
    const showCartNotification = useCallback(
        (message: string, duration?: number) => {
            showNotification(message, "cart", duration);
        },
        [showNotification]
    );

    // Notification component
    const NotificationComponent = () => (
        <NotificationPopup
            show={notification.show}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={hideNotification}
        />
    );

    return {
        showNotification,
        showSuccess,
        showError,
        showInfo,
        showCartNotification,
        hideNotification,
        NotificationComponent,
    };
}