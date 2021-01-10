let modalQT = 1;
let modalKey = 0;
let modalName = '';
let cart = [];

const c = (el)=> document.querySelector(el);

const cs = (el)=> document.querySelectorAll(el);



//LISTAGEM DAS PIZZAS
pizzaJson.map((item,index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    //PREENCHER AS INFORMAÇÕES EM PIZZA ITEM;

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('a').addEventListener('click',(event)=>{
        event.preventDefault();
        let key = event.target.closest('.pizza-item').getAttribute('data-key');
        modalQT = 1;
        modalKey = key;
        modalName = item.name;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');

        cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        c('.pizzaInfo--qt').innerHTML = modalQT;



        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        },100);
    });    
    c('.pizza-area').append(pizzaItem);
});

//EVENTOS DO MODAL 

function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    },500);
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click',closeModal);
})

c('.pizzaInfo--qtmenos').addEventListener('click',()=> {
    if (modalQT > 1){
    modalQT--;
    c('.pizzaInfo--qt').innerHTML = modalQT; 
    }
});

c('.pizzaInfo--qtmais').addEventListener('click',()=> {
    modalQT++;
    c('.pizzaInfo--qt').innerHTML = modalQT;
});

cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{
    size.addEventListener('click',(e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected'); 
        size.classList.add('selected');  
    })
});

//ADICIONANDO AO CARRINHO
c('.pizzaInfo--addButton').addEventListener('click',()=>{
    //  pegando qual a pizza eu selecionei
    //console.log('Pizza: '+ modalKey);
    //PEGAR O TAMANHO SELECIONADO
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    //PEGAR QUANTAS PIZZAS SELECIONEI
   // console.log('Quantidade: '+modalQT);

   cart.push({
    id:pizzaJson[modalKey].id,
    size,
    qt: modalQT
   });
   console.log(cart);
   closeModal();
});




