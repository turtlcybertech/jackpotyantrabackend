const { generateResult, getResultBYSpecificBeforeToDay, getResultBYSpecificToDay, getResultBYDateModel, getResultByIdFn, getAllResult } = require("../model/resultModel");

const randomGenerate = () => {
    let a = Math.floor(Math.random() * 90 + 10);
    let b = Math.floor(Math.random() * 90 + 10);
    let c = Math.floor(Math.random() * 90 + 10);
    let d = Math.floor(Math.random() * 90 + 10);
    let e = Math.floor(Math.random() * 90 + 10);
    return { a, b, c, d, e };
};

const getUnique5Number = () => {
    let { a, b, c, d, e } = randomGenerate();
    let set = new Set([a, b, c, d, e]).size;
    while (set < 5) {
        let randomG = randomGenerate();
        a = randomG.a;
        b = randomG.b;
        c = randomG.c;
        d = randomG.d;
        e = randomG.e;
        set = new Set([a, b, c, d, e]).size;
    }
    return { a, b, c, d, e };
};

const generateMultipleResult = async (req, res) => {
    try {
        let arr2 = [
            "08:00 AM",
            "08:15 AM",
            "08:30 AM",
            "08:45 AM",
            "09:00 AM",
            "09:15 AM",
            "09:30 AM",
            "09:45 AM",
            "10:00 AM",
            "10:15 AM",
            "10:30 AM",
            "10:45 AM",
            "11:00 AM",
            "11:15 AM",
            "11:30 AM",
            "11:45 AM",
            "12:00 PM",
            "12:15 PM",
            "12:30 PM",
            "12:45 PM",
            "01:00 PM",
            "01:15 PM",
            "01:30 PM",
            "01:45 PM",
            "02:00 PM",
            "02:15 PM",
            "02:30 PM",
            "02:45 PM",
            "03:00 PM",
            "03:15 PM",
            "03:30 PM",
            "03:45 PM",
            "04:00 PM",
            "04:15 PM",
            "04:30 PM",
            "04:45 PM",
            "05:00 PM",
            "05:15 PM",
            "05:30 PM",
            "05:45 PM",
            "06:00 PM",
            "06:15 PM",
            "06:30 PM",
            "06:45 PM",
            "07:00 PM",
            "07:15 PM",
            "07:30 PM",
            "07:45 PM",
            "08:00 PM",
            "08:15 PM",
            "08:30 PM",
            "08:45 PM",
            "09:00 PM",
            "09:15 PM",
            "09:30 PM",
            "09:45 PM",
            "10:00 PM",
        ];

        let dateNow = new Date().getTime();
        let hr24 = 3600000 * 24;
        for (let i = 0; i < 365; i++) {
            let add24Hr = new Date(dateNow + hr24);
            let date = new Date(add24Hr);
            dateNow = add24Hr.getTime();
            let date1 = formatDate(date);
            let date2 = new Date(date1);
            for (let j = 0; j < arr2.length; j++) {
                let { a, b, c, d, e } = getUnique5Number();
                let data = {
                    a: a,
                    b: b,
                    c: c,
                    d: d,
                    e: e,
                    resultFor: arr2[j],
                    nextDraw: arr2[j + 1],
                    created_At: date2,
                };
                if (j === arr2.length - 1) {
                    data.nextDraw = "";
                }
                await generateResult(data);
            }
            console.log(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`);
        }

        return res.status(200).send({ status: true, message: "Ok message" });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return { strTime: strTime, hr: hours, min: minutes, ampm: ampm };
}
function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var nowDate = date.getDate();
    month = month < 10 ? "0" + month : month;
    nowDate = nowDate < 10 ? "0" + nowDate : nowDate;
    return `${year}-${month}-${nowDate}`;
}

const getResultFor = (hr, min, ampm) => {
    let resultFor = "";
    if (hr === 8 && ampm === "AM") {
        if (min >= 0 && min <= 14) {
            resultFor = "08:00 AM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "08:15 AM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "08:30 AM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "08:45 AM";
        }
    } else if (hr === 9 && ampm === "AM") {
        if (min >= 0 && min <= 14) {
            resultFor = "09:00 AM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "09:15 AM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "09:30 AM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "09:45 AM";
        }
    } else if (hr === 10 && ampm === "AM") {
        if (min >= 0 && min <= 14) {
            resultFor = "10:00 AM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "10:15 AM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "10:30 AM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "10:45 AM";
        }
    } else if (hr === 11 && ampm === "AM") {
        if (min >= 0 && min <= 14) {
            resultFor = "11:00 AM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "11:15 AM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "11:30 AM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "11:45 AM";
        }
    } else if (hr === 12 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "12:00 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "12:15 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "12:30 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "12:45 PM";
        }
    } else if (hr === 1 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "01:00 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "01:15 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "01:30 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "01:45 PM";
        }
    } else if (hr === 2 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "02:00 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "02:15 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "02:30 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "02:45 PM";
        }
    } else if (hr === 3 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "03:00 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "03:15 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "03:30 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "03:45 PM";
        }
    } else if (hr === 4 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "04:00 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "04:15 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "04:30 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "04:45 PM";
        }
    } else if (hr === 5 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "05:00 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "05:15 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "05:30 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "05:45 PM";
        }
    } else if (hr === 6 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "06:00 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "06:15 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "06:30 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "06:45 PM";
        }
    } else if (hr === 7 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "07:00 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "07:15 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "07:30 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "07:45 PM";
        }
    } else if (hr === 8 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "08:00 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "08:15 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "08:30 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "08:45 PM";
        }
    } else if (hr === 9 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "09:00 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "09:15 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "09:30 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "09:45 PM";
        }
    } else if (hr >= 10 && hr <= 11 && ampm === "PM") {
        resultFor = "10:00 PM";
    }
    return resultFor;
};
const getAdminResultFor = (hr, min, ampm) => {
    let resultFor = "";
    if (hr === 7 && ampm === "AM") {
        if (min >= 45 && min <= 59) {
            resultFor = "08:00 AM";
        }
    } else if (hr === 8 && ampm === "AM") {
        if (min >= 0 && min <= 14) {
            resultFor = "08:15 AM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "08:30 AM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "08:45 AM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "09:00 AM";
        }
    } else if (hr === 9 && ampm === "AM") {
        if (min >= 0 && min <= 14) {
            resultFor = "09:15 AM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "09:30 AM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "09:45 AM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "10:00 AM";
        }
    } else if (hr === 10 && ampm === "AM") {
        if (min >= 0 && min <= 14) {
            resultFor = "10:15 AM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "10:30 AM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "10:45 AM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "11:00 AM";
        }
    } else if (hr === 11 && ampm === "AM") {
        if (min >= 0 && min <= 14) {
            resultFor = "11:15 AM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "11:30 AM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "11:45 AM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "12:00 PM";
        }
    } else if (hr === 12 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "12:15 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "12:30 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "12:45 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "01:00 PM";
        }
    } else if (hr === 1 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "01:15 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "01:30 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "01:45 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "02:00 PM";
        }
    } else if (hr === 2 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "02:15 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "02:30 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "02:45 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "03:00 PM";
        }
    } else if (hr === 3 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "03:15 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "03:30 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "03:45 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "04:00 PM";
        }
    } else if (hr === 4 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "04:15 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "04:30 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "04:45 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "05:00 PM";
        }
    } else if (hr === 5 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "05:15 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "05:30 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "05:45 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "06:00 PM";
        }
    } else if (hr === 6 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "06:15 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "06:30 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "06:45 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "07:00 PM";
        }
    } else if (hr === 7 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "07:15 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "07:30 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "07:45 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "08:00 PM";
        }
    } else if (hr === 8 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "08:15 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "08:30 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "08:45 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "09:00 PM";
        }
    } else if (hr === 9 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultFor = "09:15 PM";
        } else if (min >= 15 && min <= 29) {
            resultFor = "09:30 PM";
        } else if (min >= 30 && min <= 44) {
            resultFor = "09:45 PM";
        } else if (min >= 45 && min <= 59) {
            resultFor = "10:00 PM";
        }
    }
    return resultFor;
};

const getResultForTheDay = (hr, min, ampm) => {
    let resultForArr = [];
    if (hr === 8 && ampm === "AM") {
        if (min >= 0 && min <= 14) {
            resultForArr = ["08:00 AM"];
        } else if (min >= 15 && min <= 29) {
            resultForArr = ["08:00 AM", "08:15 AM"];
        } else if (min >= 30 && min <= 44) {
            resultForArr = ["08:00 AM", "08:15 AM", "08:30 AM"];
        } else if (min >= 45 && min <= 59) {
            resultForArr = ["08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM"];
        }
    } else if (hr === 9 && ampm === "AM") {
        if (min >= 0 && min <= 14) {
            resultForArr = ["08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM", "09:00 AM"];
        } else if (min >= 15 && min <= 29) {
            resultForArr = ["08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM", "09:00 AM", "09:15 AM"];
        } else if (min >= 30 && min <= 44) {
            resultForArr = ["08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM", "09:00 AM", "09:15 AM", "09:30 AM"];
        } else if (min >= 45 && min <= 59) {
            resultForArr = ["08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM", "09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM"];
        }
    } else if (hr === 10 && ampm === "AM") {
        if (min >= 0 && min <= 14) {
            resultForArr = ["08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM", "09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM", "10:00 AM"];
        } else if (min >= 15 && min <= 29) {
            resultForArr = ["08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM", "09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM", "10:00 AM", "10:15 AM"];
        } else if (min >= 30 && min <= 44) {
            resultForArr = ["08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM", "09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM", "10:00 AM", "10:15 AM", "10:30 AM"];
        } else if (min >= 45 && min <= 59) {
            resultForArr = ["08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM", "09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM", "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM"];
        }
    } else if (hr === 11 && ampm === "AM") {
        if (min >= 0 && min <= 14) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
            ];
        } else if (min >= 15 && min <= 29) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
            ];
        } else if (min >= 30 && min <= 44) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
            ];
        } else if (min >= 45 && min <= 59) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
            ];
        }
    } else if (hr === 12 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
            ];
        } else if (min >= 15 && min <= 29) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
            ];
        } else if (min >= 30 && min <= 44) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
            ];
        } else if (min >= 45 && min <= 59) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
            ];
        }
    } else if (hr === 1 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
            ];
        } else if (min >= 15 && min <= 29) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
            ];
        } else if (min >= 30 && min <= 44) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
            ];
        } else if (min >= 45 && min <= 59) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
            ];
        }
    } else if (hr === 2 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
            ];
        } else if (min >= 15 && min <= 29) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
            ];
        } else if (min >= 30 && min <= 44) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
            ];
        } else if (min >= 45 && min <= 59) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
            ];
        }
    } else if (hr === 3 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
            ];
        } else if (min >= 15 && min <= 29) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
            ];
        } else if (min >= 30 && min <= 44) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
            ];
        } else if (min >= 45 && min <= 59) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
            ];
        }
    } else if (hr === 4 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
            ];
        } else if (min >= 15 && min <= 29) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
            ];
        } else if (min >= 30 && min <= 44) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
            ];
        } else if (min >= 45 && min <= 59) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
            ];
        }
    } else if (hr === 5 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
            ];
        } else if (min >= 15 && min <= 29) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
            ];
        } else if (min >= 30 && min <= 44) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
            ];
        } else if (min >= 45 && min <= 59) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
            ];
        }
    } else if (hr === 6 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
            ];
        } else if (min >= 15 && min <= 29) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
            ];
        } else if (min >= 30 && min <= 44) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
                "06:30 PM",
            ];
        } else if (min >= 45 && min <= 59) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
                "06:30 PM",
                "06:45 PM",
            ];
        }
    } else if (hr === 7 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
                "06:30 PM",
                "06:45 PM",
                "07:00 PM",
            ];
        } else if (min >= 15 && min <= 29) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
                "06:30 PM",
                "06:45 PM",
                "07:00 PM",
                "07:15 PM",
            ];
        } else if (min >= 30 && min <= 44) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
                "06:30 PM",
                "06:45 PM",
                "07:00 PM",
                "07:15 PM",
                "07:30 PM",
            ];
        } else if (min >= 45 && min <= 59) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
                "06:30 PM",
                "06:45 PM",
                "07:00 PM",
                "07:15 PM",
                "07:30 PM",
                "07:45 PM",
            ];
        }
    } else if (hr === 8 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
                "06:30 PM",
                "06:45 PM",
                "07:00 PM",
                "07:15 PM",
                "07:30 PM",
                "07:45 PM",
                "08:00 PM",
            ];
        } else if (min >= 15 && min <= 29) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
                "06:30 PM",
                "06:45 PM",
                "07:00 PM",
                "07:15 PM",
                "07:30 PM",
                "07:45 PM",
                "08:00 PM",
                "08:15 PM",
            ];
        } else if (min >= 30 && min <= 44) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
                "06:30 PM",
                "06:45 PM",
                "07:00 PM",
                "07:15 PM",
                "07:30 PM",
                "07:45 PM",
                "08:00 PM",
                "08:15 PM",
                "08:30 PM",
            ];
        } else if (min >= 45 && min <= 59) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
                "06:30 PM",
                "06:45 PM",
                "07:00 PM",
                "07:15 PM",
                "07:30 PM",
                "07:45 PM",
                "08:00 PM",
                "08:15 PM",
                "08:30 PM",
                "08:45 PM",
            ];
        }
    } else if (hr === 9 && ampm === "PM") {
        if (min >= 0 && min <= 14) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
                "06:30 PM",
                "06:45 PM",
                "07:00 PM",
                "07:15 PM",
                "07:30 PM",
                "07:45 PM",
                "08:00 PM",
                "08:15 PM",
                "08:30 PM",
                "08:45 PM",
                "09:00 PM",
            ];
        } else if (min >= 15 && min <= 29) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
                "06:30 PM",
                "06:45 PM",
                "07:00 PM",
                "07:15 PM",
                "07:30 PM",
                "07:45 PM",
                "08:00 PM",
                "08:15 PM",
                "08:30 PM",
                "08:45 PM",
                "09:00 PM",
                "09:15 PM",
            ];
        } else if (min >= 30 && min <= 44) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
                "06:30 PM",
                "06:45 PM",
                "07:00 PM",
                "07:15 PM",
                "07:30 PM",
                "07:45 PM",
                "08:00 PM",
                "08:15 PM",
                "08:30 PM",
                "08:45 PM",
                "09:00 PM",
                "09:15 PM",
                "09:30 PM",
            ];
        } else if (min >= 45 && min <= 59) {
            resultForArr = [
                "08:00 AM",
                "08:15 AM",
                "08:30 AM",
                "08:45 AM",
                "09:00 AM",
                "09:15 AM",
                "09:30 AM",
                "09:45 AM",
                "10:00 AM",
                "10:15 AM",
                "10:30 AM",
                "10:45 AM",
                "11:00 AM",
                "11:15 AM",
                "11:30 AM",
                "11:45 AM",
                "12:00 PM",
                "12:15 PM",
                "12:30 PM",
                "12:45 PM",
                "01:00 PM",
                "01:15 PM",
                "01:30 PM",
                "01:45 PM",
                "02:00 PM",
                "02:15 PM",
                "02:30 PM",
                "02:45 PM",
                "03:00 PM",
                "03:15 PM",
                "03:30 PM",
                "03:45 PM",
                "04:00 PM",
                "04:15 PM",
                "04:30 PM",
                "04:45 PM",
                "05:00 PM",
                "05:15 PM",
                "05:30 PM",
                "05:45 PM",
                "06:00 PM",
                "06:15 PM",
                "06:30 PM",
                "06:45 PM",
                "07:00 PM",
                "07:15 PM",
                "07:30 PM",
                "07:45 PM",
                "08:00 PM",
                "08:15 PM",
                "08:30 PM",
                "08:45 PM",
                "09:00 PM",
                "09:15 PM",
                "09:30 PM",
                "09:45 PM",
            ];
        }
    } else if (hr >= 10 && hr <= 11 && ampm === "PM") {
        resultForArr = [
            "08:00 AM",
            "08:15 AM",
            "08:30 AM",
            "08:45 AM",
            "09:00 AM",
            "09:15 AM",
            "09:30 AM",
            "09:45 AM",
            "10:00 AM",
            "10:15 AM",
            "10:30 AM",
            "10:45 AM",
            "11:00 AM",
            "11:15 AM",
            "11:30 AM",
            "11:45 AM",
            "12:00 PM",
            "12:15 PM",
            "12:30 PM",
            "12:45 PM",
            "01:00 PM",
            "01:15 PM",
            "01:30 PM",
            "01:45 PM",
            "02:00 PM",
            "02:15 PM",
            "02:30 PM",
            "02:45 PM",
            "03:00 PM",
            "03:15 PM",
            "03:30 PM",
            "03:45 PM",
            "04:00 PM",
            "04:15 PM",
            "04:30 PM",
            "04:45 PM",
            "05:00 PM",
            "05:15 PM",
            "05:30 PM",
            "05:45 PM",
            "06:00 PM",
            "06:15 PM",
            "06:30 PM",
            "06:45 PM",
            "07:00 PM",
            "07:15 PM",
            "07:30 PM",
            "07:45 PM",
            "08:00 PM",
            "08:15 PM",
            "08:30 PM",
            "08:45 PM",
            "09:00 PM",
            "09:15 PM",
            "09:30 PM",
            "09:45 PM",
            "10:00 PM",
        ];
    }
    return resultForArr;
};

const getResultForClient = async (req, res) => {
    try {
        let now = Date.now();
        let date = new Date(now + 5 * 3600 * 1000 + 1800 * 1000);
        let localDate = formatAMPM(date);
        let strDate = formatDate(date);
        let x = getResultFor(Number(localDate.hr), Number(localDate.min), localDate.ampm);
        let x1 = new Date(strDate);
        let result = await getResultBYDateModel(x1, x);
        return res.status(200).send({ status: true, message: "Ok message", data: result });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};
const getResultForAdmin = async (req, res) => {
    try {
        let now = Date.now();
        // let date = new Date(now + 12 * 3600 * 1000 + 1800 * 1000 + 1200000);
        let date = new Date(now + 5 * 3600 * 1000 + 1800 * 1000);
        let localDate = formatAMPM(date);
        let strDate = formatDate(date);
        let x = getAdminResultFor(Number(localDate.hr), Number(localDate.min), localDate.ampm);
        let x1 = new Date(strDate);
        // console.log(date);
        // console.log(x);
        // console.log(x1);
        
        let result = await getResultBYDateModel(x1, x);
        // console.log(result)
        return res.status(200).send({ status: true, message: "Ok message", data: result });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};
const updateResultForAdmin = async (req, res) => {
    try {
        let { a, b, c, d, e } = req.body;
        let resultId = req.params.resultid;
        let resultObj = await getResultByIdFn(resultId);
        if (!resultObj) {
            return res.status(400).send({ status: false, message: "Bad request" });
        }
        if (a !== undefined && a !== "") {
            if (resultObj.a === Number(a) || resultObj.b === Number(a) || resultObj.c === Number(a) || resultObj.d === Number(a) || resultObj.e === Number(a)) {
                return res.status(400).send({ status: false, message: "Please enter unique value which is not assigned to any name" });
            }
            resultObj.a = a;
        }
        if (b !== undefined && b !== "") {
            if (resultObj.a === Number(b) || resultObj.b === Number(b) || resultObj.c === Number(b) || resultObj.d === Number(b) || resultObj.e === Number(b)) {
                return res.status(400).send({ status: false, message: "Please enter unique value which is not assigned to any name" });
            }
            resultObj.b = b;
        }
        if (c !== undefined && c !== "") {
            if (resultObj.a === Number(c) || resultObj.b === Number(c) || resultObj.c === Number(c) || resultObj.d === Number(c) || resultObj.e === Number(c)) {
                return res.status(400).send({ status: false, message: "Please enter unique value which is not assigned to any name" });
            }
            resultObj.c = c;
        }
        if (d !== undefined && d !== "") {
            if (resultObj.a === Number(d) || resultObj.b === Number(d) || resultObj.c === Number(d) || resultObj.d === Number(d) || resultObj.e === Number(d)) {
                return res.status(400).send({ status: false, message: "Please enter unique value which is not assigned to any name" });
            }
            resultObj.d = d;
        }
        if (e !== undefined && e !== "") {
            if (resultObj.a === Number(e) || resultObj.b === Number(e) || resultObj.c === Number(e) || resultObj.d === Number(e) || resultObj.e === Number(e)) {
                return res.status(400).send({ status: false, message: "Please enter unique value which is not assigned to any name" });
            }
            resultObj.e = e;
        }
        await resultObj.save();
        return res.status(202).send({ status: true, message: "Result Updated" });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const getResultForSpecificDate = async (req, res) => {
    try {
        let date = new Date(req.params.date);
        let now = Date.now();
        let systemtime = new Date(now + 5 * 3600 * 1000 + 1800 * 1000);
        const todayStr = formatDate(systemtime);
        const todayDate = new Date(todayStr);
        let result = [];
        if (date.getTime() < todayDate.getTime()) {
            result = await getResultBYSpecificBeforeToDay(date);
        } else if (date.getTime() === todayDate.getTime()) {
            let localDate = formatAMPM(systemtime);
            let resultForArr = getResultForTheDay(Number(localDate.hr), Number(localDate.min), localDate.ampm);
            result = await getResultBYSpecificToDay(date, resultForArr);
        }
        result.sort((a, b) => a.sno - b.sno);

        // console.log(result);
        return res.status(200).send({ status: true, message: "Date fetched", len: result.length, data: result });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const addAfield = async (req, res) => {
    try {
        let results = await getAllResult();
        let count = 0;
        for (let result of results) {
            if (result.resultFor === "08:00 AM") {
                result.sno = 1;
            } else if (result.resultFor === "08:15 AM") {
                result.sno = 2;
            } else if (result.resultFor === "08:30 AM") {
                result.sno = 3;
            } else if (result.resultFor === "08:45 AM") {
                result.sno = 4;
            } else if (result.resultFor === "09:00 AM") {
                result.sno = 5;
            } else if (result.resultFor === "09:15 AM") {
                result.sno = 6;
            } else if (result.resultFor === "09:30 AM") {
                result.sno = 7;
            } else if (result.resultFor === "09:45 AM") {
                result.sno = 8;
            } else if (result.resultFor === "10:00 AM") {
                result.sno = 9;
            } else if (result.resultFor === "10:15 AM") {
                result.sno = 10;
            } else if (result.resultFor === "10:30 AM") {
                result.sno = 11;
            } else if (result.resultFor === "10:45 AM") {
                result.sno = 12;
            } else if (result.resultFor === "11:00 AM") {
                result.sno = 13;
            } else if (result.resultFor === "11:15 AM") {
                result.sno = 14;
            } else if (result.resultFor === "11:30 AM") {
                result.sno = 15;
            } else if (result.resultFor === "11:45 AM") {
                result.sno = 16;
            } else if (result.resultFor === "12:00 PM") {
                result.sno = 17;
            } else if (result.resultFor === "12:15 PM") {
                result.sno = 18;
            } else if (result.resultFor === "12:30 PM") {
                result.sno = 19;
            } else if (result.resultFor === "12:45 PM") {
                result.sno = 20;
            } else if (result.resultFor === "01:00 PM") {
                result.sno = 21;
            } else if (result.resultFor === "01:15 PM") {
                result.sno = 22;
            } else if (result.resultFor === "01:30 PM") {
                result.sno = 23;
            } else if (result.resultFor === "01:45 PM") {
                result.sno = 24;
            } else if (result.resultFor === "02:00 PM") {
                result.sno = 25;
            } else if (result.resultFor === "02:15 PM") {
                result.sno = 26;
            } else if (result.resultFor === "02:30 PM") {
                result.sno = 27;
            } else if (result.resultFor === "02:45 PM") {
                result.sno = 28;
            } else if (result.resultFor === "03:00 PM") {
                result.sno = 29;
            } else if (result.resultFor === "03:15 PM") {
                result.sno = 30;
            } else if (result.resultFor === "03:30 PM") {
                result.sno = 31;
            } else if (result.resultFor === "03:45 PM") {
                result.sno = 32;
            } else if (result.resultFor === "04:00 PM") {
                result.sno = 33;
            } else if (result.resultFor === "04:15 PM") {
                result.sno = 34;
            } else if (result.resultFor === "04:30 PM") {
                result.sno = 35;
            } else if (result.resultFor === "04:45 PM") {
                result.sno = 36;
            } else if (result.resultFor === "05:00 PM") {
                result.sno = 37;
            } else if (result.resultFor === "05:15 PM") {
                result.sno = 38;
            } else if (result.resultFor === "05:30 PM") {
                result.sno = 39;
            } else if (result.resultFor === "05:45 PM") {
                result.sno = 40;
            } else if (result.resultFor === "06:00 PM") {
                result.sno = 41;
            } else if (result.resultFor === "06:15 PM") {
                result.sno = 42;
            } else if (result.resultFor === "06:30 PM") {
                result.sno = 43;
            } else if (result.resultFor === "06:45 PM") {
                result.sno = 44;
            } else if (result.resultFor === "07:00 PM") {
                result.sno = 45;
            } else if (result.resultFor === "07:15 PM") {
                result.sno = 46;
            } else if (result.resultFor === "07:30 PM") {
                result.sno = 47;
            } else if (result.resultFor === "07:45 PM") {
                result.sno = 48;
            } else if (result.resultFor === "08:00 PM") {
                result.sno = 49;
            } else if (result.resultFor === "08:15 PM") {
                result.sno = 50;
            } else if (result.resultFor === "08:30 PM") {
                result.sno = 51;
            } else if (result.resultFor === "08:45 PM") {
                result.sno = 52;
            } else if (result.resultFor === "09:00 PM") {
                result.sno = 53;
            } else if (result.resultFor === "09:15 PM") {
                result.sno = 54;
            } else if (result.resultFor === "09:30 PM") {
                result.sno = 55;
            } else if (result.resultFor === "09:45 PM") {
                result.sno = 56;
            } else if (result.resultFor === "10:00 PM") {
                result.sno = 57;
            }
            await result.save();
            console.log("document updated, ", ++count);
        }

        return res.status(200).send({ status: true, message: "Date fetched", data: results });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = { generateMultipleResult, getResultForClient, getResultForAdmin, getResultForSpecificDate, updateResultForAdmin };
