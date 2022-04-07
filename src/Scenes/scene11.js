import "../stylesheets/styles.css";
import { useContext, useEffect, useState } from "react";
import BaseImage from "../components/BaseImage";
import { UserContext } from "../components/BaseShot";
import { prePathUrl } from "../components/CommonFunctions"

export default function Scene3({ _geo, startTransition, nextFunc, _clickedRoomNum }) {

    const audioList = useContext(UserContext)

    function goNextFunc(num) {
        startTransition(num % 2)
        audioList.bodyAudio.pause();
        setTimeout(() => {
            audioList.wooAudio.play().catch(error => { })
        }, 300);
        setTimeout(() => {
            nextFunc(num);
        }, 600);
    }


    useEffect(() => {

        audioList.bodyAudio.src = prePathUrl() + "sounds/ep_51_audio_24_a.mp3"
        audioList.subBodyAudio.src = prePathUrl() + "sounds/ep_51_audio_24_b.mp3"

        const timer1 = setTimeout(() => {
            audioList.bodyAudio.play().catch(error => { })
        }, 2000);

        const timer2 = setTimeout(() => {
            audioList.subBodyAudio.play().catch(error => { })
        }, 7500);

        return () => {

            clearTimeout(timer1)
            clearTimeout(timer2)

            audioList.bodyAudio.pause();
            audioList.subBodyAudio.pause();
        }

    }, [])

    return (

        <div className="aniObject">
            <div


                style={{
                    position: "fixed", width: _geo.width * 0.55 + "px",
                    height: _geo.height * 0.5 + 'px'
                    , left: _geo.left + _geo.width * 0.1 + "px",
                    bottom: _geo.top + _geo.height * 0.45 + "px",
                }}>
                <div
                    onClick={() => { goNextFunc(3) }}
                    className="commonButton"
                    style={{
                        position: 'absolute', width: _geo.width * 0.33 + 'px',
                        height: _geo.width * 0.33 + 'px', left: '0%', top: '20%',
                        borderRadius: '50%',
                    }}
                >
                    <BaseImage scale={1}
                        posInfo={{ l: 0.0, t: -0.105 }}
                        url={"sb_51_icons/sb_51_icons_2.svg"}
                    />
                </div>
                <BaseImage scale={0.3}
                    posInfo={{ l: 0.12, t: 1.3 }}
                    url={"sb_51_text_interactive/sb_51_ti_frog.svg"}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div
                style={{
                    position: "fixed", width: _geo.width * 0.55 + "px",
                    height: _geo.height * 0.5 + 'px'
                    , left: _geo.left + _geo.width * 0.55 + "px",
                    bottom: _geo.top + _geo.height * 0.45 + "px",
                }}

            >
                <div
                    onClick={() => {
                        setTimeout(() => {
                            goNextFunc(6)
                        }, 150);
                    }}
                    className="commonButton"
                    style={{
                        position: 'absolute', width: _geo.width * 0.33 + 'px',
                        height: _geo.width * 0.33 + 'px', left: '0%', top: '20%',
                        borderRadius: '50%',
                    }}
                >
                    <BaseImage scale={1}
                        posInfo={{ l: 0.0, t: -0.105 }}
                        url={"sb_51_icons/sb_51_icons_3.svg"}
                    />
                </div>
                <BaseImage scale={0.3}

                    posInfo={{ l: 0.15, t: 1.32 }}
                    style={{ cursor: 'pointer' }}
                    url={"sb_51_text_interactive/sb_51_ti_fish.svg"}
                />
            </div>
        </div >
    );
}
