import "../stylesheets/styles.css";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../components/BaseShot";
import { getMaskStyle } from "../components/CommonFunctions";
import BaseImage from "../components/BaseImage";
import { prePathUrl, startRepeatAudio, stopRepeatAudio } from "../components/CommonFunctions"

var varCurrentStep = 0;
var varAnswerList = [1, 0, 1, 0]

var defaultPos = { x: 0.64, y: 0.42 }
var correctAudioList = [];
var timerList = []


var currentCharacterIndex = 0;
var currentEyeIndex = 0;
var isPlusing = true;
let timeInterval2, timeInterval, timeInterval1
let randomList = []

export default function Scene3({ nextFunc, _baseGeo, _geo }) {

    const audioList = useContext(UserContext)
    const markList = [useRef(), useRef(), useRef(), useRef()]

    const refLetterAt = useRef()
    const refLetterAn = useRef()
    const refLetterAm = useRef()
    const refLetterIn = useRef()

    const refFrog = useRef();

    const parentRef = useRef()

    const characterList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const showingPairList = [
        [refLetterAt, refLetterAn],
        [refLetterAm, refLetterAn],
        [refLetterAm, refLetterIn],
        [refLetterAm, refLetterIn]
    ]

    const eyeList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const wrongLetterList = [
        refLetterAn, refLetterAm, refLetterIn, refLetterAm
    ]

    useEffect(() => {

        randomList = []

        while (randomList.length != 4) {
            let randomNumber = Math.floor(Math.random() * 4);
            if (!randomList.includes(randomNumber))
                randomList.push(randomNumber)
        }


        varCurrentStep = 0;
        parentRef.current.style = 'none'
        audioList.bodyAudio.src = prePathUrl() + "sounds/ep_51_audio_31.mp3"

        correctAudioList = [
            audioList.wordAudio1,
            audioList.wordAudio2,
            audioList.wordAudio3,
            audioList.wordAudio4
        ]

        currentCharacterIndex = 0;
        isPlusing = true;
        currentEyeIndex = 0;

        for (let i = 1; i < 4; i++) {
            characterList[i].current.setClass('character-disappear')

        }
        for (let i = 0; i < 4; i++)
            eyeList[i].current.setClass('character-disappear')

        startEyeAni();

        wrongLetterList.map((ref) => {
            ref.current.style.transition = '0.3s'
        })

        timerList[0] = setTimeout(() => {
            audioList.bodyAudio.play().catch(error => { })
            timerList[1] = setTimeout(() => {
                correctAudioList[randomList[0]].play().catch(error => { })

                startRepeatAudio();

                parentRef.current.style = ''
            }, audioList.bodyAudio.duration * 1000 + 200);
        }, 1800);




        setTimeout(() => {
            showingPairList[randomList[0]][0].current.className = 'appear'
            showingPairList[randomList[0]][1].current.className = 'appear'
        }, 1000);

        return () => {
            for (let i = 0; i < timerList.length; i++)
                clearTimeout(timerList[i])

            clearInterval(timeInterval)
            clearInterval(timeInterval2)
            clearInterval(timeInterval1)
        }

    }, [])

    function startEyeAni() {
        if (eyeList[currentEyeIndex].current != null)
            timeInterval1 = setInterval(() => {
                if (eyeList[currentEyeIndex].current != null) {
                    clearInterval(timeInterval2)
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
                }
            }, 2000);
    }




    function funcClick(isUpClicked = true) {

        stopRepeatAudio();

        wrongLetterList[randomList[varCurrentStep]].current.className = 'show'

        correctAudioList[randomList[varCurrentStep]].pause()
        audioList.buzzAudio.pause()

        clearTimeout(timerList[0])
        clearTimeout(timerList[1])
        clearTimeout(timerList[2])

        correctAudioList[0].pause();
        audioList.bodyAudio.pause();

        if (varAnswerList[randomList[varCurrentStep]] == isUpClicked) {

            parentRef.current.style.pointerEvents = 'none'
            correctAudioList[randomList[varCurrentStep]].pause()
            audioList.tingAudio.play().catch(event => { })


            let aniNum = isUpClicked ? 1 : 0;
            // playFrongAnimation(frogAniPosList[aniNum])
            // if (varCurrentStep != 0)
            wrongLetterList[randomList[varCurrentStep]].current.className = 'hide'
            markList[varCurrentStep].current.setUrl('sb_51_icons/sb_15_icon_yellowstar' + '.svg')

            setTimeout(() => {

                if (varCurrentStep < 3) {
                    refLetterAt.current.className = 'hide'
                    refLetterAn.current.className = 'hide'
                    refLetterAm.current.className = 'hide'
                    refLetterIn.current.className = 'hide'



                    if (randomList[varCurrentStep + 1] == 0) {
                        refLetterAt.current.className = 'appear'
                        refLetterAn.current.className = 'appear'
                    }

                    if (randomList[varCurrentStep + 1] == 1) {

                        setTimeout(() => {
                            refLetterAm.current.className = 'appear'
                            refLetterAn.current.className = 'appear'
                        }, 200);
                    }

                    if (randomList[varCurrentStep + 1] == 2) {

                        setTimeout(() => {
                            refLetterAm.current.className = 'appear'
                            refLetterIn.current.className = 'appear'
                        }, 200);

                    }

                    if (randomList[varCurrentStep + 1] == 3) {
                        setTimeout(() => {
                            refLetterAm.current.className = 'appear'
                            refLetterIn.current.className = 'appear'
                        }, 200);
                    }

                    startRepeatAudio();
                }
                else {
                    setTimeout(() => {
                        nextFunc();
                    }, 2500);
                }
                varCurrentStep++;
                if (varCurrentStep < 4) {
                    setTimeout(() => {
                        correctAudioList[randomList[varCurrentStep]].play().catch(event => { })
                        setTimeout(() => {
                            parentRef.current.style.pointerEvents = ''
                        }, 1000);
                    }, 800);
                }
            }, 2500);

        }
        else {
            correctAudioList[randomList[varCurrentStep]].currentTime = 0;
            audioList.buzzAudio.currentTime = 0;

            correctAudioList[randomList[varCurrentStep]].pause();
            audioList.buzzAudio.play().catch(error => { })

            wrongLetterList[randomList[varCurrentStep]].current.className = 'wrong-exp'

            timerList[2] = setTimeout(() => {
                correctAudioList[randomList[varCurrentStep]].play().catch(error => { })
                wrongLetterList[randomList[varCurrentStep]].current.className = 'show'

                startRepeatAudio();
            }, 800);
        }

    }

    return (
        <div className="aniObject"
            ref={parentRef}
        >
            {/* letter at */}
            <div ref={refLetterAt} className="hide"
            >
                <div
                    onClick={() => { funcClick() }}
                    className="playBtn"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.29 + "px",
                        height: _baseGeo.width * 0.175 + "px"
                        , left: _baseGeo.width * 0.11 + _baseGeo.left + "px",
                        bottom: _baseGeo.height * 0.41 + 2 * _baseGeo.bottom + "px",

                        overflow: 'hidden'
                    }}
                >
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.1 + "px",
                            height: _baseGeo.width * 0.1 + "px"
                            , left: _baseGeo.width * 0.09 + "px",
                            bottom: _baseGeo.height * 0.07 + "px",
                            overflow: 'hidden'
                        }}
                    >
                        <div style={getMaskStyle({ url: 'sb51_text_interactive/artboard_9', scale: 230 })}>
                        </div>
                    </div>
                </div>
            </div>

            {/* letter an */}
            <div ref={refLetterAn} className="hide"
            >
                <div
                    onClick={() => { funcClick(false) }}
                    className="playBtn"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.29 + "px",
                        height: _baseGeo.width * 0.175 + "px"
                        , left: _baseGeo.width * 0.38 + _baseGeo.left + "px",
                        bottom: _baseGeo.height * 0.54 + 2 * _baseGeo.bottom + "px",

                        overflow: 'hidden'
                    }}
                >
                    <div
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.14 + "px"
                            , height: _baseGeo.width * 0.14 + "px"
                            , left: _baseGeo.width * 0.055 + "px",
                            bottom: _baseGeo.height * 0.05 + "px",
                            overflow: 'hidden'
                        }}>
                        <div style={getMaskStyle({ url: 'sb51_text_interactive/artboard_11', scale: 160 })}>
                        </div>
                    </div>
                </div>
            </div>

            {/* letter  am */}
            <div className="hide" ref={refLetterAm}
            >

                <div
                    onClick={() => { funcClick() }}
                    className="playBtn"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.29 + "px",
                        height: _baseGeo.width * 0.175 + "px"
                        , left: _baseGeo.width * 0.11 + _baseGeo.left + "px",
                        bottom: _baseGeo.height * 0.41 + 2 * _baseGeo.bottom + "px",

                        overflow: 'hidden'
                    }}
                >
                    <div
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.14 + "px"
                            , height: _baseGeo.width * 0.14 + "px"
                            , left: _baseGeo.width * 0.075 + "px",
                            bottom: _baseGeo.height * 0.055 + "px",
                            overflow: 'hidden'
                        }}
                    >
                        <div style={getMaskStyle({ url: 'sb51_text_interactive/artboard_10', scale: 160 })}>
                        </div>
                    </div>
                </div>
            </div>

            {/* letter  in */}
            <div
                className="hide" ref={refLetterIn}
            >


                <div
                    onClick={() => { funcClick(false) }}
                    className="playBtn"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.29 + "px",
                        height: _baseGeo.width * 0.175 + "px"
                        , left: _baseGeo.width * 0.38 + _baseGeo.left + "px",
                        bottom: _baseGeo.height * 0.54 + 2 * _baseGeo.bottom + "px",
                        overflow: 'hidden'
                    }}
                >

                    <div style={{
                        position: "fixed", width: _baseGeo.width * 0.14 + "px"
                        , height: _baseGeo.width * 0.14 + "px"
                        , left: _baseGeo.width * 0.05 + "px",
                        bottom: _baseGeo.height * 0.04 + "px",
                        overflow: 'hidden'
                    }}>
                        <div style={getMaskStyle({ url: 'sb51_text_interactive/artboard_12', scale: 160 })}>
                        </div>
                    </div>
                </div>
            </div>

            <div
                ref={refFrog}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.18 + "px",
                    height: _baseGeo.width * 0.18 + "px",
                    transition: '0.3s',
                    left: _baseGeo.width * defaultPos.x + _baseGeo.left + "px",
                    bottom: _baseGeo.height * defaultPos.y + 2 * _baseGeo.bottom + "px"
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
                    , top: "46%", cursor: "pointer",
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + 'images/buttons/audio.svg'}
                />
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
