let currValue = parseInt(counter.textContent);
increase.onclick = ()=>{
    counter.textContent = ++currValue;
}
decrease.onclick = ()=>{
    counter.textContent = --currValue;
}