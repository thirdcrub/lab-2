
let L=0;
var randomNumber1 = Math.floor(Math.random() * 10) + 1;
console.log(randomNumber1);




function Mygame(a){
    let show;
    let num = document.getElementById("num").value;

    if(a==0){
        if(L>=0 && L<3){
            if(num<1||num>10){
                show="please Enter New Number";
                document.getElementById("show1").innerHTML = show;
            }
            else {
                if(num<randomNumber1){
                    show="Low";
                    L++;
                    document.getElementById("show1").innerHTML = show;
                    document.getElementById("Previous").innerHTML = "Previous guesses : " + num;
                }
                else if(num>randomNumber1){ 
                    show="High";
                    L++;
                    document.getElementById("show1").innerHTML = show;
                    document.getElementById("Previous").innerHTML = "Previous guesses : " + num;
                }
                else if(num==randomNumber1){
                    show="Your Win!!!";
                    document.getElementById("show1").innerHTML = "";
                    document.getElementById("show2").innerHTML = show;
                }
                
                document.getElementById("Previous").innerHTML = "Previous guesses : " + num;
                
                document.getElementById("life").innerHTML ="You have life : " + (3-L);
            }
        }
        if(L==3){
            show="Game Over";
            document.getElementById("show1").innerHTML = show;
            

        }
    }
    else{
        document.getElementById("num").disabled = true;
        document.getElementById("sub").disabled = true;
    }

}