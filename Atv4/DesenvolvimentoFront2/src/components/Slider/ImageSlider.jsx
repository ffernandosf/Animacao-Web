import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './ImageSlider.css';

const ImageSlider = () => {
    const images = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=2074&auto=format&fit=crop",
            title: "Poder da Natureza",
            desc: "A energia pura dos raios"
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1429552077091-836152271555?q=80&w=1970&auto=format&fit=crop",
            title: "Tempestade Noturna",
            desc: "O céu iluminado pela força elétrica"
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2071&auto=format&fit=crop",
            title: "Trovão Azul",
            desc: "Espetáculo de luzes e sons"
        },
        {
            id: 4,
            src: "https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?q=80&w=2071&auto=format&fit=crop",
            title: "Horizonte Elétrico",
            desc: "Quando a tempestade encontra o mar"
        },
        {
            id: 5,
            src: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=80&w=2044&auto=format&fit=crop",
            title: "Fúria dos Céus",
            desc: "A majestade de um dia tempestuoso"
        }
    ];

    return (
        <div className="slider-container">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: true,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className="swiper_container"
            >
                {images.map((img) => (
                    <SwiperSlide key={img.id}>
                        <div className="slide-content">
                            <img src={img.src} alt={img.title} />
                            <div className="slide-text">
                                <h3>{img.title}</h3>
                                <p>{img.desc}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292" /></svg>
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M268 112l144 144-144 144M392 256H100" /></svg>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div>
    );
};

export default ImageSlider;
