import type { Dispatch, SetStateAction } from "react";

interface IHomeSliderPagination{
    currentSlide: number
    setCurrentSlide: Dispatch<SetStateAction<number>>
}

export default IHomeSliderPagination