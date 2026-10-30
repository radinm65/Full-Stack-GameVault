import type { Dispatch, SetStateAction } from "react";

interface IHomeSliderPagination{
    currentSlide: number
    setCurrentSlide: Dispatch<SetStateAction<number>>
    count?: number
}

export default IHomeSliderPagination
