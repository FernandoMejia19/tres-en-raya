/*arreglos para datos */
const celdasO=[];
const celdasX=[];
/*celdas */
const celda1=document.getElementById("celda1");
const celda2=document.getElementById("celda2");
const celda3=document.getElementById("celda3");
const celda4=document.getElementById("celda4");
const celda5=document.getElementById("celda5");
const celda6=document.getElementById("celda6");
const celda7=document.getElementById("celda7");
const celda8=document.getElementById("celda8");
const celda9=document.getElementById("celda9");
/*movimientos */
let movimientos=0;
/*botones para empezar*/
const btnEmpezar=document.getElementById("empezar");
const btnEmpiezaX=document.getElementById("empiezaX");
const btnEmpiezaO=document.getElementById("empiezaO");

/*datos datos de jugadores */
const nombreX=document.getElementById("jugadorX");
const nombreO=document.getElementById("jugadorO");

let jugadorX;
let jugadorO;

/*mostrar datos */
const turno=document.getElementById("turno-jugador");
const conteoX=document.getElementById("conteo-x");
const conteoO=document.getElementById("conteo-o");
/*cronometro */
let min=0;
let seg=0;
let activo=false;
let intervalo;
const minutos=document.getElementById("minutos");
const segundos=document.getElementById("segundos");


/*celdas */
celda1.addEventListener('click',function(){
    this.disabled = true;
    celda1.textContent=turno.textContent;
    agregarMovimiento(turno.textContent,1);
    alternarTurno();
});
celda2.addEventListener('click',function(){
    this.disabled = true;
    celda2.textContent=turno.textContent;
    agregarMovimiento(turno.textContent,2);
    alternarTurno();
});
celda3.addEventListener('click',function(){
    this.disabled = true;
    celda3.textContent=turno.textContent;
    agregarMovimiento(turno.textContent,3);
    alternarTurno();
});
celda4.addEventListener('click',function(){
    this.disabled = true;
    celda4.textContent=turno.textContent;
    agregarMovimiento(turno.textContent,4);
    alternarTurno();
});
celda5.addEventListener('click',function(){
    this.disabled = true;
    celda5.textContent=turno.textContent;
    agregarMovimiento(turno.textContent,5);
    alternarTurno();
});
celda6.addEventListener('click',function(){
    this.disabled = true;
    celda6.textContent=turno.textContent;
    agregarMovimiento(turno.textContent,6);
    alternarTurno();
});
celda7.addEventListener('click',function(){
    this.disabled = true;
    celda7.textContent=turno.textContent;
    agregarMovimiento(turno.textContent,7);
    alternarTurno();
});
celda8.addEventListener('click',function(){
    this.disabled = true;
    celda8.textContent=turno.textContent;
    agregarMovimiento(turno.textContent,8);
    alternarTurno();
});
celda9.addEventListener('click',function(){
    this.disabled = true;
    celda9.textContent=turno.textContent;
    agregarMovimiento(turno.textContent,9);
    alternarTurno();
});

/*botones */
btnEmpezar.addEventListener('click',function(){
    if((nombreX.value.trim()=='') || (nombreO.value.trim()=='')){
        console.log("no hay nombres xd");
    }else{
        empezarJuego();
    }
});
btnEmpiezaO.addEventListener('click',function(){
    turno.textContent='O';
});
btnEmpiezaX.addEventListener('click',function(){
    turno.textContent='X';
});
function alternarTurno(){
    if(turno.textContent=='X'){
        turno.textContent='O';
    }else{
        turno.textContent='X';
    }
};
function agregarMovimiento(celda,numero){
    movimientos++;
    verificarPartida(movimientos);
    if(celda=='X'){
        celdasX.push(numero);
        celda.textContent=turno.textContent;
        conteoX.textContent=celdasX.length;
    }else{
        celdasO.push(numero);
        conteoO.textContent=celdasO.length;
    }
    console.log(celdasO);
    console.log(celdasX);
};
function empezarJuego(){
    iniciarCronometro();
    celda1.disabled=false;
    celda2.disabled=false;
    celda3.disabled=false;
    celda4.disabled=false;
    celda5.disabled=false;
    celda6.disabled=false;
    celda7.disabled=false;
    celda8.disabled=false;
    celda9.disabled=false;
    btnEmpiezaO.disabled=true;
    btnEmpiezaX.disabled=true;
    jugadorX=nombreX.value;
    jugadorO=nombreO.value;
    nombreO.value='';
    nombreX.value='';
    console.log(jugadorO);
};
function actualizarDis(){
    minutos.textContent = min.toString().padStart(2, '0');
    segundos.textContent = seg.toString().padStart(2, '0');
};
function iniciarCronometro(){
    if(activo)return;
    activo=true;
    intervalo=setInterval(()=>{
        seg++;
        if(seg===60){
            seg=0;
            min++;
        }
        actualizarDis();
    }
    ,1000);
};
function pararCronometro(){
    if(!activo) return;
    activo=false;
    clearInterval(intervalo);
    
};
function reiniciarCronometro(){
    activo=false;
    minutos=0;
    segundos=0;
    actualizarDis();
};
function verificarPartida(mov){
    if(mov===9){
        pararCronometro();
    }
};