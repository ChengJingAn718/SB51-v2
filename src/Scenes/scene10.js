import React, { useEffect, useContext, useRef } from 'react';
import "../stylesheets/styles.css";
import BaseImage from '../components/BaseImage';
import { prePathUrl } from "../components/CommonFunctions"
import { UserContext } from '../components/BaseShot';

let timerList = []
var currentEyeIndex = 0;
var isPlusing = true;
let timeInterval2

export default function Scene2({ nextFunc, _geo, isOneStepFinished, completedCount }) {
    const audioList = useContext(UserContext)

    const eyeList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]


    useEffect(
        () => {

            isPlusing = true;
            currentEyeIndex = 0;
            for (let i = 1; i < 4; i++)
                eyeList[i].current.setClass('character-disappear')

            const timeInterval1 = setInterval(() => {
                timeInterval2 = setInterval(() => {

                    eyeList[currentEyeIndex].current.setClass('character-disappear')
                    if (isPlusing) {
                        if (currentEyeIndex > 2) {
                            isPlusing = false
                            currentEyeIndex--
                        }
                        else
                            currentEyeIndex++
                    }
                    else {
                        if (currentEyeIndex == 0) {
                            isPlusing = true;
                            clearInterval(timeInterval2)
                        }
                        else
                            currentEyeIndex--
                    }

                    eyeList[currentEyeIndex].current.setClass('character-appear')

                }, 100);

            }, 2500);


            timerList = []
            console.log(completedCount, isOneStepFinished)
            if (completedCount == 2) {
                if (isOneStepFinished) {
                    audioList.bodyAudio.src = prePathUrl() + "sounds/ep_51_audio_23.mp3"
                    timerList[0] = setTimeout(() => {
                        audioList.bodyAudio.play()
                    }, 2000);

                    timerList[0] = setTimeout(() => {
                        nextFunc();
                    }, 9000);


                }
                else {
                    audioList.bodyAudio.src = prePathUrl() + "sounds/ep_51_audio_30.mp3"
                    timerList[0] = setTimeout(() => {
                        audioList.bodyAudio.play()
                    }, 2000);

                    timerList[1] = setTimeout(() => {
                        nextFunc()
                    }, 8000);
                }
            }
            else {
                if (isOneStepFinished) {
                    audioList.subBodyAudio.src = prePathUrl() + "sounds/ep_51_audio_33.mp3"
                    audioList.subBodyAudio.play();
                    timerList[2] = setTimeout(() => {
                        nextFunc();
                    }, 6000);
                }
                else {
                    audioList.bodyAudio.src = prePathUrl() + "sounds/ep_51_audio_23.mp3"
                    timerList[0] = setTimeout(() => {
                        audioList.bodyAudio.play();
                    }, 2000);

                    timerList[1] = setTimeout(() => {
                        nextFunc();
                    }, 7500);
                }
            }

            return () => {
                audioList.bodyAudio.pause();
                audioList.subBodyAudio.pause();
                for (let i = 0; i < timerList.length; i++)
                    clearTimeout(timerList[i])

                clearInterval(timeInterval1)
                clearInterval(timeInterval2)
            }
        }, []
    )


    return (
        <div className="aniObject"
        >

            <div style={{
                position: "fixed", width: _geo.width * 0.25 + "px",
                height: _geo.width * 0.25 + "px"
                , left: _geo.left + _geo.width * 0.4 + "px",
                bottom: _geo.top + _geo.height * 0.2 + "px",
            }}>
                <BaseImage
                    scale={0.7}
                    posInfo={{ l: 0.2 }}
                    url={"animations/sb_51_girl_eye/sb_51_girl.svg"}
                />
                <BaseImage
                    url={"animations/sb_51_girl_eye/sb_51_girl_eye_01.svg"}
                    scale={0.247}
                    posInfo={{ l: 0.41, t: 0.24 }}
                    ref={eyeList[0]}
                />
                <BaseImage
                    url={"animations/sb_51_girl_eye/sb_51_girl_eye_02.svg"}
                    scale={0.247}
                    posInfo={{ l: 0.41, t: 0.24 }}
                    ref={eyeList[1]}
                />
                <BaseImage
                    url={"animations/sb_51_girl_eye/sb_51_girl_eye_03.svg"}
                    scale={0.247}
                    posInfo={{ l: 0.41, t: 0.24 }}
                    ref={eyeList[2]}
                />
                <BaseImage
                    url={"animations/sb_51_girl_eye/sb_51_girl_eye_04.svg"}
                    scale={0.247}
                    posInfo={{ l: 0.41, t: 0.24 }}
                    ref={eyeList[3]}
                />

            </div>

            <div
                className='commonButton'

                onClick={() => {
                    setTimeout(() => {
                        nextFunc();
                    }, 200);
                }}

                style={{
                    position: "fixed", width: _geo.width * 0.08 + "px",
                    height: _geo.width * 0.08 + "px",
                    right: "5%"
                    , bottom: "5%", cursor: "pointer",
                }}>
                <img draggable={false}
                    width={"100%"}
                    src={prePathUrl() + 'images/buttons/skip_blue.svg'}
                />
            </div>

        </div>
    );
}
