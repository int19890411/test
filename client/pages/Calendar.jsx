"use strict";
import React, {Component} from 'react';
import WeeklyCalendar from '../components/WeeklyCalendar.jsx';

const simpleData = {
    "mo": [
        {
            "bt": 240,
            "et": 779
        }
    ],
    "tu": [],
    "we": [],
    "th": [
        {
            "bt": 240,
            "et": 779
        },
        {
            "bt": 1140,
            "et": 1319
        }
    ],
    "fr": [
        {
            "bt": 660,
            "et": 1019
        }
    ],
    "sa": [
        {
            "bt": 0,
            "et": 1439
        }
    ],
    "su": []
}
export default class Calendar extends Component {
    onSave(outputData) {
        console.log("json: ", JSON.stringify(outputData, null, '\t'));
        /* Далее можно сохранить на сервере и т.д.*/
        //this.props.dispatch(saveToDB(data));
    }

    render() {
        return (
            <div>
                <div className="col-md-6">
                    <WeeklyCalendar onSave={::this.onSave} inputData={simpleData}/>
                </div>
                <div className="col-md-6">
                    <a href="https://docs.google.com/document/d/1vzCZ8bCHyGGn2czmmav8L2EBzdOFfhCpyL6sqatHm-4/edit">
                        Тестовое задание
                    </a><br></br>
                    Выходищий JSON по кнопке Save Changes выводится в console. Сохранение на сервере не стал добавлять,
                    если надо могу добавить.
                </div>
            </div>
        );
    }
}




