import { useState } from 'react';
import { Image } from '@/types';

function Carousel({ images }: { images: Image[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    if (!images || images.length === 0) {
        return <div className="p-4 text-gray-500">No Images</div>;
    }

    return (
        <div className="flex w-full max-w-4xl gap-4 p-4">

            <div className="flex h-[400px] flex-col gap-3 overflow-y-auto pr-2 scrollbar-hide">
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        onClick={() => goToSlide(index)}
                        className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ease-in-out hover:opacity-100 ${
                            currentIndex === index
                                ? 'border-blue-500 opacity-100 ring-2 ring-blue-200'
                                : 'border-transparent opacity-60 hover:border-gray-300'
                        }`}
                    >
                        <img
                            src={image.thumb}
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div>

            <div className="group relative h-[600px] w-full flex-1 overflow-hidden rounded-2xl shadow-lg">

                <div
                    className="flex h-full w-full transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image) => (
                        <div key={image.id} className="h-full w-full flex-shrink-0 bg-gray-100">
                            <img
                                src={image.large}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={prevSlide}
                    className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 opacity-0 shadow-md transition-all hover:bg-white focus:outline-none group-hover:opacity-100"
                >
                    {'<'}
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 opacity-0 shadow-md transition-all hover:bg-white focus:outline-none group-hover:opacity-100"
                > {">"}
                </button>
            </div>
        </div>
    );
}

export default Carousel;
