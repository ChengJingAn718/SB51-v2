import "../stylesheets/styles.css";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../components/BaseShot";
import { prePathUrl, setRepeatAudio, startRepeatAudio, stopRepeatAudio } from "../components/CommonFunctions"

import BaseImage from "../components/BaseImage"

var stepCount = 0;
var posFishList = [
    { x: 0.2, y: 0.4 },
    { x: 0.51, y: 0.22 },
    { x: 0.35, y: 0.22 },
    { x: 0.42, y: 0.39 }
]

var posComplexFishPaths = [
    { x: 0.51, y: 0.22 },
    { x: 0.35, y: 0.22 },
    { x: 0.42, y: 0.4 },


]

var movePos = { x: '0.15', y: '0.5' }
var currentPos = { x: '-0.2', y: '1' }
var timerList = []


var currentCharacterIndex = 0;
var leaveIndex = 0;
var currentEyeIndex = 0;
var isPlusing = true, isLeavePlusing = true;
var shellIndex = 0;
let timeInterval2, timeinterval3;


export default function Scene3({ nextFunc, _baseGeo }) {
    const audioList = useContext(UserContext)
    const [isBubbleShow, setBubbleShow] = useState(false)

    const refLetterList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const refShellList = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
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



    const characterList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const leavesList = [
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

    const refFish = useRef();

    setTimeout(() => {
        changePos();
    }, 100);

    useEffect(() => {
        movePos = { x: '0.15', y: '0.5' }
        currentPos = { x: '-0.2', y: '1' }

        currentCharacterIndex = 0;
        isPlusing = true;
        isLeavePlusing = true;
        currentEyeIndex = 0;
        shellIndex = 0;
        leaveIndex = 0;

        for (let i = 1; i < 4; i++) {
            characterList[i].current.setClass('character-disappear')
            eyeList[i].current.setClass('character-disappear')
            if (i != 3)
                leavesList[i].current.className = 'character-disappear'
        }

        const timeInterval = setInterval(() => {
            characterList[currentCharacterIndex].current.setClass('character-disappear')
            if (currentCharacterIndex > 2)
                currentCharacterIndex = 0;
            else
                currentCharacterIndex++

            characterList[currentCharacterIndex].current.setClass('character-appear')
        }, 150);

        setTimeout(() => {
            audioList.bubbleAudio.play();
        }, 2000);


        setTimeout(() => {
            setBubbleShow(true)
        }, 4000);

        const timeInterval4 = setInterval(() => {
            if (leavesList != null)
                leavesList[leaveIndex].current.className = 'character-disappear'
            if (isLeavePlusing) {
                if (leaveIndex > 1) {
                    isLeavePlusing = false
                    leaveIndex--
                }
                else
                    leaveIndex++
            }
            else {
                if (leaveIndex == 0) {
                    isLeavePlusing = true;

                }
                else
                    leaveIndex--
            }
            if (leavesList != null)
                leavesList[leaveIndex].current.className = 'character-appear'
        }, 300);


        const timeInterval1 = setInterval(() => {
            clearInterval(timeInterval2)
            timeInterval2 = setInterval(() => {
                if (eyeList != null)
                    eyeList[currentEyeIndex].current.setClass('character-disappear')
                if (isPlusing) {
                    if (currentEyeIndex > 1) {
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
                if (eyeList != null)
                    eyeList[currentEyeIndex].current.setClass('character-appear')

            }, 100);

        }, 3000);


        stepCount = 0;
        refFish.current.style.transform = 'rotateY(-180deg)'

        audioList.bodyAudio.src = prePathUrl() + "sounds/ep_51_audio_35.mp3"
        setRepeatAudio(audioList.bodyAudio)

        audioList.subBodyAudio.src = prePathUrl() + "sounds/ep_51_audio_37a.mp3"

        audioList.wordAudio1.src = prePathUrl() + "sounds/ep_51_audio_36.mp3"
        audioList.wordAudio2.src = prePathUrl() + "sounds/ep_51_audio_39.mp3"
        audioList.wordAudio3.src = prePathUrl() + "sounds/ep_51_audio_40.mp3"
        audioList.wordAudio4.src = prePathUrl() + "sounds/ep_51_audio_38.mp3"

        setTimeout(() => {
            refFish.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
            refFish.current.style.bottom = _baseGeo.height * currentPos.y + "px"
            refFish.current.style.transition = '1.5s'
        }, 200);

        setTimeout(() => {
            currentPos = movePos;
            changePos();
        }, 500);

        timerList[0] = setTimeout(() => {
            audioList.bodyAudio.play().catch(error => { })

            startRepeatAudio();
        }, 2000);

        for (let i = 0; i < 16; i++) {
            if (i % 4 == 0)
                refShellList[i].current.setClass('character-appear')
            else
                refShellList[i].current.setClass('character-disappear')
        }


        const timer1 = setTimeout(() => {
        }, 1000);

        return () => {
            clearTimeout(timer1)

            audioList.bubbleAudio.pause();
            audioList.bubbleAudio.currentTime = 0;

            clearInterval(timeInterval)
            clearInterval(timeInterval2)
            clearInterval(timeInterval1)
            clearInterval(timeInterval4)


        }
    }, [])


    function movingFunc() {
        currentPos = posFishList[stepCount]
        clearInterval(timeinterval3)
        shellIndex = 0;


        if (stepCount < 4) {

            if (stepCount > 0) {
                showingLetterList[stepCount - 1].current.className = 'bluehalf'
            }


            timeinterval3 = setInterval(() => {

                refShellList[shellIndex + (stepCount - 1) * 4].current.setClass('character-disappear')
                if (shellIndex > 2) {
                    clearInterval(timeinterval3)
                    refLetterList[stepCount - 1].current.className = 'show'
                }
                else {

                    shellIndex++
                }
                refShellList[shellIndex + (stepCount - 1) * 4].current.setClass('character-appear')


            }, 100);
        }
        stepCount++
        changePos();

    }
    function clickFishFunc() {

        stopRepeatAudio();


        refFish.current.style.pointerEvents = 'none'
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


            if (stepCount != 1)
                refFish.current.style.transition = '1s'
            else
                refFish.current.style.transition = '1.6s'

            if (stepCount > 0) {
                startRepeatAudio(5000, 7000)
                setTimeout(() => {
                    movingFunc();

                    if (stepCount == 3) {

                        for (let i = 0; i < 4; i++) {
                            characterList[i].current.setStyle([
                                { key: 'transform', value: 'rotateY(180deg)' },
                                { key: 'left', value: '0%' }
                            ])

                            eyeList[i].current.setStyle([
                                { key: 'transform', value: 'rotateY(180deg)' },
                                { key: 'left', value: '77.8%' }
                            ])
                        }
                        changePos();
                    }

                    if (stepCount == 4) {
                        for (let i = 0; i < 4; i++) {
                            characterList[i].current.setStyle([
                                { key: 'transform', value: 'rotateY(0deg)' },
                                { key: 'left', value: '0%' }
                            ])

                            eyeList[i].current.setStyle([
                                { key: 'transform', value: 'rotateY(0deg)' },
                                { key: 'left', value: '11.8%' }
                            ])
                        }
                        setTimeout(() => {
                            changePos();
                        }, 500);
                    }
                }, 2400);
            }
            else {

                setRepeatAudio(audioList.subBodyAudio)
                startRepeatAudio()
                movingFunc();
            }

        }

        else {
            audioList.wordAudio4.play().catch(error => { });
            refLetterList[3].current.style.pointerEvents = 'none'
            setTimeout(() => {
                audioList.wordAudio4.pause();
                audioList.wordAudio4.currentTime = 0
                audioList.wordAudio4.play().catch(error => { });
                audioList.wordAudio4.play();
                setTimeout(() => {
                    audioList.wordAudio2.play();
                    setTimeout(() => {
                        audioList.wordAudio3.play();
                        setTimeout(() => {
                            audioList.wordAudio1.play();
                        }, 3200);
                    }, 3000);
                }, 3000);

                showingLetterList[3].current.className = 'bluecomeback scaleText'
                setTimeout(() => {
                    showingLetterList[3].current.className = 'bluecomeback normalText'
                }, 2000);

                setTimeout(() => {
                    refLetterList[3].current.style.pointerEvents = 'none'

                    showingLetterList[1].current.className = 'bluecomeback scaleText'
                    setTimeout(() => {
                        showingLetterList[1].current.className = 'bluecomeback normalText'
                    }, 2000);

                    currentPos = posComplexFishPaths[0]
                    changePos();

                    setTimeout(() => {
                        for (let i = 0; i < 4; i++) {
                            characterList[i].current.setStyle([
                                { key: 'transform', value: 'rotateY(180deg)' },
                                { key: 'left', value: '0%' }
                            ])

                            eyeList[i].current.setStyle([
                                { key: 'transform', value: 'rotateY(180deg)' },
                                { key: 'left', value: '77.8%' }
                            ])
                        }

                        currentPos = posComplexFishPaths[1]
                        changePos();

                        showingLetterList[2].current.className = 'bluecomeback scaleText'
                        setTimeout(() => {
                            showingLetterList[2].current.className = 'bluecomeback normalText'
                        }, 2000);



                    }, 3000);

                    setTimeout(() => {
                        currentPos = posComplexFishPaths[2]
                        changePos();

                        showingLetterList[0].current.className = 'bluecomeback scaleText'
                        setTimeout(() => {
                            showingLetterList[0].current.className = 'bluecomeback normalText'
                        }, 2000);
                    }, 6000);

                    setTimeout(() => {
                        nextFunc();
                    }, 10000);
                }, 2000);

            }, 2400);



        }

    }

    function changePos() {
        refFish.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
        refFish.current.style.bottom = _baseGeo.height * currentPos.y + "px"
    }


    return (
        <div className="aniObject">


            <div style={{
                position: "fixed", width: _baseGeo.width * 0.15 + "px",
                height: _baseGeo.width * 0.225 + "px"
                , left: _baseGeo.left + _baseGeo.width * 0.52 + "px",
                bottom: _baseGeo.height * 0.29 + "px",
            }}>
                <BaseImage
                    ref={refShellList[12]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_01.svg"}
                />
                <BaseImage
                    ref={refShellList[13]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_02.svg"}
                />
                <BaseImage
                    ref={refShellList[14]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_03.svg"}
                />
                <BaseImage
                    ref={refShellList[15]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_04.svg"}
                />
            </div>



            <div style={{
                position: "fixed", width: _baseGeo.width * 0.15 + "px",
                height: _baseGeo.width * 0.225 + "px"
                , left: _baseGeo.left + _baseGeo.width * 0.315 + "px",
                bottom: _baseGeo.height * 0.29 + "px",
            }}>
                <BaseImage
                    ref={refShellList[0]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_01.svg"}
                />
                <BaseImage
                    ref={refShellList[1]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_02.svg"}
                />
                <BaseImage
                    ref={refShellList[2]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_03.svg"}
                />
                <BaseImage
                    ref={refShellList[3]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_04.svg"}
                />
            </div>

            {/* letter  - on */}
            <div

                className="hide" ref={refLetterList[0]}>

                <div
                    onClick={clickFishFunc}
                    className="commonButton"
                    ref={showingLetterList[0]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.15 + "px",
                        height: _baseGeo.width * 0.15 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.31 + "px",
                        bottom: _baseGeo.height * 0.36 + "px",
                    }}>
                    <img draggable={false} width={"80%"}
                        style={{ position: 'absolute', left: '7%', top: '8%' }}
                        src={prePathUrl() + "images/sb51_text_interactive/artboard_13.svg"}
                    />
                </div>
            </div>


            {/* Fish */}
            <div
                onClick={clickFishFunc}

                ref={refFish} style={{
                    position: "fixed", width: _baseGeo.width * 0.12 + "px",
                    height: _baseGeo.width * 0.09 + "px",
                    cursor: 'pointer'
                }}>

                <BaseImage
                    ref={characterList[0]}
                    url={"animations/sb_51_fish/fish_01.svg"}
                />
                <BaseImage
                    ref={characterList[1]}
                    url={"animations/sb_51_fish/fish_02.svg"}
                />
                <BaseImage
                    ref={characterList[2]}
                    url={"animations/sb_51_fish/fish_03.svg"}
                />
                <BaseImage
                    ref={characterList[3]}
                    url={"animations/sb_51_fish/fish_04.svg"}
                />
                <BaseImage
                    ref={eyeList[0]}
                    posInfo={{ l: 0.115, t: 0.34 }}
                    scale={0.11}
                    url={"animations/sb_51_fish/fish_eye_4open.svg"}
                />

                <BaseImage
                    ref={eyeList[1]}
                    posInfo={{ l: 0.115, t: 0.34 }}
                    scale={0.11}
                    url={"animations/sb_51_fish/fish_eye_3midle_b.svg"}
                />
                <BaseImage
                    ref={eyeList[2]}
                    posInfo={{ l: 0.115, t: 0.34 }}
                    scale={0.11}
                    url={"animations/sb_51_fish/fish_eye_2close.svg"}
                />
                <BaseImage
                    ref={eyeList[3]}
                    posInfo={{ l: 0.115, t: 0.34 }}
                    scale={0.11}
                    url={"animations/sb_51_fish/fish_eye_4open.svg"}
                />

            </div>

            <div style={{
                position: "fixed", width: _baseGeo.width * 0.17 + "px",
                height: _baseGeo.width * 0.26 + "px"
                , left: _baseGeo.left + _baseGeo.width * 0.19 + "px",
                bottom: _baseGeo.height * 0.1 + "px",
            }}>
                <BaseImage
                    ref={refShellList[8]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_01.svg"}
                />
                <BaseImage
                    ref={refShellList[9]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_02.svg"}
                />
                <BaseImage
                    ref={refShellList[10]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_03.svg"}
                />
                <BaseImage
                    ref={refShellList[11]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_04.svg"}
                />
            </div>

            <div style={{
                position: "fixed", width: _baseGeo.width * 0.17 + "px",
                height: _baseGeo.width * 0.26 + "px"
                , left: _baseGeo.left + _baseGeo.width * 0.63 + "px",
                bottom: _baseGeo.height * 0.1 + "px",
            }}>
                <BaseImage
                    ref={refShellList[4]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_01.svg"}
                />
                <BaseImage
                    ref={refShellList[5]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_02.svg"}
                />
                <BaseImage
                    ref={refShellList[6]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_03.svg"}
                />
                <BaseImage
                    ref={refShellList[7]}
                    url={"animations/sb_51_sea_shell/sb_51_sea_shell_04.svg"}
                />
            </div>
            {/* letter - it */}
            <div
                className="hide" ref={refLetterList[2]}>
                <div
                    onClick={clickFishFunc}
                    className="commonButton"
                    ref={showingLetterList[2]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.17 + "px",
                        height: _baseGeo.width * 0.17 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.19 + "px",
                        bottom: _baseGeo.height * 0.20 + "px",
                    }}>
                    <img draggable={false} width={"75%"}
                        style={{ position: 'absolute', left: '8%', top: '20%' }}
                        src={prePathUrl() + "images/sb51_text_interactive/artboard_15.svg"}
                    />
                </div>
            </div >

            {/* letter - up */}
            < div

                className="hide" ref={refLetterList[1]} >

                <div
                    onClick={clickFishFunc}
                    className="commonButton"
                    ref={showingLetterList[1]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.17 + "px",
                        height: _baseGeo.width * 0.17 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.63 + "px",
                        bottom: _baseGeo.height * 0.20 + "px",
                    }}>
                    <img draggable={false} width={"70%"}
                        style={{ position: 'absolute', left: '4%', top: '15%' }}
                        src={prePathUrl() + "images/sb51_text_interactive/artboard_14.svg"}
                    />
                </div>
            </div >

            {/* letter - in */}

            <div
                className="hide" ref={refLetterList[3]}>
                <div
                    onClick={clickFishFunc}
                    className="commonButton"
                    ref={showingLetterList[3]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.15 + "px",
                        height: _baseGeo.width * 0.15 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.518 + "px",
                        bottom: _baseGeo.height * 0.37 + "px",
                    }}>
                    <BaseImage
                        scale={0.8}
                        posInfo={{ l: 0.00, t: 0.13 }}
                        url={"sb51_text_interactive/artboard_12.svg"}
                    />
                </div>
            </div>


            {/* seas */}
            < div style={{ pointerEvents: 'none' }
            }>
                <div style={{
                    position: "fixed", width: _baseGeo.width * 1 + "px"
                    , left: _baseGeo.left + "px",
                    bottom: 0 + "px",
                }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/animations/sea/bg/sb_51_sea_fg_01.svg"}
                    />
                </div>

                <div
                    ref={leavesList[0]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 1 + "px"
                        , left: _baseGeo.left + "px",
                        bottom: 0 + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/animations/sea/bg/plant_animate_01.svg"}
                    />
                </div>

                <div
                    ref={leavesList[1]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 1 + "px"
                        , left: _baseGeo.left + "px",
                        bottom: 0 + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/animations/sea/bg/plant_animate_02.svg"}
                    />
                </div>
                <div
                    ref={leavesList[2]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 1 + "px"
                        , left: _baseGeo.left + "px",
                        bottom: 0 + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/animations/sea/bg/plant_animate_03.svg"}
                    />
                </div>

                {
                    isBubbleShow && <div>

                        <div className="bubble" style={{
                            position: "fixed", width: _baseGeo.width * 0.08 + "px"
                            , left: _baseGeo.left + _baseGeo.width * 0.64 + "px",
                            bottom: _baseGeo.height * 0.24 + "px",
                        }}>
                            <img draggable={false} width={"100%"}
                                src={prePathUrl() + "images/animations/sea/bubbles/sb_51_sea_bg_bubble_01.svg"}
                            />
                        </div>

                        <div className="bubble1" style={{
                            position: "fixed", width: _baseGeo.width * 0.04 + "px"
                            , left: _baseGeo.left + _baseGeo.width * 0.24 + "px",
                            bottom: _baseGeo.height * 0.04 + "px",
                        }}>
                            <img draggable={false} width={"100%"}
                                src={prePathUrl() + "images/animations/sea/bubbles/sb_51_sea_bg_bubble1.svg"}
                            />
                        </div>


                    </div>
                }


                <div className="bubble1" style={{
                    position: "fixed", width: _baseGeo.width * 0.04 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.34 + "px",
                    bottom: _baseGeo.height * 0.14 + "px",
                }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/animations/sea/bubbles/sb_51_sea_bg_bubble1.svg"}
                    />
                </div>



                <div className="bubble1" style={{
                    position: "fixed", width: _baseGeo.width * 0.04 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.64 + "px",
                    bottom: _baseGeo.height * 0.24 + "px",
                }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/animations/sea/bubbles/sb_51_sea_bg_bubble1.svg"}
                    />
                </div>



                <div className="bubble" style={{
                    position: "fixed", width: _baseGeo.width * 0.08 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.04 + "px",
                    bottom: _baseGeo.height * 0.04 + "px",
                }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/animations/sea/bubbles/sb_51_sea_bg_bubble_03.svg"}
                    />
                </div>
            </div >



        </div >
    );
}
