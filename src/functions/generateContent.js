import { tag0Unique, tagAllUnique, filteredSubStandards, rows, getTags, filteredStandards, getFilteredSubStandards } from '../api/spreadsheet';
import { navigate } from '../components/Navbar/Navbar';
import generate from '@babel/generator';
export let getId;
export let id;
export let idArray = [];
export let subId;
export let subIdArray = [];
export let value;
export let valueArray = [];
export let standard;
export let topic;
export let subtopic;
export let element;
let results;
let myElement;
let title;


const generateContent = {
    tag0: () => {
        return new Promise((resolve, reject) => {
            getId = (get) => { console.log(get) }
            for (let i = 0; i < tag0Unique.length; i++) {
                idArray.push(tag0Unique[i]);

                myElement = document.getElementById('tag0Container').innerHTML + '<div class="topicDiv" value="' + (i + 1) + '"><img class="topicBG" src="' + process.env.PUBLIC_URL + '/Icon_Topics/png/Icon_Topic_' + (i + 1) + '.png" /><p class="topic">' + tag0Unique[i] + '</p></div>'
                document.getElementById('tag0Container').innerHTML = myElement;
            }
            resolve('resolved');
        });
    },

    subtopics: () => {
        return new Promise((resolve, reject) => {
            subIdArray = []
            document.getElementById('topicList').innerHTML = '<li id="all" class="subtopic activeSubtopic">All</li>';
            for (let i = 0; i < tagAllUnique.length; i++) {
                subIdArray.push(tagAllUnique[i]);
                document.getElementById('topicList').innerHTML = document.getElementById('topicList').innerHTML + '<li id="' + subIdArray[i] + '" class="subtopic" value="' + i + '">' + tagAllUnique[i] + '</li>';
            }
            resolve('resolved');
        })
    },

    standards: () => {
        return new Promise((resolve, reject) => {
            document.getElementById('results').innerHTML = '';

            for (let i = 0; i < filteredStandards.length; i++) {
                title = filteredStandards[i].serial.replace(/[^\w\s]|\s/g, '').toLowerCase();
                if (filteredStandards[i].abstract === "") {
                    document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<div id=' + title + ' class="result" value="' + i + '"><p class="standard-serial">' + filteredStandards[i].serial + '</p><div class="abstract-container"><p><strong><i>Sorry there is no description available at the moment.</i></strong></p></div></div>';
                } else {
                    document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<div id=' + title + ' class="result" value="' + i + '"><p class="standard-serial">' + filteredStandards[i].serial + '</p><div class="abstract-container"><p>' + filteredStandards[i].abstract + '</p></div></div>';
                }
            }
        })
    },

    standardsBySubtopic: () => {
        document.getElementById('results').innerHTML = '';

        for (let i = 0; i < filteredSubStandards.length; i++) {
            title = filteredSubStandards[i].serial.replace(/[^\w\s]|\s/g, '').toLowerCase();
            document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<div id=' + title + ' class="result" value="' + i + '"><p class="standard-serial">' + filteredSubStandards[i].serial + '</p><div class="abstract-container"><p>' + filteredSubStandards[i].abstract + '</p></div></div>';
        }
    },

    assignTopicId: () => {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < idArray.length; i++) {
                document.querySelector('.topicDiv:nth-child(' + (i + 1) + ')').id = idArray[i];
                document.querySelector('.topicDiv:nth-child(' + (i + 1) + ')').onclick = () => {
                    subtopic = idArray[i];
                    getTags(rows, subtopic);
                    generateContent.standards();
                    generateContent.crossRef();
                    generateContent.subtopics();
                    generateContent.assignSubtopicId();
                    generateContent.assignAllStandardId();
                    navigate.subtopic();
                    document.getElementById('navSubtopic').style.display = 'inline-block';
                    document.getElementById('seperator').style.display = 'inline-block';
                    topic = tag0Unique[i];
                    element = document.getElementById(idArray[i]).innerHTML; console.log(element);
                    document.getElementById('putElement').innerHTML = element;
                };
            }

            resolve('resolved');
        })
    },

    assignSubtopicId: () => {
        return new Promise((resolve, reject) => {
            document.getElementById('all').onclick = () => {
                generateContent.standards(); document.getElementById('all').classList.add('activeSubtopic');
                for (let i = 0; i < subIdArray.length; i++) { document.getElementById(subIdArray[i]).classList.remove('activeSubtopic'); };
                for (let i = 0; i < filteredStandards.length; i++) { document.getElementById(filteredStandards[i].serial.replace(/[^\w\s]|\s/g, '').toLowerCase()).onclick = () => { generateContent.createModal(i); } };
                results = document.getElementById('resultsRow');
                results.scrollIntoView();
            };

            for (let i = 0; i < subIdArray.length; i++) {
                document.getElementById(subIdArray[i]).onclick = () => {
                    document.getElementById('all').classList.remove('activeSubtopic'); subId = subIdArray[i]; getFilteredSubStandards(filteredStandards, subIdArray, subId); generateContent.standardsBySubtopic(); generateContent.assignStandardId(); document.getElementById(subIdArray[i]).classList.add('activeSubtopic');
                    for (let l = 0; l < subIdArray.length; l++) { if (l === i) { } else { document.getElementById(subIdArray[l]).classList.remove('activeSubtopic'); } };
                    results = document.getElementById('results');
                    results.scrollIntoView();
                }
            }
        });
    },

    assignAllStandardId: () => {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < filteredStandards.length; i++) {
                document.getElementById(filteredStandards[i].serial.replace(/[^\w\s]|\s/g, '').toLowerCase()).onclick = () => { generateContent.createModal(i); }
            }
        });
    },

    assignStandardId: () => {
        return new Promise((resolve, reject) => {
            console.log(filteredSubStandards);
            for (let i = 0; i < filteredSubStandards.length; i++) {
                console.log(filteredSubStandards[i]);
                document.getElementById(filteredSubStandards[i].serial.replace(/[^\w\s]|\s/g, '').toLowerCase()).onclick = () => { generateContent.createModal(i); }
            }
            console.log(filteredSubStandards);
        });
    },

    crossRef: () => {
        for (let i = 0; i < filteredStandards.length; i++) {
            document.querySelector('.result:nth-child(' + (i + 1) + ')').onclick = () => { generateContent.createModal(i) };
        }
    },

    createModal: (value) => {
        return new Promise((resolve, reject) => {
            if (document.getElementById('all').classList.contains('activeSubtopic')) {

                standard = filteredStandards[value];
                console.log(standard);

                document.getElementById('resultWrapper').style.display = 'flex';
                setTimeout(() => { document.getElementById('standardsResult').style.opacity = '1'; }, 200);

                document.getElementById('standardName').innerHTML = standard.serial;
                document.getElementById('subTitle').innerHTML = standard.title_full;
                if (standard.abstract === "") {
                    document.getElementById('description').innerHTML = "<strong>Sorry, there is not a description available at the moment.</strong>"
                } else {
                    document.getElementById('description').innerHTML = standard.abstract;
                }
                document.getElementById('URL').setAttribute("href", standard.url);
            } else {
                standard = filteredSubStandards[value];
                console.log(standard);

                document.getElementById('resultWrapper').style.display = 'flex';
                setTimeout(() => { document.getElementById('standardsResult').style.opacity = '1'; }, 200);

                document.getElementById('standardName').innerHTML = standard.serial;
                document.getElementById('subTitle').innerHTML = standard.title_full;
                if (standard.abstract === "") {
                    document.getElementById('description').innerHTML = "<strong>Sorry, there is not a description available at the moment.</strong>"
                } else {
                    document.getElementById('description').innerHTML = standard.abstract;
                }
                document.getElementById('URL').setAttribute("href", standard.url);
            }
        });
    },

    closeModal: () => {
        document.getElementById('standardsResult').style.opacity = '0';
        setTimeout(() => { document.getElementById('resultWrapper').style.display = 'none' }, 1000);
    }
}

export default generateContent;