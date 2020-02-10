
let e = false;
let male =0;
let female =0;
let other=0;
let sum=0;


let firebaseConfig = {
    apiKey: "AIzaSyDoh4NyvlPeLP3IudQKsYxbsA1y4VPSuTA",
    authDomain: "localhost",
    projectId: "comlab03-683df",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

console.log('Hi');

$('#save').click(()=> {
    e = false
    let name = document.getElementById("na").value;
    let last = document.getElementById("la").value;
    let gender = $('input[name=gender]:checked').val();
    let email = document.getElementById("email").value;
    let detail = document.getElementById("detail").value;

    //checked validation
    

    if(!(name.match('^[a-zA-Z]{3,16}$')) || name === "") {
        console.log('name');
        e = true;
        document.querySelector('#fe').textContent = "Please enter a valid name."
    }else{
        document.querySelector('#fe').textContent = ""

    }

    if(!(last.match('^[a-zA-Z]{3,16}$')) || last === "") {
        console.log('la');
        e = true;
        document.querySelector('#las').textContent = "Please enter a valid Last name."
    }else{
        document.querySelector('#las').textContent = ""
    }
    // if(gender =1){
    //     gender="male";
    // }
    // else if(gender=2){
    //     gender="female";
    // }
    // else{
    //     gender="other";
    // }

    function validateEmail($email) {
        let emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
        return emailReg.test( $email );
      }

    if( !validateEmail(email) || email === "") {
         console.log('email'); 
         document.querySelector('#ee').textContent = "Please enter a valid Email Address."

         e = true;
    }else{
        document.querySelector('#ee').textContent = ""

    }
    if(e){
        console.log('error');
        document.querySelector('#se').textContent = "Please enter a valid Info."

    }else{
        document.querySelector('#se').textContent = ""


    db.collection("users")
    .add({
        Name: name + " " + last,
        Gender: Number(gender),
        Email: email,
        Detail: detail,
        
        // Name: $('#name').val(),
        // Gender: $( "input:checked" ).val(),
        // Email: $('#email').val(),
        // Detail: $('#detail').val(),
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        
        console.log(na);
        console.log(la);
        console.log(gender);
        console.log(email);
        console.log(detail);
        
        $('#na').val('')
        $('#la').val('')
        $('input[id="male"]').prop('checked', true);
        $('#email').val('')
        $('#detail').val('')
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    }
    
} )


db.collection('users').orderBy("Name").onSnapshot(doc =>{
    let table = $('tbody')[0]
    // document.querySelectorAll("tbody tr").forEach(item => item.remove())
    $("tbody tr").remove()
    // gpa = 0
    // credit = 0
    doc.forEach(item => { 
        let row = table.insertRow(-1)
        let nameCell = row.insertCell(0)
        let secoundCell = row.insertCell(1)
        let thirdCell = row.insertCell(2)
        
        nameCell.textContent = item.data().Name

        if(item.data().Gender==1){
            secoundCell.textContent = item.data().Gender= "male";
            male++;
        }
        else if(item.data().Gender==2){
            secoundCell.textContent = item.data().Gender = "female";
            female++;
        }
        else if( item.data().Gender==3){
            secoundCell.textContent = item.data().Gender= "other";
            other++;
        }
        let string = String(item.data().Email)
        let something = ""
        for(i=0;i<string.length;i++){
            if(i==0|| string[i]=='@'|| string[i]=='.'){
               something += string[i]
            }else something +='x'
        }
        thirdCell.textContent = something
        sum = male+female+other;
        console.log(sum);
        let Graphs = {
            title: {
                text: "Gender"
            },
            
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 40,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: (male/sum)*100, label: "Male" },
                    { y: (female/sum)*100, label : "Female" },
                    { y: (other/sum)*100, label: "Other" },
                   
                ]
            }]
        };
        $("#chartContainer").CanvasJSChart(Graphs);
    })
    
})

