import React, { useState } from 'react';
import Herolider, {Slide} from 'hero-slider';
import './css/imageViewer.css';

const ImageViewer= () => {
 
    return(
        <div className = "imgView">
        <Herolider
            slidingAnimation = "left_to_right"
            orientation = "horizontal"
            initialSlide = {1}
            onBeforeChange = {(previousSlide,nextSlide)=> console.log("onBeforeChange",previousSlide,nextSlide)}
            onChange= {nextSlide => console.log("onChange",nextSlide)}
            onAfterChange = {nextSlide => console.log("onAfterChange",nextSlide)}
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.33)",
                height : "10vh",
                width: "10vh",
            }}
            settings={{
                slidingDuration :250,
                slidingDelay :100,
                shouldAutoplay : true,
                houldDisplayButtons : true,
                autoplayDuration : 5000,
                height : "20vh"
            }}
        >
            <Slide
                background={{
                    backgroundImage :'url(./images/firstImage.jpg)',
                    backgroundAttachment :"fixed",

                }}
            />
            <Slide
                background={{
                    backgroundImage :'./images/toyota.jpg',
                    backgroundAttachment :"fixed",
                    
                }}
            />
            <Slide
                background={{
                    backgroundImage :'./images/toyota.jpg',
                    backgroundAttachment :"fixed",
                    
                }}
            />
            <Slide
                background={{
                    backgroundImage :'./images/toyota.jpg',
                    backgroundAttachment :"fixed",
                    
                }}
            />
        </Herolider>
        </div>
    )
};

export default ImageViewer;




