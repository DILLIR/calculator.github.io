let out = document.querySelector(".calc__terminal"),
    num_buttons = document.querySelectorAll(".calc__num-button"),
    clear = document.querySelector("[data-value='AC']"),
    inner = document.querySelector("[data-value='Invert']"),
    percent = document.querySelector("[data-value='%']"),
    fun_buttons =  document.querySelectorAll(".calc__func-button"),
    result = document.querySelector("[data-value='=']"),
    current = "",
    prev = "",
    fun = "",
    next = 0;

function showOnTerminal(text){
    out.innerHTML = text;
}


for(let button of num_buttons){
    button.addEventListener("click", function(){
        if(next) {
            current = "";
            next = 0;
        }
        current += button.dataset.value;
        showOnTerminal(current);

    })
}

for(let button of fun_buttons){
    button.addEventListener("click", function(){
        prev = current;
        fun = String(button.dataset.value);
        current = "";
    })

}

result.addEventListener("click", function(){
   if(fun){
        switch (fun){
            case "/":
                current = prev % current == 0 ? prev / current : (prev / current).toFixed(3);
                prev = "";
                fun = "";
                showOnTerminal(current);
                next = 1;
            break;
            case "*":
                current =  (prev < 1 && prev > 0 ||  current > 0 && current < 1) ? (prev * current).toFixed(3) : prev * current;
                prev = "";
                fun = "";
                showOnTerminal(current);
                next = 1;
            break;
            case "-":
                current = (prev < 1 && prev > 0 && current < 1 && current > 0) ? (prev - current).toFixed(3) : prev - current;
                prev = "";
                fun = "";
                showOnTerminal(current);
                next = 1;
            break;
            case "+":
                current =  (prev < 1 && prev > 0 && current < 1 && current > 0) ? (Number(prev) + Number(current)).toFixed(3) : Number(prev) + Number(current);
                prev = "";
                fun = "";
                showOnTerminal(current);
                next = 1;
            break;
            default:
                prev = "";
                fun = "";
                current = "";
                showOnTerminal("unacceptable value")
            break;
        }
   }
})

clear.addEventListener("click", function(){
    current = "";
    prev = "",
    fun = "";
    showOnTerminal(0);
})

inner.addEventListener("click", function(){
    if(current){
        current *= -1;
        showOnTerminal(current);
    }else{
        showOnTerminal("0");
    }
})

percent.addEventListener("click", function(){
    if(current){
        current *= 0.01;
        showOnTerminal(current);
    }else{
        showOnTerminal("0");
    }  
})