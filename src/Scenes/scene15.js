import "../stylesheets/styles.css";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../components/BaseShot";
import { startRepeatAudio, stopRepeatAudio, prePathUrl } from "../components/CommonFunctions"

import BaseImage from "../components/BaseImage"

var varCurrentStep = 0;
var varAnswerList = [0, 0, 1, 1]

var movePos = { x: 0.75, y: 0.23 }
var currentPos = { x: 1.2, y: 0.1 }

var defaultPos = { x: 0.75, y: 0.2 }

var timerList = []
var correctAudioList = []

var currentCharacterIndex = 0;
var currentEyeIndex = 0;
var isPlusing = true;
var shellIndex = 0;
let timeInterval2

var leaveIndex = 0;
var isLeavePlusing = true;

let randomList = []

export default function Scene3({ nextFunc, _geo, startTransition, _baseGeo }) {

    const audioList = useContext(UserContext)
    const markList = [useRef(), useRef(), useRef(), useRef()]
    const [isBubbleShow, setBubbleShow] = useState(false)

    const refLetterIt = useRef()
    const refLetterOnDown = useRef()
    const refLetterOnUp = useRef()
    const refLetterUp = useRef()
    const refLetterIn = useRef()

    const parentRef = useRef()

    const wrongLetterList = [
        refLetterIt,
        refLetterIt,
        refLetterUp,
        refLetterUp
    ]



    const showingPairList = [
        [refLetterIt, refLetterOnDown],
        [refLetterIt, refLetterIn],
        [refLetterIt, refLetterUp],
        [refLetterUp, refLetterOnUp]
    ]


    const refFish = useRef();
    const characterList = [
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


    const leavesList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]


    useEffect(() => {

        randomList = []

        while (randomList.length != 4) {
            let randomNumber = Math.floor(Math.random() * 4);
            if (!randomList.includes(randomNumber))
                randomList.push(randomNumber)
        }

        movePos = { x: 0.75, y: 0.23 }
        currentPos = { x: 1.2, y: 0.1 }

        currentCharacterIndex = 0;
        isPlusing = true;
        isLeavePlusing = true;
        currentEyeIndex = 0;
        shellIndex = 0;
        leaveIndex = 0;

        parentRef.current.style.pointerEvents = 'none'


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


        varCurrentStep = 0;

        parentRef.current.style = 'none'
        audioList.bodyAudio.src = prePathUrl() + "sounds/ep_51_audio_31.mp3"
        correctAudioList = [
            audioList.wordAudio1,
            audioList.wordAudio4,
            audioList.wordAudio3,
            audioList.wordAudio1
        ]

        wrongLetterList.map((ref) => {
            ref.current.style.transition = '0.3s'
        })


        setTimeout(() => {
            // currentPos = posComplexFishPaths[stepCount];
            currentPos = movePos;
            refFish.current.style.transition = '1s'
            changePos();
        }, 500);

        timerList[0] = setTimeout(() => {
            audioList.bodyAudio.play().catch(error => { })
            timerList[1] = setTimeout(() => {

                correctAudioList[randomList[0]].play().catch(error => { })
                startRepeatAudio();
                parentRef.current.style = ''

            }, audioList.bodyAudio.duration * 1000 + 300);
        }, 1800);


        setTimeout(() => {
            showingPairList[randomList[0]][0].current.className = 'appear'
            showingPairList[randomList[0]][1].current.className = 'appear'
        }, 1000);


        setTimeout(() => {
            audioList.bubbleAudio.play();
        }, 2000);

        return () => {
            clearInterval(timeInterval)
            clearInterval(timeInterval2)
            clearInterval(timeInterval1)
            clearInterval(timeInterval4)

            stopRepeatAudio()

            audioList.bubbleAudio.pause();
            audioList.bubbleAudio.currentTime = 0;

            for (let i = 0; i < timerList.length; i++)
                clearTimeout(timerList[i])
        }


    }, [])

    setTimeout(() => {
        changePos();
    }, 100);


    function changePos() {
        refFish.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
        refFish.current.style.bottom = _baseGeo.height * currentPos.y + "px"
    }

    function funcClick(isUpClicked = true) {

        stopRepeatAudio();

        clearTimeout(timerList[0])
        clearTimeout(timerList[1])

        correctAudioList[randomList[varCurrentStep]].pause()
        audioList.bodyAudio.pause();

        audioList.buzzAudio.pause()
        wrongLetterList[randomList[varCurrentStep]].current.className = 'show commonButton'
        clearTimeout(timerList[3])

        if (varAnswerList[randomList[varCurrentStep]] == isUpClicked) {
            parentRef.current.style.pointerEvents = 'none'
            correctAudioList[randomList[varCurrentStep]].pause()
            audioList.tingAudio.play().catch(event => { })

            wrongLetterList[randomList[varCurrentStep]].current.className = 'hide'
            markList[varCurrentStep].current.setUrl('sb_51_icons/sb_15_icon_yellowstar' + '.svg')

            // let aniNum = isUpClicked ? 1 : 0;
            // playFishAnimation(fishAniPosList[aniNum])
            setTimeout(() => {

                if (varCurrentStep < 3) {

                    refLetterIt.current.className = 'hide'
                    refLetterOnDown.current.className = 'hide'
                    refLetterOnUp.current.className = 'hide'
                    refLetterUp.current.className = 'hide'
                    refLetterIn.current.className = 'hide'



                    if (randomList[varCurrentStep + 1] == 0) {
                        refLetterOnDown.current.className = 'appear'
                        refLetterIt.current.className = 'appear'
                    }

                    if (randomList[varCurrentStep + 1] == 1) {
                        setTimeout(() => {
                            refLetterIt.current.className = 'appear'
                            refLetterIn.current.className = 'appear'
                        }, 200);

                    }

                    if (randomList[varCurrentStep + 1] == 2) {
                        setTimeout(() => {
                            refLetterIt.current.className = 'appear'
                            refLetterUp.current.className = 'appear'
                        }, 200);

                    }

                    if (randomList[varCurrentStep + 1] == 3) {
                        setTimeout(() => {
                            refLetterUp.current.className = 'appear'
                            refLetterOnUp.current.className = 'appear'
                        }, 200);
                    }

                    startRepeatAudio()

                }
                else
                    setTimeout(() => {
                        nextFunc();
                    }, 2500);
                varCurrentStep++;

                if (varCurrentStep < 4) {
                    setTimeout(() => {
                        correctAudioList[randomList[varCurrentStep]].play().catch(event => { })
                        setTimeout(() => {
                            parentRef.current.style.pointerEvents = ''
                            startRepeatAudio()
                        }, 1000);
                    }, 800);
                }

            }, 2000);

        }
        else {
            correctAudioList[randomList[varCurrentStep]].currentTime = 0;
            audioList.buzzAudio.currentTime = 0;

            correctAudioList[randomList[varCurrentStep]].pause();
            audioList.buzzAudio.play().catch(error => { })

            wrongLetterList[randomList[varCurrentStep]].current.className = 'wrong-exp'
            timerList[3] = setTimeout(() => {
                correctAudioList[randomList[varCurrentStep]].play().catch(error => { })
                wrongLetterList[randomList[varCurrentStep]].current.className = 'show'
            }, 800);
        }
    }

    return (
        <div className="aniObject"
            ref={parentRef}
        >
            <div style={{
                position: "fixed", width: _baseGeo.width * 0.2 + "px"
                , left: _baseGeo.left + _baseGeo.width * 0.18 + "px",
                bottom: _baseGeo.height * 0.19 + "px",
            }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/sb_51_bg_prop/sb_51_bg_prop_1.svg"}
                />
            </div>

            <div style={{
                position: "fixed", width: _baseGeo.width * 0.2 + "px"
                , left: _baseGeo.left + _baseGeo.width * 0.43 + "px",
                bottom: _baseGeo.height * 0.19 + "px",
            }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/sb_51_bg_prop/sb_51_bg_prop_1.svg"}
                />
            </div>

            {/* letter it */}
            <div ref={refLetterIt} className="hide">
                <div
                    className="playBtn"
                    onClick={() => { funcClick() }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.2 + "px",
                        height: _baseGeo.width * 0.2 + "px",
                        left: _baseGeo.left + _baseGeo.width * 0.18 + "px",
                        top: _baseGeo.height * 0.355 + _baseGeo.bottom * 2 + "px",
                        
                    }}>
                    <BaseImage
                        scale={0.8}
                        posInfo={{ l: 0.08, t: 0.18 }}
                        url={"sb51_text_interactive/artboard_15.svg"}
                    />
                </div>
            </div>

            {/* letter on Down */}
            <div ref={refLetterOnDown} className="hide">
                <div
                    className="playBtn"
                    onClick={() => { funcClick(false) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.2 + "px",
                        height: _baseGeo.width * 0.2 + "px",
                        left: _baseGeo.left + _baseGeo.width * 0.425 + "px",
                        top: _baseGeo.height * 0.35 + _baseGeo.bottom * 2 + "px",
                    }}>
                    <BaseImage
                        scale={0.8}
                        posInfo={{ l: 0.06, t: 0.13 }}
                        url={"sb51_text_interactive/artboard_13.svg"}
                    />
                </div>
            </div>

            {/* letter in */}
            <div className="hide" ref={refLetterIn}>
                <div
                    className="playBtn"
                    onClick={() => { funcClick(false) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.2 + "px",
                        height: _baseGeo.width * 0.2 + "px",
                        left: _baseGeo.left + _baseGeo.width * 0.43 + "px",
                        top: _baseGeo.height * 0.35 + _baseGeo.bottom * 2 + "px",
                        
                    }}>
                    <BaseImage
                        scale={0.8}
                        posInfo={{ l: 0.1, t: 0.12 }}
                        url={"sb51_text_interactive/artboard_16.svg"}
                    />
                </div>

            </div>

            {/* letter the up  */}
            <div className="hide" ref={refLetterUp}>
                <div
                    className="playBtn"
                    onClick={() => { funcClick(false) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.2 + "px",
                        height: _baseGeo.width * 0.2 + "px",
                        left: _baseGeo.left + _baseGeo.width * 0.425 + "px",
                        top: _baseGeo.height * 0.345 + _baseGeo.bottom * 2 + "px",
                        
                    }}>
                    <BaseImage
                        scale={0.75}
                        posInfo={{ l: 0.04, t: 0.135 }}
                        url={"sb51_text_interactive/artboard_14.svg"}
                    />
                </div>
            </div>


            {/* letter the on up */}

            <div ref={refLetterOnUp}
                className="hide">
                <div
                    className="playBtn"
                    onClick={() => { funcClick() }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.2 + "px",
                        height: _baseGeo.width * 0.2 + "px",
                        left: _baseGeo.left + _baseGeo.width * 0.18 + "px",
                        top: _baseGeo.height * 0.355 + _baseGeo.bottom * 2 + "px",
                        
                    }}>
                    <BaseImage
                        scale={0.75}
                        posInfo={{ l: 0.06, t: 0.165 }}
                        url={"sb51_text_interactive/artboard_13.svg"}
                    />
                </div>
            </div>

            <div
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

            <div
                className='commonButton'

                onClick={() => {
                    correctAudioList[randomList[varCurrentStep]].pause();
                    correctAudioList[randomList[varCurrentStep]].currentTime = 0;
                    correctAudioList[randomList[varCurrentStep]].play().catch(error => { });
                }}

                style={{
                    position: "fixed", width: _geo.width * 0.055 + "px",
                    right: "2%"
                    , top: "46%",
                    cursor: "pointer",
                }}>
                <img draggable={false} width={"100%"} className='playBtn'
                    src={prePathUrl() + 'images/buttons/audio.svg'}
                />
            </div>

            {/* seas */}
            <div style={{ pointerEvents: 'none' }}>
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












                {isBubbleShow && <div>

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


                </div>}




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
            </div>

            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.2 + "px",
                    height: _baseGeo.height * 0.1 + "px"
                    , right: "0%",
                    top: "0%",
                }}>
                <BaseImage url="sb_51_icons/sb_15_icon_progress_bar.svg" />
                {
                    [0, 1, 2, 3].map(value =>
                        <BaseImage
                            ref={markList[3 - value]}
                            className='aniObject'
                            scale={0.38}
                            posInfo={{ l: 0.55 - value * 0.16, t: -0.08 }}
                            url="sb_51_icons/sb_15_icon_bluestar.svg" />
                    )
                }

            </div>

        </div >
    );
}
