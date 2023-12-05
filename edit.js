const mainDiv = document.getElementById("editTimers");

const moveUp = async (timers, currentIndex) => {
    if (currentIndex > 0 && currentIndex < timers.length) {
        const temp = timers[currentIndex];
        timers[currentIndex] = timers[currentIndex - 1];
        timers[currentIndex - 1] = temp;
    }
    saveToChromeSyncStorage(timers);
    showTimers();
};

const moveDown = async (timers, currentIndex) => {
    if (currentIndex >= 0 && currentIndex < timers.length - 1) {
        const temp = timers[currentIndex];
        timers[currentIndex] = timers[currentIndex + 1];
        timers[currentIndex + 1] = temp;
    }
    saveToChromeSyncStorage(timers);
    showTimers();
};

const removeElement = async (timers, currentIndex) => {
    if (currentIndex >= 0 && currentIndex < timers.length) {
        timers.splice(currentIndex, 1);
    }
    saveToChromeSyncStorage(timers);
    showTimers();
};


const showTimers = async () => {
    mainDiv.innerHTML="";
    const timers = await getFromChromeSyncStorage();
    timers.forEach((e, i) => {
        const singleTimer = document.createElement("div");
        singleTimer.classList.add("singleTimer", "padding-10", "border-radius-10", "show_hide");
        singleTimer.draggable = true;
            const leftSide = document.createElement("div");
            leftSide.classList.add("leftSide");
                const arrowUp = document.createElement("img");
                arrowUp.src = "img/up.svg";
                arrowUp.classList.add("cursor-pointer");
                arrowUp.addEventListener("click", () => {
                    moveUp(timers, i);
                });
                leftSide.appendChild(arrowUp);

                const currentPosition = document.createElement("span");
                currentPosition.innerText = i+1;
                currentPosition.classList.add("text-middle", "font-size-larger", "text-fiverrGreen");
                leftSide.appendChild(currentPosition);

                const arrowDown = document.createElement("img");
                arrowDown.src = "img/down.svg";
                arrowDown.classList.add("cursor-pointer");
                arrowDown.addEventListener("click", () => {
                    moveDown(timers, i);
                });
                leftSide.appendChild(arrowDown);
            singleTimer.appendChild(leftSide);

            const rightSide = document.createElement("div");
            rightSide.classList.add("width100");
                const rightSide_firstRow = document.createElement("div");
                rightSide_firstRow.classList.add("row", "justify-content-space-between");
                    const rightSide_firstRow_title = document.createElement("div");
                    rightSide_firstRow_title.innerText = e["title"];
                    rightSide_firstRow.appendChild(rightSide_firstRow_title);

                    const optionDiv = document.createElement("div");
                    optionDiv.classList.add("show_hide_child");
                        const editDiv = document.createElement("div");
                        editDiv.classList.add("single-option");
                            const editImg = document.createElement("img");
                            editImg.src = "img/edit.svg";
                            editDiv.appendChild(editImg);
                                                        
                            const editText = document.createElement("span");
                            editText.innerText = "Edit timer";
                            editDiv.appendChild(editText);
                        optionDiv.appendChild(editDiv);

                        const removeDiv = document.createElement("div");
                        removeDiv.classList.add("single-option");
                        removeDiv.addEventListener("click", () => {
                            if(window.confirm("Sure?")){
                                removeElement(timers, i);
                            }
                        });
                            const removeImg = document.createElement("img");
                            removeImg.src = "img/delete.svg";
                            removeDiv.appendChild(removeImg);
                                                        
                            const removeText = document.createElement("span");
                            removeText.innerText = "Remove timer";
                            removeDiv.appendChild(removeText);
                        optionDiv.appendChild(removeDiv);
                    rightSide_firstRow.appendChild(optionDiv);
                rightSide.appendChild(rightSide_firstRow);
            singleTimer.appendChild(rightSide);
        mainDiv.appendChild(singleTimer);
    });
}

window.addEventListener("load", async () => {
    showTimers();
})