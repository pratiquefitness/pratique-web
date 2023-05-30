import './style.css';

function SliderBar() {
    return(
        <div className='slider-bar-container'>
            <div className='value-container'>
                <span id="demo">0</span>
            </div>
            <input type="range" min="0" max="100" value="0" className="slider" id="myrange" />
            <script type="text/javascript" src="script.js"></script>
        </div>
    )
}

export default SliderBar;