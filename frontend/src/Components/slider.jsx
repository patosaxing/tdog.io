export default function Slider({timervalue}){
    return(
        <div className='slidercontainer'>
            <input type="range" min={0} max={5} onChange={timervalue} step={0.5} className="slider" id="myRange"></input>
        </div>
    )
}