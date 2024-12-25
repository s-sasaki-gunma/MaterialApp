document.addEventListener('DOMContentLoaded', function() {
    window.MathJax = {
        chtml: { matchFontHeight: false },
        tex:   { inlineMath: [['$', '$']] },
        svg:   { fontCache: 'global' }
    };
    (function () {
        const script = document.createElement('script');
        if (navigator.userAgent.includes("Chrome") || navigator.userAgent.includes("Firefox"))
            script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
        else
            script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
        script.async = true;
        document.head.appendChild(script);
    })();
});

function createExercises(num){
    let main = document.getElementsByTagName("main")[0];
    for(let n=1; n<=num; n++){
        let section = document.createElement("section");
        section.className = "exercise";
        let h2 = document.createElement("h2");
        h2.innerHTML=`演習問題`+n+` <input type="button" value="問題生成" onclick="createQuestion`+n+`()">`;
        let QQ = document.createElement("div");
        QQ.className="QQ";
        QQ.id="question"+n;
        let AA = document.createElement("div");
        AA.className="AA";
        AA.id="model-answer"+n;
        section.appendChild(h2);
        section.appendChild(QQ);
        section.appendChild(AA);
        main.appendChild(section);
    }
}

function createQuestion(answer,questionEle,explanationEle,num){
    let idMyAns="my-answer"+num;
    let idModelAns="model-answer"+num;
    let idQuestion="question"+num;
    let div = document.getElementById(idQuestion);
    div.innerHTML = null;
    div.appendChild(questionEle);
    MathJax.typesetPromise(div.childNodes);
    createTextbox(answer,explanationEle,idMyAns,idModelAns);
}

function createTextbox(answer,explanationEle,idMyAns,idModelAns){
    let div = document.getElementById(idModelAns);
    div.innerHTML = null;
    let p = document.createElement("p");
    let label = document.createElement("label");
    label.innerText = "解答欄："
    let input = document.createElement("input");
    input.type="number";
    input.id=idMyAns;
    label.appendChild(input);
    p.appendChild(label);
    let button = document.createElement("input");
    button.type="button";
    button.value="解答確認";
    button.addEventListener('click', {answer:answer, explanationEle:explanationEle, idMyAns:idMyAns, idModelAns:idModelAns, handleEvent:checkAnswer});
    p.appendChild(button);
    div.appendChild(p);
}

function checkAnswer(e){
    let myAnswer = document.getElementById(this.idMyAns).value;
    if(myAnswer=='') myAnswer = '無回答';
    let div = document.getElementById(this.idModelAns);
    div.innerHTML=null;
    let p = document.createElement("p");
    p.innerText = "あなたの解答：　" + myAnswer;
    p.innerText += (myAnswer==this.answer) ? "　（正解💯）" : "　（不正解❌️）";
    div.appendChild(p);
    let ele = this.explanationEle;
    div.appendChild(ele);
    MathJax.typesetPromise(div.childNodes);
}