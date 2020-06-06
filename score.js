$(document).ready(function() {

function scores2(){
        var hScores = JSON.parse(window.localStorage.getItem("highscores"))
        hScores.forEach(function(score) {
            var list = document.createElement("li")
            list.textContent = score.initials + " - " + score.score
        
            var listee = document.getElementById("highscores");
            listee.appendChild(list);
        });
    }

    scores2()

function clearscores(){
    window.localStorage.removeItem("highscores");
    window.location.reload();   
}

$("#clear").on("click", clearscores)
})
