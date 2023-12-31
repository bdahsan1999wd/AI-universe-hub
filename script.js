const loadData = async dataLimit => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    spinnerToggle(true);
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit);
    spinnerToggle(false);
};

const displayData = (cards, dataLimit) => {
    const cardContainer = document.getElementById('cards-container');
    cardContainer.innerHTML = '';
    const seeMore = document.getElementById('see-more');

    if (dataLimit && cards.length > 6) {
        cards = cards.slice(0, 6);
        seeMore.classList.remove('d-none');
    } else {
        seeMore.classList.add('d-none');
    }

    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
            <div class="card p-3">
                <img src="${card.image}" class="card-img-top" alt="card-image">
                <div class="card-body">
                    <h4 class ='card-title'>Features</h4>
                    <ol>
                        <li>${card.features[0]}</li>
                        <li>${card.features[1]}</li>
                        <li>${card.features[2]}</li>
                    </ol>
                    <hr>
                    <h5>${card.name}</h5>
                    <div class="d-flex justify-content-between">
                        <div class="d-flex align-item-center gap-2 ">
                            <i class=" py-2 fa-regular fa-calendar-days"></i>
                            <P class="py-1" >${card.published_in}</P>
                        </div>
                        <div><i class="fs-3 fa-solid fa-circle-arrow-right" onclick="fetchCardDetails('${card.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></div>
                    </div> 
                </div>
            </div>
        `;

        cardContainer.appendChild(cardDiv);
    });
};

const fetchCardDetails = id => {
    let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showCardDetails(data.data))
        .catch(error => console.log(error));
};

const showCardDetails = cardDetails => {
    console.log(cardDetails);
    const cardDetail = document.getElementById('modal-body-card-right');
    cardDetail.innerHTML = `
    <img src="${cardDetails.image_link[0]}" class="card-img-top p-4" alt="card-image">
    <div class="text-center mt-3">
    <h4 class="fw-bold">${cardDetails.input_output_examples[0].input}</h4>
    <p class="p-3">${cardDetails.input_output_examples[0].output}</p>
    </div>
    
    `;
};

const spinnerToggle = isLoading => {
    const loadingSpinner = document.getElementById('spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('d-none');
    } else {
        loadingSpinner.classList.add('d-none');
    }
};

document.getElementById('btn-see-more').addEventListener('click', function () {
    loadData();
});

loadData(6);