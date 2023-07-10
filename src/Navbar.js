import { useState } from "react";

export default function Navbar() {
    const [isPlaying, setIsPlaying] = useState(false)
    const letsPlay = () => {
        setIsPlaying(true)
    }
    const goBackHome = () => {
        setIsPlaying(false)
    }

    return (
        <nav className={`nav-${isPlaying ? "playing" : "home"}`}>
            <img
                src={isPlaying ? '/media/logo-navbar-4mots1image.png' : '/media/logo-4mots1image.png'}
                className={`logo-${isPlaying ? "playing" : "home"}`}
                alt='Logo "4 mots 1 image" avec une jolie baleine !'
                onClick={goBackHome}
            />
            {isPlaying ? 
                null : 
                <button className={`button-big-play warning`} onClick={letsPlay}>
                    Jouer
                </button>
            }
        </nav>
    );
}
