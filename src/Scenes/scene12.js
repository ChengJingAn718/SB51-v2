import "../stylesheets/styles.css";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../components/BaseShot";
import { getMaskStyle } from "../components/CommonFunctions";
import BaseImage from "../components/BaseImage";
import { prePathUrl, startRepeatAudio, stopRepeatAudio, setRepeatAudio } from "../components/CommonFunctions"

var stepCount = 0;
var posFrogList = [
    { x: 0.21, y: 0.15 },
    { x: 0.39, y: 0.18 },
    { x: 0.57, y: 0.1 },
    { x: 0.79, y: 0.15 },
]

var posComplexFrogPaths = [
    { x: 0.69, y: 0.15 },
    { x: 0.52, y: 0.1 },
    { x: 0.36, y: 0.18 },
    { x: 0.16, y: 0.15 }
]

var movePos = { x: 0.122, y: 0.23 }
var currentPos = { x: -0.05, y: 0.3 }

var timerList = []

var currentCharacterIndex = 0;
var currentEyeIndex = 0;
var isPlusing = true;
let timeInterval2, timeInterval, timeInterval1


export default function Scene3({ nextFunc, _baseGeo }) {

    const audioList = useContext(UserContext)

    const refLetterList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const characterList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const showingLetterList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]


    const eyeList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]


    const refFrog = useRef();

    setTimeout(() => {
        changePos(currentPos);
    }, 100);

    function startEyeAni() {
        if (eyeList[currentEyeIndex].current != null)
            timeInterval1 = setInterval(() => {
                clearInterval(timeInterval2)
                if (eyeList[currentEyeIndex].current != null)
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
            }, 2000);
    }

    useEffect(() => {

        movePos = { x: 0.122, y: 0.23 }
        currentPos = { x: -0.05, y: 0.3 }


        currentCharacterIndex = 0;
        isPlusing = true;
        currentEyeIndex = 0;

        for (let i = 1; i < 4; i++) {
            characterList[i].current.setClass('character-disappear')

        }
        for (let i = 0; i < 4; i++)
            eyeList[i].current.setClass('character-disappear')

        // startEyeAni();

        stepCount = 0;

        audioList.bodyAudio.src = prePathUrl() + "sounds/ep_51_audio_25.mp3"
        setRepeatAudio(audioList.bodyAudio)
        
        audioList.subBodyAudio.src = prePathUrl() + "sounds/ep_51_audio_37a.mp3"

        audioList.wordAudio1.src = prePathUrl() + "sounds/ep_51_audio_26.mp3"
        audioList.wordAudio2.src = prePathUrl() + "sounds/ep_51_audio_27.mp3"
        audioList.wordAudio3.src = prePathUrl() + "sounds/ep_51_audio_28.mp3"
        audioList.wordAudio4.src = prePathUrl() + "sounds/ep_51_audio_29.mp3"

        refFrog.current.style.display = 'none'
        refFrog.current.style.transform = 'rotateY(-180deg)'

        setTimeout(() => {
            refFrog.current.style.display = 'inline-block'
            refFrog.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
            refFrog.current.style.bottom = _baseGeo.height * currentPos.y + "px"
            refFrog.current.style.transition = '1.2s ease-in-out'
        }, 200);

        setTimeout(() => {
            changePos(movePos, true);
        }, 1000);

        timerList[0] = setTimeout(() => {
            audioList.bodyAudio.play().catch(error => { })
            
            startRepeatAudio();

        }, 2400);

        return () => {
            clearInterval(timeInterval)
            clearInterval(timeInterval2)
            clearInterval(timeInterval1)

            stopRepeatAudio()
        }
    }, [])


    function movingFunc() {
        clearInterval(timeInterval1)
        clearInterval(timeInterval2)

        for (let i = 0; i < 4; i++)
            eyeList[i].current.setClass('character-disappear')

        if (stepCount < 4) {
            refLetterList[stepCount].current.className = 'show'
            changePos(posFrogList[stepCount], true);

            stepCount++;
            if (stepCount > 1) {
                refLetterList[stepCount - 2].current.style.pointerEvents = 'none'
                showingLetterList[stepCount - 2].current.className = 'bluehalf'
            }
        }

    }
    function clickFrogFunc() {

        stopRepeatAudio()

        refFrog.current.style.pointerEvents = 'none'
        audioList.clickAudio.currentTime = 0
        audioList.clickAudio.play().catch(error => { })
        if (stepCount > 0)
            refLetterList[stepCount - 1].current.style.pointerEvents = 'none'

        if (stepCount < 4) {
            switch (stepCount) {
                case 0: timerList[1] = setTimeout(() => {
                    audioList.subBodyAudio.play().catch(error => { });
                }, 1000);
                    audioList.bodyAudio.pause();
                    clearTimeout(timerList[0])
                    break;
                case 1: audioList.subBodyAudio.pause(); clearTimeout(timerList[1]); audioList.wordAudio1.play().catch(error => { }); break;
                case 2: audioList.wordAudio2.play().catch(error => { }); break;
                case 3: audioList.wordAudio3.play().catch(error => { }); break;
                default:
                    break;
            }

            if (stepCount > 0) {

                startRepeatAudio(4000, 7000)
                setTimeout(movingFunc, 2000);

            }
            else {
                setRepeatAudio(audioList.subBodyAudio)
                startRepeatAudio();
                movingFunc();
            }
        }
        else {
            audioList.wordAudio4.play().catch(error => { });
            refLetterList[3].current.style.pointerEvents = 'none'
            setTimeout(() => {
                refLetterList[3].current.style.pointerEvents = 'none'
                refFrog.current.style.transition = '0.3s ease-in-out'
                refFrog.current.style.transform = 'rotateY(0deg)'

                audioList.wordAudio4.pause();
                audioList.wordAudio4.currentTime = 0
                audioList.wordAudio4.play().catch(error => { });

                for (let i = 0; i < 4; i++)
                    eyeList[i].current.setClass('character-disappear')

                clearInterval(timeInterval1)
                clearInterval(timeInterval2)

                showingLetterList[3].current.className = 'bluecomeback scaleText'
                setTimeout(() => {
                    showingLetterList[3].current.className = 'bluecomeback normalText'
                }, 2500);

                changePos(posComplexFrogPaths[0], true, true);

                setTimeout(() => {
                    audioList.wordAudio4.play();
                    setTimeout(() => {
                        audioList.wordAudio3.play();
                        setTimeout(() => {
                            audioList.wordAudio2.play();
                            setTimeout(() => {
                                audioList.wordAudio1.play();
                            }, 3000);
                        }, 3000);

                    }, 3000);

                }, 300);


                setTimeout(() => {
                    refFrog.current.style.transition = '0.3s ease-in-out'


                    showingLetterList[2].current.className = 'bluecomeback scaleText'
                    setTimeout(() => {
                        showingLetterList[2].current.className = 'bluecomeback normalText'
                    }, 2000);


                    changePos(posComplexFrogPaths[1], true, true);
                }, 3000);
                setTimeout(() => {
                    showingLetterList[1].current.className = 'bluecomeback scaleText'
                    setTimeout(() => {
                        showingLetterList[1].current.className = 'bluecomeback normalText'
                    }, 2500);

                    changePos(posComplexFrogPaths[2], true, true);
                }, 6000);
                setTimeout(() => {
                    showingLetterList[0].current.className = 'bluecomeback scaleText'
                    setTimeout(() => {
                        showingLetterList[0].current.className = 'bluecomeback normalText'
                    }, 2500);


                    changePos(posComplexFrogPaths[3], true, true, true);
                }, 9000);
                setTimeout(() => {
                    nextFunc();
                }, 14000);
            }, 2000);

        }

    }

    function changePos(pos, isJump = false, isFinished = false) {


        for (let i = 0; i < 4; i++)
            eyeList[i].current.setClass('character-disappear')
        currentCharacterIndex = 0;
        currentEyeIndex = 0;

        if (isJump) {

            characterList[currentCharacterIndex].current.setClass('character-disappear')
            if (currentCharacterIndex > 2)
                currentCharacterIndex = 0;
            else
                currentCharacterIndex++

            characterList[currentCharacterIndex].current.setClass('character-appear')
            clearInterval(timeInterval)

            timeInterval = setInterval(() => {
                characterList[currentCharacterIndex].current.setClass('character-disappear')
                if (currentCharacterIndex > 2) {
                    clearInterval(timeInterval)
                    currentCharacterIndex = 0
                    if (!isFinished) {
                        startEyeAni();
                        eyeList[0].current.setClass('character-appear')
                    }
                }
                else
                    currentCharacterIndex++

                characterList[currentCharacterIndex].current.setClass('character-appear')
            }, 150);


            var xValue = (pos.x - currentPos.x) * 0.7 + currentPos.x;
            let middlePos = {
                x: xValue,
                y: 0.1 + currentPos.y
            }

            currentPos = pos
            refFrog.current.style.transition = '0.3s'
            refFrog.current.style.left = _baseGeo.left + _baseGeo.width * middlePos.x + "px"
            refFrog.current.style.bottom = _baseGeo.height * middlePos.y + "px"
            setTimeout(() => {

                refFrog.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
                refFrog.current.style.bottom = _baseGeo.height * currentPos.y + "px"
            }, 300);
        }
        else {
            currentPos = pos
            refFrog.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
            refFrog.current.style.bottom = _baseGeo.height * currentPos.y + "px"
        }
    }


    return (
        <div className="aniObject">
            {/* letter  - at */}
            <div

                className="hide" ref={refLetterList[0]}>

                <div
                    onClick={clickFrogFunc}
                    className="playBtn"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.26 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.155 + "px",
                        bottom: _baseGeo.height * 0.48 + "px",
                        
                        overflow: 'hidden'
                    }}>

                    <div
                        ref={showingLetterList[0]}
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.16 + "px",
                            height: _baseGeo.width * 0.16 + "px"
                            , left: _baseGeo.width * 0.06 + "px",
                            bottom: _baseGeo.height * 0.02 + "px",
                        }}>

                        <div style={getMaskStyle({ url: 'sb51_text_interactive/artboard_9', scale: 120 })}>
                        </div>
                    </div>
                </div>
            </div>

            {/* letter - an */}
            <div
                className="hide" ref={refLetterList[1]}>

                <div
                    onClick={clickFrogFunc}
                    className="playBtn"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.26 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.355 + "px",
                        bottom: _baseGeo.height * 0.45 + "px",
                        
                        overflow: 'hidden'
                    }}>
                    <div
                        ref={showingLetterList[1]}
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.16 + "px",
                            height: _baseGeo.width * 0.16 + "px"
                            , left: _baseGeo.width * 0.04 + "px",
                            bottom: _baseGeo.height * 0.05 + "px",
                            overflow: 'hidden'
                        }}>

                        <div style={getMaskStyle({ url: 'sb51_text_interactive/artboard_11', scale: 120 })}>
                        </div>
                    </div>
                </div>
            </div>
            {/* letter - am */}
            <div
                className="hide" ref={refLetterList[2]}>
                <div
                    onClick={clickFrogFunc}
                    className="playBtn"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.26 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.5 + "px",
                        bottom: _baseGeo.height * 0.38 + "px",
                        
                    }}>
                    <div
                        ref={showingLetterList[2]}
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.15 + "px",
                            height: _baseGeo.width * 0.15 + "px"
                            , left: _baseGeo.width * 0.06 + "px",
                            bottom: _baseGeo.height * 0.04 + "px",
                        }}>
                        <div style={getMaskStyle({ url: 'sb51_text_interactive/artboard_10', scale: 120 })}>
                        </div>
                    </div>
                </div>
            </div>

            {/* letter - in */}
            <div

                className="hide" ref={refLetterList[3]}>
                <div
                    onClick={clickFrogFunc}
                    className="playBtn"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px",
                        height: _baseGeo.width * 0.14 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.75 + "px",
                        bottom: _baseGeo.height * 0.4 + "px",
                        
                    }}>
                    <div
                        ref={showingLetterList[3]}
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.15 + "px",
                            height: _baseGeo.width * 0.15 + "px"
                            , left: _baseGeo.width * -0.03 + "px",
                            bottom: _baseGeo.height * -0.00 + "px",
                            overflow: 'hidden'
                        }}>
                        <div style={getMaskStyle({ url: 'sb51_text_interactive/artboard_12', scale: 120 })}>
                        </div>
                    </div>
                </div>
            </div>

            {/* Frog */}
            <div
                onClick={clickFrogFunc}
                ref={refFrog} style={{
                    position: "fixed", width: _baseGeo.width * 0.15 + "px"
                    , height: _baseGeo.width * 0.15 + "px",
                    cursor: 'pointer'
                    , transition: '0.6s',
                }}>

                <BaseImage
                    ref={characterList[0]}
                    posInfo={{ l: 0.3, t: 0.11 }}
                    url={"animations/sb_51_frog/sb_51_frog_01.svg"}
                    style={{ transform: 'rotateY(180deg)' }}
                />
                <BaseImage
                    ref={characterList[1]}
                    posInfo={{ l: 0.3, t: 0.11 }}
                    url={"animations/sb_51_frog/sb_51_frog_02.svg"}
                    style={{ transform: 'rotateY(180deg)' }}
                />
                <BaseImage
                    ref={characterList[2]}
                    posInfo={{ l: 0.3, t: 0.11 }}
                    url={"animations/sb_51_frog/sb_51_frog_03.svg"}
                    style={{ transform: 'rotateY(180deg)' }}
                />
                <BaseImage
                    ref={characterList[3]}
                    posInfo={{ l: 0.3, t: 0.11 }}
                    url={"animations/sb_51_frog/sb_51_frog_04.svg"}
                    style={{ transform: 'rotateY(180deg)' }}
                />

                <BaseImage
                    ref={eyeList[0]}
                    posInfo={{ l: 0.457, t: 0.355 }}
                    scale={0.32}
                    url={"animations/sb_51_frog/frog_eyes_01.svg"}
                />

                <BaseImage
                    ref={eyeList[1]}
                    posInfo={{ l: 0.457, t: 0.355 }}
                    scale={0.32}
                    url={"animations/sb_51_frog/frog_eyes_02.svg"}
                />
                <BaseImage
                    ref={eyeList[2]}
                    posInfo={{ l: 0.457, t: 0.355 }}
                    scale={0.32}
                    url={"animations/sb_51_frog/frog_eyes_03.svg"}
                />
                <BaseImage
                    ref={eyeList[3]}
                    posInfo={{ l: 0.457, t: 0.355 }}
                    scale={0.32}
                    url={"animations/sb_51_frog/frog_eyes_04.svg"}
                />

            </div>



        </div >
    );
}
