const milestonesData = JSON.parse(data).data; // api data is converting to object and .data accessign the property

function loadData(){
    const milestones = document.querySelector(".milestones");
    milestones.innerHTML = `${milestonesData.map(function(milestone){ // mapping each milestone or api property
        return `  <div class="milestone border-b" id="${milestone._id}">
                    <div class="flex">
                        <div class="checkbox"><input type="checkbox" onclick = "markMilestone(this, ${milestone._id})"/></div>
                        <div onclick="openMilestone(this, ${milestone._id})">
                            <p>
                               ${milestone.name}
                                <span><i class="fas fa-chevron-down"></i></span>
                            </p>
                        </div>
                    </div>
                    <div class="hidden_panel">
                       ${milestone.modules.map(function(module){
                           return ` <div class="module border-b">
                            <p>${module.name}</p>
                        </div>`
                       }).join("")}
                    </div>
                </div>`
    }).join("")}`

}

function openMilestone(milestoneElement, id){
    const currentPanel = milestoneElement.parentNode.nextElementSibling;
    const shownPanel = document.querySelector(".show");
    const active = document.querySelector(".active");

    // remove active class form previous class if any other class is clicked

    if (active && !milestoneElement.classList.contains("active")){
        active.classList.remove("active");
    }
    // toggle current class which is clicked
    milestoneElement.classList.toggle("active");

    if(!currentPanel.classList.contains("show") && shownPanel){
    shownPanel.classList.remove("show");
    }
    currentPanel.classList.toggle("show");

    showMilestone(id);
}

function showMilestone(id){
    const milestoneImage = document.querySelector(".milestoneImage");
    const title = document.querySelector(".title");
    const details = document.querySelector(".details");
    milestoneImage.src = milestonesData[id].image;

    title.innerHTML = milestonesData[id].name;
    details.innerHTML = milestonesData[id].description;

    milestoneImage.style.opacity = "0";
}

// listen for image load
const milestoneImage = document.querySelector(".milestoneImage");
 milestoneImage.onload = function(){
    this.style.opacity = "1";
 }


function markMilestone(checkbox, id){
   const doneList = document.querySelector(".doneList");
   const milestoneList = document.querySelector(".milestones");
   const item = document.getElementById(id);

   if(checkbox.checked){
     //mark as done
     milestoneList.removeChild(item);
     doneList.appendChild(item);

   }
   else{
     // back to main list
    const list = milestoneList.appendChild(item);
     doneList.removeChild(item);
   }
}


loadData();