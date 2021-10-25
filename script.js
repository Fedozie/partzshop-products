const getProducts = async() => {
    let url = 'https://partzshop.herokuapp.com/api/v1/products';
    try{
        let response = await fetch(url)
        let data = response.json();
        return data
    }catch(error){
        console.log('This is the error:', error)
    }
}

const renderProducts = async() => {
    let products = await getProducts();
    let productsData = products.data;
    let productHTML = '';

    productsData.forEach((product) => {
        const getMainDate = (timestamp) => {
            let day = timestamp.getDate();
            let oldMonth = timestamp.getMonth();
            let year = timestamp.getFullYear();

            switch(oldMonth){
                default: 
                    newMonth = 'Janaury';
                break;
                case 1:
                    newMonth = 'February';
                break;
                case 2:
                    newMonth = 'March';
                break;
                case 3:
                    newMonth = 'April';
                break;
                case 4:
                    newMonth = 'May';
                break;
                case 5:
                    newMonth = 'June';
                break;
                case 6:
                    newMonth = 'July';
                break;
                case 7:
                    newMonth = 'August';
                break;
                case 8:
                    newMonth = 'September';
                break;
                case 9:
                    newMonth = 'October';
                break;
                case 10:
                    newMonth = 'November';
                break;
                case 11:
                    newMonth = 'December';
                break;
            }

            let updatedDate = `${day} ${newMonth}, ${year}.`;
            return updatedDate;
        }
        let dateString = product.updatedAt;
        let dateTimestamp = new Date(Date.parse(dateString));

        let productCard = `<div class="card">
                            <div class="image" style="background-image: url('${product.image}')"></div>
                            <h2>${product.name}</h2>
                            <h4>${product.brand}</h4>
                            <p><span>Description:</span> ${product.description}</p>
                            <p><span>Price in Dollars:</span> ${product.price}</p>
                            <p><span>Quantity in Stock:</span> ${product.quantity}</p>
                            <p><span>Last updated:</span> ${getMainDate(dateTimestamp)}</p>
                           </div>`;
        productHTML += productCard;
    })

    let container = document.querySelector('.container');
    container.innerHTML = productHTML;
}

renderProducts();