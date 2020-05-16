let fs = require("fs");
let path = require("path");

require('chromedriver');
let swd = require('selenium-webdriver');
let bldr = new swd.Builder();
let driver = bldr.forBrowser('chrome').build();

let cfile = process.argv[2];
let mfile = process.argv[3];

let userName, pwd, metadata;
let glang, gcrsi = 0, gcrsurl;
let gcodeArea, gContent, gtestArea;

let cfileWillBeReadPromise = fs.promises.readFile(cfile);
cfileWillBeReadPromise.then(function (content) {
    let credentials = JSON.parse(content);
    userName = credentials.un;
    pwd = credentials.pwd;
}).then(function () {
    console.log("\n************************ START *********************************\n");
    let toWillBeSetPromise = driver.manage().setTimeouts({
        implicit: 10000
    });
    return toWillBeSetPromise;
}).then(function () {
    console.log("Logging in.....");
    driver.manage().window().maximize();
    let loginPageWillBeLoadedPromise = driver.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    return loginPageWillBeLoadedPromise;
}).then(function () {
    let toWillBeSetPromise = driver.manage().setTimeouts({
        implicit: 10000
    });
    return toWillBeSetPromise;
}).then(function () {
    console.log("Entering Credentials");
    let uneWillBeFoundPromise = driver.findElement(swd.By.css("#input-1"));
    let pwdeWillBeFoundPromise = driver.findElement(swd.By.css("#input-2"));
    let bothElementsWillBeFoundPromise = Promise.all([uneWillBeFoundPromise, pwdeWillBeFoundPromise]);
    return bothElementsWillBeFoundPromise;
}).then(function (elements) {
    let userNameWillBeEnteredPromise = elements[0].sendKeys(userName);
    let pwdWillBeEnteredPromise = elements[1].sendKeys(pwd);
    let bothValuessWillBeEnteredPromise = Promise.all([userNameWillBeEnteredPromise, pwdWillBeEnteredPromise]);
    return bothValuessWillBeEnteredPromise;
}).then(function () {
    let btnSubmitWillBeFoundPromise = driver.findElement(swd.By.css(".auth-button"));
    console.log("Logged In Successfully");
    return btnSubmitWillBeFoundPromise;
}).then(function (btnSubmit) {
    let btnSubmitWillBeClickedPromise = btnSubmit.click();
    return btnSubmitWillBeClickedPromise;
}).then(function () {
    let waitForRLinkToBeLocatedPromise = driver.findElement(swd.By.css("h3#base-card-1.base-card-title"));
    return waitForRLinkToBeLocatedPromise;
}).then(function (btclick) {
    let rPageWillBeLoadedPromise = btclick.click();
    return rPageWillBeLoadedPromise;
}).then(function () {
    let waitForRLinkToBeLocatedPromise = driver.findElement(swd.By.css("h3#base-card-7.base-card-title"));
    return waitForRLinkToBeLocatedPromise;
}).then(function (btclick) {
    let rPageWillBeLoadedPromise = btclick.click();
    return rPageWillBeLoadedPromise;
}).then(function () {
    let waitForRLinkToBeLocatedPromise = driver.findElement(swd.By.css(".challenge-submit-btn"));
    return waitForRLinkToBeLocatedPromise;
}).then(function (btclick) {
    let rPageWillBeLoadedPromise = btclick.click();
    return rPageWillBeLoadedPromise;
}).then(function (url) {
    gcrsurl = url;
    let metadataFileWillBeReadPromise = fs.promises.readFile(mfile);
    return metadataFileWillBeReadPromise;
}).then(function (content) {
    metadata = JSON.parse(content);

    return Promise.resolve(undefined);
}).then(function () {
    console.log("Solving Questions: \n");
    let pqp = solveQuestion(metadata.questions[0])
    for (let i = 1; i < metadata.questions.length; i++) {
        pqp = pqp.then(function () {

            let cqp = solveQuestion(metadata.questions[i]);
            return cqp;
        })
    }
    return pqp;
}).then(function () {
    console.log("Logging in.....");
    let loginPageWillBeLoadedPromise = driver.get("https://www.hackerrank.com/interview/interview-preparation-kit/warmup/challenges");
    return loginPageWillBeLoadedPromise;
})

    .then(function () {
        console.log('Task Completed Successfully!');
        console.log("\n************************* END **********************************\n");
    }).catch(function (err) {
        console.log(err)
    }).finally(function () {
        // driver.quit();
    });

