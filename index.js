document.addEventListener("DOMContentLoaded",()=>{

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            let data1 = ""
            data.map((values)=>{
                let {id, title, description, price, image, category} = values
                let search = basket.find((item) => item.id === id) || [];
            
                data1 += `<div id=product-id-${id} class="card">
                <h1 class="title">${title}</h1>
                <img src=${image} alt= "img" class="images">
                <p>${description}</p>
                <p class="category">${category}</p>
                <div class="price-quantity">
                    <h2>${price}</h2>
                    <div class="buttons">
                        <i onclick = "decrement(${id})" class="bi bi-dash-lg"> </i>
                        <div id=${id} class="quantity">
                        ${search.item === undefined ? 0: search.item}
                        </div>
                        <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
    
                    </div>
                </div>
            
            </div>`
            });
            document.getElementById("cards").innerHTML = data1;
            
            
        })
        .catch(err => {console.log(err);
        });
        
        let basket = JSON.parse(localStorage.getItem("data")) || [];
        
    let increment = (id)=>{
        let selectedItem = id;
        let search = basket.find((item) => item.id === selectedItem);
        if (search === undefined){
            basket.push({
                id: selectedItem,
               item: 1,
           });
    
        }
        else{
            search.item += 1;
        }
        localStorage.setItem('data', JSON.stringify(basket));
        //console.log(basket);
        update(selectedItem);
    }
    let decrement = (id)=>{
        let selectedItem = id;
        let search = basket.find((item) => item.id === selectedItem);
        if(search.item === undefined) return
        else if (search.item === 0) return;
        else{
            search.item -= 1;
            update(selectedItem);
        
        basket = basket.filter((itm) => itm.item !== 0)
        //console.log(basket);
        
    }
    localStorage.setItem('data', JSON.stringify(basket));
    }
    let update = (id)=>{
        let search = basket.find((item) => item.id === id);
        document.getElementById(id).innerHTML = search.item;
        calculation();
    }
    let calculation = (id)=>{
        let cartIcon = document.getElementById("cartAmount")
        cartIcon.innerHTML = basket.map(itm => itm.item).reduce((x, y)=> x + y, 0)
    
    };
    calculation();
     
    
    
            
})