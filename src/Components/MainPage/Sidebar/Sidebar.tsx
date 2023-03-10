import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import "./Sidebar.css"
import '../../../reset.css'
import './ProgressBar.css'
import humburgerIcon from '../../../imgs/icons8-circled-menu-100.png'
import Exercise from "../../../Classes/Execirse";
import CssSelectorExercise from "../../../Classes/CSSExercise";

interface Iprops {
    exercises: Exercise[]
    curentExIndex: number
    isLevelListOpen: Boolean
    openLevelsNav: () => void
    closeLevelsNav: () => void
    onNextEx: () => void
    onPreviousEx: () => void
    onCurrentLevelChange: (event: any) => void
}

export default function SideBar(props: Iprops) {
    let helpBlock;
    const displayIncriment = 1;

    let ex = props.exercises[props.curentExIndex];

    if (ex instanceof CssSelectorExercise) {
        helpBlock = <CssSelectorHelpBlock exercise={ex} />
    }


    return (
        <>
            <div className="sidenav">

                <LevelCounter
                    ex={props.exercises[props.curentExIndex]}
                    curentExIndex={props.curentExIndex}
                    excersisesCount={props.exercises.length - displayIncriment}
                    onNextEx={props.onNextEx}
                    onPreviousEx={props.onPreviousEx}
                    openLevelsNav={props.openLevelsNav} />
                <ProgressBar
                    completed={props.curentExIndex}
                    maxCompleted={props.exercises.length - displayIncriment}
                    className="progress-bar"
                    baseBgColor='#808080'
                    height='6px'
                    isLabelVisible={false}
                    animateOnRender={false}
                    width='365px'
                    bgColor='rgb(34, 157, 73)'
                />
                {helpBlock}
            </div>
            <div className={props.isLevelListOpen ? "level-nav-open" : "level-nav-open level-nav-close"}>
                <LevelList onCurrentLevelChange={
                    props.onCurrentLevelChange}
                    closeLevelseNav={props.closeLevelsNav}
                    exercises={props.exercises} />
            </div>
        </>
    )
}

interface ICssSelectorHelpBlock {
    exercise: CssSelectorExercise
}

function CssSelectorHelpBlock(props: ICssSelectorHelpBlock) {
    let examples = props.exercise.examples.map((x, index) => <div key={index}><  Example exampleTest={x} /> <hr /></div >)
    return (
        <div className="help-block">
            <div className="selectorName">{props.exercise.name}</div>
            <div className="title">{props.exercise.title}</div>
            <div className="syntax">{props.exercise.syntax}</div>
            <div className="hint">{props.exercise.hint}</div>
            <div className="examples-title">Examples</div>
            <div className="examples">
                {examples}
            </div>
        </div>
    )
}

function Example(props: any) {
    return (
        <p className="example-test">{props.exampleTest}</p>
    )
}

interface ILevelCounterProps {
    curentExIndex: number,
    excersisesCount: number,
    ex: Exercise

    onNextEx: () => void
    onPreviousEx: () => void
    openLevelsNav: () => void
}

function LevelCounter(props: ILevelCounterProps) {
    let current = props.curentExIndex;
    current++;
    let length = props.excersisesCount;
    length++;

   
    return (

        <div className="level-bar">
            <div className="level-counter">
                <p className="counter-head">?????????????? {current} ???? {length}</p>

                <div className={props.ex.isCompleted ? "checkmark" : ""} >
                </div>
            </div>

            <div className="nav-level-bar">
                <div className="arrows">
                    <div className="arrow-div">
                        <div onClick={props.onPreviousEx} className="arrow_left" ></div>
                    </div>
                    <div className="arrow-div">
                        <div onClick={props.onNextEx} className="arrow_right" ></div>
                    </div>
                </div>

                <div onClick={props.openLevelsNav}>
                    <img className="hamburger-menu" src={humburgerIcon} alt="??????????????" />
                </div>
            </div>
        </div>
    )
}

interface ILevelListProps {
    exercises: Exercise[]
    closeLevelseNav: () => void
    onCurrentLevelChange: (event: any) => void
}


function LevelList(props: ILevelListProps) {

    const levelList = props.exercises.map((x, index) => <ListItem key={index} onClick={props.onCurrentLevelChange} exercise={x} index={++index} />)
    return (
        <>
            <div className="level-header">
                <p className="counter-head">???????????????? ??????????????</p>
                <div onClick={props.closeLevelseNav} className="close"></div>
            </div>
            <div className="level-list">
                {levelList}
            </div>
        </>
    )
}

interface IListItemProps {
    exercise: Exercise
    index: number
    onClick: (event: any) => void
}

function ListItem(props: IListItemProps) {
    return (
        <button onClick={props.onClick} value={props.index - 1} className="level-item-button">
            <div className="level-item ">
                <div className="flex-container">
                    <div className={props.exercise.isCompleted ? "list-checkmark-complete" : "list-checkmark "}>
                    </div>
                </div>
                <div className="flex-container">
                    <p className="item-index">
                        {props.index}
                    </p>
                </div>
                <div className="flex-container-text">
                    <p className="item-name ">
                        {props.exercise.name}
                    </p>
                </div>
            </div>
        </button>
    )
}