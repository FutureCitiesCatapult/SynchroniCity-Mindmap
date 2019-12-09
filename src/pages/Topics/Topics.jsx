import React from 'react';
import './Topics.css';
import generateContent from '../../functions/generateContent';
import generate from '@babel/generator';

const Topics = () => {
    return (
        <section id="section2">

            { /* ========== START OF TOPICS SECTION ========== */}

            <div id="topicsSection" className="row">
                <div className="col-lg-3 col-md-4 col-sm-10 offset-lg-1 offset-md-1 offset-sm-1">
                    <h2 className="topicsHeader">Select topic</h2>
                    <p id="topicsText">All standards are categorised into these topics. Please select one to continue</p>
                </div>

                <div id="tag0Container" className="col-lg-7 col-md-6 col-sm-10">
                </div>
            </div>


            { /* ========== START OF SUBTOPICS SECTION ========== */}

            {/* <div className="subtopicsRow row">
                <div className="col-lg-3 col-md-4 col-sm-10 offset-lg-1 offset-md-1 offset-sm-1">
                    <h2 className="topicsHeader">Select subtopic</h2>
                </div> */}

            {/* This is where all subtopics will be rendered */}
            {/* <div id="subtopicsContainer" className="col-lg-7 col-md-6 col-sm-10">
                </div>
            </div> */}

            { /* ========== START OF RESULTS SECTION ========== */}
            { /* ===== Results will be rendered here ===== */}

            <div id="resultsSection" className="resultsRow row">
                <div className="col-lg-2 col-md-2 col-sm-12 offset-lg-1 offset-md-1">
                    <h2 className="topicsHeader">All Standards</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
                </div>

                <div className="col-lg-8 col-md-8 col-sm-12">
                    <div id="results" className="center"></div>
                </div>


                {/* === TEMPLATE FOR A RESULT === */}
                {/* <div className="result">
                        <p className="standard-serial">ISO 932952302355924</p>
                        <div className="abstract-container">
                            <p id="standard-abstract">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec et odio pellentesque diam volutpat commodo sed. Mi proin sed libero enim sed faucibus.</p>
                        </div>
                    </div>

                    </div> */}
            </div>

        </section>
    )
}

export default Topics;