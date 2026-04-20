import { useState, useEffect } from "react";

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(null);

    const open = (payload = null) => {
        setData(payload);
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
        setData(null);
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape" && isOpen) {
                close();
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen]);

    return { isOpen, data, open, close };
};

export default useModal;