function solveQuestion(question) {
    return new Promise(function (resolve, reject) {
        let questionUrlWillBeFetchedPromise = getQuestionUrl(question);
        questionUrlWillBeFetchedPromise
            .then(function (qurl) {

                let questWillBeLoadedPromise = driver.get(qurl);
                return questWillBeLoadedPromise;
            })
           .then(function () {

                let testCaseAreaWillBeSelected = driver.findElement(
                    swd.By.css(".custom-input-checkbox")
                );
                return testCaseAreaWillBeSelected;
            })
            .then(function (consoleTab) {
                let consoleTabWillBeCLicked = consoleTab.click();
                return consoleTabWillBeCLicked;
            })
            // .then(function () {
            //     textbox = driver.findElement(swd.By.css(".css-ki0glp"));

            //     let ctrlXpromise = textbox.selectByVisibleText("C++");
            //     return ctrlXpromise;
            // }).then(function (lan) {
            //     let textAreaWillBeSelected = lan.selectByIndex(7);
            //     return textAreaWillBeSelected;
            // })
            .then(function () {
                driver.wait(swd.until.elementLocated(
                    swd.By.css("textarea.custominput")))
            })
            .then(function () {
                let codeFileWillBeRead = fs.promises.readFile(
                    path.join(question.path, "main.cpp")
                );
                return codeFileWillBeRead;
            })
            .then(function (content) {
                content = content + "";
                gContent = content;
                let testCaseAreaWillBeSelected = driver.findElement(
                    swd.By.css("textarea.custominput")
                );
                return testCaseAreaWillBeSelected;
            })
            .then(function (testArea) {
                gtestArea = testArea;
                let codeWillBesubmittedPromise = testArea.sendKeys(gContent);
                return codeWillBesubmittedPromise;
            }).then(function () {
                let ctrlApromise = gtestArea.sendKeys(swd.Key.CONTROL + "a");
                return ctrlApromise;
            })
            .then(function () {
                let ctrlXpromise = gtestArea.sendKeys(swd.Key.CONTROL + "x");
                return ctrlXpromise;
            }).then(function () {
                let textAreaWillBeSelected = driver.findElement(
                    swd.By.css("textarea.inputarea")
                );
                return textAreaWillBeSelected;
            })
            .then(function () {
                let textAreaWillBeSelected = driver.findElement(
                    swd.By.css("textarea.inputarea")
                );
                return textAreaWillBeSelected;
            })
            .then(function (codeArea) {
                gcodeArea = codeArea;
                let CtrlAPromise = gcodeArea.sendKeys(swd.Key.CONTROL + "a");
                return CtrlAPromise;
            })
            .then(function () {

                let CtrlAPromise = gcodeArea.sendKeys(swd.Key.CONTROL + "v");
                return CtrlAPromise;
            }).then(function () {

                let testCaseAreaWillBeSelected = driver.findElement(
                    swd.By.css(".pull-right.btn.btn-primary.hr-monaco-submit")
                );
                return testCaseAreaWillBeSelected;
            })
            .then(function (consoleTab) {
                let consoleTabWillBeCLicked = consoleTab.click();
                return consoleTabWillBeCLicked;
            }).then(function () {
                driver.wait(swd.until.elementLocated(
                    swd.By.css(".ui-btn.ui-btn-normal.ui-btn-secondary.submission-wrapper-next-entity-btn.ui-btn-link")))
            })

            .then(function () {
                resolve();
            })
            .catch(function (err) {
                console.log(err);
                reject(err);
            });
    });
}
function getQuestionUrl(question) {
    return new Promise(function (resolve, reject) {
        if (question.url) {
            resolve(question.url);
        } else {
            reject();
        }
    });
}