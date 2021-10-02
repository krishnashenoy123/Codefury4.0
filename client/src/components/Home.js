import React , {useEffect}from 'react'


import Faltu from '../Assets/Faltu.svg'


const HomePage = () => {
   
    return (
        <div className="homeBody">
            <div className="midSection">
                <h1 style={{ textAlign: "center" }}>Introducing FilterForces...</h1>
                <div className="Addvertisement">
                    <h3>Checkout our Chrome Extension</h3>
                    <a style = {{color: "blue", fontSize: "larger", fontWeight:"bolder"}}  href="https://github.com/LogiCare-Tech/FilterForces-Extension" target="_blank" rel="noreferrer">Click here</a>
                </div>
                <div className="Video-midSection">

                    <iframe
                        
                        src="https://www.youtube.com/embed/6WLlupC5pm8"
                        title="YouTube video player"
                        frameBorder="1"
                       
                        allowFullScreen>

                    </iframe>
                   
                    
                    <img src={Faltu} alt="SVG" />
                </div>

               
               

            </div>

            <div className="footer">
                <div className="leftFooter">
                    <h2>About Me</h2>
                    <h5>Name: Shreenanda P</h5>

                    <h5><i className="linkedin icon" /> <a href="https://www.linkedin.com/in/shreenanda-p-127242147/" target="_blank" rel="noreferrer" >Linked in </a></h5>
                    <h5><i className="github icon" /> <a href="https://github.com/shreenanda-8" target="_blank" rel="noreferrer" >Github</a></h5>
                </div>

                <div className="rightFooter">
                    <h2>Contact</h2>
                    <h5><a href="https://codeforces.com/blog/entry/95234" target="_blank" rel="noreferrer">Codeforces Blog </a></h5>
                    <h5>📧 filterforces.founder@gmail.com</h5>
                    <h5><i className="github icon" /> <a href="https://github.com/LogiCare-Tech/FilterForces" target="_blank" rel="noreferrer" >Github</a></h5>
                </div>




            </div>
        </div>
    )
}
export default HomePage