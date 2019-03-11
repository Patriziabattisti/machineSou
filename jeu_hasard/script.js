document.addEventListener("DOMContentLoaded", function(){
    var tbody=document.querySelector('tbody');
    var jouer=document.querySelector("#luck");
    var reset=document.querySelector('#reset');
    var monlog=document.querySelector('#send');
    var messou=10;
    var compteur=1;
    var tablog=[];
    var tfoot=document.querySelector('tfoot');
    
    // Renvoi un chiffre entier entre le min inclu et le max exclu
    function getRandomIntegerBetween(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    
                                                   //------------------------On joue
    jouer.addEventListener('click', function(){
        
        if(messou>0){
            
            var nbr1= getRandomIntegerBetween(1,8);
            var nbr2=getRandomIntegerBetween(1,8);
            var nbr3=getRandomIntegerBetween(1,8);

            var resultat=""+nbr1+""+nbr2+""+nbr3;   
    //        console.log(resultat);
            var monspan=document.querySelector('span');

            monspan.innerHTML=""+nbr1+""+nbr2+""+nbr3;   //on met le résultat dans le span pour qu'il s'affiche

            var mesgains=gagne(resultat);               //on calcule les gains
            messou=messou+mesgains;                    //on calcule le reste des sous

            leLog(compteur,resultat,messou,mesgains);  //on affiche la ligne correspondante



            var objlog={coup:compteur, resul:resultat,argent:messou, gain:mesgains };
    //        console.log(objlog);
            tablog.push(objlog);
    //        var monlog={"monlog":[objlog]};
    //        console.log(monlog);



            compteur++;
        }
        else{
            tfoot.innerHTML="Vous n'avez plus de crédit!!";
        }
        
    })
    
                                            //----------------------------on efface tout
    reset.addEventListener('click', function(){
        tbody.innerHTML="";
        compteur=1;
        messou=10;
        tfoot.innerHTML="";
        //tablog=[];   si on veut remettre le log à zéro également
    })
    
                                            //-------------------------on affiche le log (attention le log garde tout, même après le reset)
    monlog.addEventListener('click', function(){
        
        var monJson='{"mon log":[';
        
        for(let i=0; i<tablog.length;i++){
            monJson+=JSON.stringify(tablog[i])+',';
        }
        monJson+=']}';
        
        
        console.log(monJson);
    })
    
    
                                            //-----------------------------fonction affichage du log
    
    function leLog(coups,resultat,argent,gain){
        
        var montr=document.createElement('tr'); //on crée la ligne
        
        var tabdedonne=[];
        tabdedonne.push(coups);
        tabdedonne.push(resultat);
        tabdedonne.push(argent);
        tabdedonne.push(gain);
        
        
        for(let i=0; i<4;i++){
            var untd=document.createElement('td');   //on crée les cellules avec le contenu et on l'ajoute dans la ligne
            
            var el=document.createTextNode(tabdedonne[i]);
              
            untd.appendChild(el);
            
            if(i==3){
                if(gain>0){     //si le gain est positif on le met en vert sinon rouge
                    untd.classList.add('win');
                }
                else{
                    untd.classList.add('loss');
                }
            }
            
            
            montr.appendChild(untd);
        }
        tbody.appendChild(montr);                   //on ajoute la ligne au tableau
        
    }
                                        //-------------------------------fonction pour déterminer le gain ou la perte
    
    function gagne(resultat){
        var gain;
        if(resultat=="777"){
            gain=10;
        }
        else if(resultat=="123"){
            gain=5;
        }
        else if(resultat=="111"){
            gain=2;
        }
        else{
            gain=-1;
        }
        return gain;
    }
})
