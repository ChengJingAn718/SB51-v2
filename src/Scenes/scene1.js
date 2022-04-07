import React, { useContext, useState, useEffect, useRef } from 'react';
import "../stylesheets/styles.css";

import { UserContext } from '../components/BaseShot';
import { prePathUrl, initialAudio } from '../components/CommonFunctions';


var isGameStarted = false;

const Scene1 = React.forwardRef(({ nextFunc, _geo }, ref) => {

    const audioList = useContext(UserContext)
    const [isShow, setShow] = useState(false)

    const playBtnRef = useRef();

    useEffect(() => {

        setShow(true)
        

        setTimeout(() => {
            playBtnRef.current.className = 'introText'
        }, 1500);

        setTimeout(() => {
            playBtnRef.current.className = 'commonButton'
            playBtnRef.current.style.pointerEvents = ''
        }, 2500);


        playBtnRef.current.className = 'hide'
        return () => {
            audioList.titleAudio.pause();
            audioList.titleAudio.currentTime = 0;

        }
    }, [])

    function clickFunc() {
        if (!isGameStarted)
            new initialAudio(audioList)
        audioList.clickAudio.play();
        if (!isGameStarted) {
            setTimeout(() => {

                isGameStarted = true;
            }, 500);
        }

        setTimeout(() => {
            audioList.backAudio.play().catch(error => {
            });
            nextFunc();
        }, 200);
    }



    return (
        <div>
            {isShow &&
                <div >

                    <div
                        style={{
                            position: "fixed", width: _geo.width * 0.15 + "px",
                            left: _geo.width * 0.65 + _geo.left + "px"
                            , bottom: _geo.height * 0.4 + _geo.top + "px",
                            transform: 'rotateY(180deg)'
                        }}>
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + 'images/intro_bg2/sb_51_intro_bg2_03.svg'}
                        />
                    </div>


                </div>
            }


            <div
                className='introText'
                style={{
                    position: "fixed", width: _geo.width * 0.45 + "px",
                    left: _geo.width * 0.275 + _geo.left + "px"
                    , bottom: _geo.height * 0.4 + _geo.top + "px",
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + 'images/intro_bg2/sb_51_intro_bg2_02.svg'}
                />
            </div>

            <div
                className="hide"
                ref={playBtnRef}
                onClick={clickFunc}
                style={{
                    position: "fixed", width: _geo.width * 0.12 + "px",
                    height: _geo.width * 0.12 + "px",
                    left: _geo.width * 0.44 + _geo.left + "px"
                    , bottom: _geo.height * 0.15 + _geo.top + "px",
                    cursor: "pointer",
                    pointerEvents: 'none'
                }}>
                <img draggable={false}
                    width={"100%"}
                    src={prePathUrl() + 'images/buttons/play_blue.svg'}
                />
            </div>
        </div>
    );
});

export default Scene1;
