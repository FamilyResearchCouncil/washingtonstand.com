import { useEffect } from 'react';
import { useWindowSize } from "./useWindowSize";

export const useOnClickOutside = (ref, handler) => {
    let windowSize = useWindowSize();
    useEffect(() => {
            const listener = event => {
                if (windowSize.width > 768) {
                    if (!ref.current || ref.current.contains(event.target)) {
                        return;
                    }
                } else {

                    if (!ref.current || ref.current.contains(event.target)) {
                        if (event.target.tagName != "BUTTON" && event.target.tagName != "A") return;
                    }
                }
                handler(event);
            };
            document.addEventListener('click', listener);
            return () => {
                document.removeEventListener('click', listener);
            };
        },
        [ref, handler],
    );
};